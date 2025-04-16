<?php
require 'dbconnect.php'; // اتصال به دیتابیس

if (isset($_GET['token'])) {
    $token = $_GET['token'];

    // بررسی توکن برای اطمینان از معتبر بودن
    $stmt = $conn->prepare('SELECT email FROM password_resets WHERE token = :token');
    $stmt->bindParam(':token', $token);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        // اگر توکن معتبر بود و فرم ارسال شد، رمز عبور جدید را تنظیم کن
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $newPassword = password_hash($_POST['new-password'], PASSWORD_BCRYPT);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $email = $row['email'];

            // بروزرسانی رمز عبور کاربر در دیتابیس
            $updateStmt = $conn->prepare('UPDATE users SET password = :password WHERE email = :email');
            $updateStmt->bindParam(':password', $newPassword);
            $updateStmt->bindParam(':email', $email);
            $updateStmt->execute();

            // حذف توکن بعد از تنظیم موفقیت‌آمیز رمز عبور
            $deleteStmt = $conn->prepare('DELETE FROM password_resets WHERE email = :email');
            $deleteStmt->bindParam(':email', $email);
            $deleteStmt->execute();

            // نمایش پیام موفقیت و سپس انتقال به index.html
            echo '<script>alert("رمز عبور با موفقیت بازنشانی شد!...");</script>';
            echo '<script>setTimeout(function(){ window.location.href = "../frontend/index.html"; }, 3000);</script>';
        }
    } else {
        // اگر توکن معتبر نبود، نمایش پیام خطا
        echo 'توکن نامعتبر یا منقضی شده است.';
    }
} else {
    // اگر توکن در URL موجود نبود
    echo 'توکن بازنشانی یافت نشد.';
}
?>

<!-- فرم HTML برای بازنشانی رمز عبور -->
<!DOCTYPE html>
<html lang="fa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>بازیابی رمز عبور</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="container">
    <div class="reset-box">
        <h2>بازیابی رمز عبور</h2>
        <div class="icon-container">
            <i class="fas fa-lock"></i>
        </div>
        <form id="resetPasswordForm" method="POST">
            <label for="new-password">رمز عبور جدید:</label>
            <input type="password" id="new-password" name="new-password" required>
            <button type="submit" class="btn-reset">تنظیم مجدد رمز عبور</button>
        </form>
        <div id="success-message" class="success-message hidden">
            <i class="fas fa-check-circle"></i>
            <p>رمز عبور با موفقیت بازنشانی شد.</p>
        </div>
    </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/js/all.min.js"></script>
</body>
</html>
