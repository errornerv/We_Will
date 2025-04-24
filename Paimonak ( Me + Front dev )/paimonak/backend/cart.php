<?php
session_start();
include 'dbconnect.php';

// چک کردن لاگین بودن کاربر
if (!isset($_SESSION['user_id'])) {
    echo "لطفاً ابتدا وارد سیستم شوید.";
    exit;
}

$user_id = $_SESSION['user_id'];

// دریافت اقلام سبد خرید از دیتابیس
$stmt = $conn->prepare("SELECT * FROM cart WHERE user_id = :user_id");
$stmt->bindParam(':user_id', $user_id);
$stmt->execute();
$items = $stmt->fetchAll(PDO::FETCH_ASSOC);

$total_price = 0;
echo '<h2>سبد خرید شما</h2>';
echo '<table>';
echo '<tr><th>محصول</th><th>تعداد</th><th>قیمت</th></tr>';

foreach ($items as $item) {
    echo '<tr>';
    echo '<td>'.$item['product_name'].'</td>';
    echo '<td>
            <form method="post" action="update_cart.php">
                <input type="hidden" name="product_id" value="'.$item['product_id'].'">
                <button type="submit" name="action" value="decrease">−</button>
                '.$item['quantity'].'
                <button type="submit" name="action" value="increase">+</button>
            </form>
          </td>';
    echo '<td>'.$item['price'].' تومان</td>';
    echo '</tr>';
    $total_price += $item['price'] * $item['quantity']; // جمع کل قیمت‌ها
}
echo '</table>';

echo '<p>جمع کل: '.$total_price.' تومان</p>';

// بررسی تأیید شماره تلفن قبل از پرداخت
$stmt = $conn->prepare("SELECT pv.is_verified FROM users u LEFT JOIN phone_verifications pv ON u.phone_number = pv.phone_number WHERE u.user_id = :user_id");
$stmt->bindParam(':user_id', $user_id);
$stmt->execute();
$verification = $stmt->fetch(PDO::FETCH_ASSOC);

if ($verification && $verification['is_verified'] == 1) {
    // اگر شماره تلفن تأیید شده، دکمه پرداخت فعال شود
    echo '<form action="process_payment.php" method="post">
            <input type="hidden" name="total_price" value="'.$total_price.'">
            <button type="submit" name="checkout">پرداخت</button>
          </form>';
} else {
    // نمایش پیام تأیید شماره تلفن
    echo '<p style="color: red;">برای ادامه پرداخت، شماره تلفن خود را تأیید کنید.</p>';
    echo '<form method="post" action="otp_verify.php">
            <input type="hidden" name="user_phone" value="'.$verification['phone_number'].'">
            <label for="otp">کد تأیید:</label>
            <input type="text" id="otp" name="user_otp" required>
            <button type="submit">تأیید</button>
          </form>';
    echo '<form method="post" action="otp_send.php">
            <input type="hidden" name="user_phone" value="'.$verification['phone_number'].'">
            <button type="submit">ارسال مجدد کد تأیید</button>
          </form>';
}
?>
