<?php
session_start();
require 'dbconnect.php'; // فایل اتصال به دیتابیس

$email = $_POST['email'];
$otp = $_POST['otp'];

try {
    // آماده کردن اتصال PDO
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // بررسی صحت ایمیل و کد OTP
    $query = $conn->prepare("SELECT user_id, otp_code, expires_at FROM otp_codes WHERE email = :email AND usage_limit > 0 ORDER BY created_at DESC LIMIT 1");
    $query->bindParam(':email', $email);
    $query->execute();

    // دریافت نتیجه
    $result = $query->fetch(PDO::FETCH_ASSOC);
    if ($result) {
        $user_id = $result['user_id'];
        $db_otp = $result['otp_code'];
        $expires_at = $result['expires_at'];

        // بررسی اعتبار کد OTP و زمان انقضا
        $current_time = new DateTime();
        $expires_at_time = new DateTime($expires_at);

        if ($db_otp === $otp && $expires_at_time > $current_time) {
            // بازنشانی شناسه سشن برای امنیت
            session_regenerate_id(true);

            // دریافت نام کاربری
            $userQuery = $conn->prepare("SELECT username FROM users WHERE user_id = :user_id");
            $userQuery->bindParam(':user_id', $user_id);
            $userQuery->execute();
            $userResult = $userQuery->fetch(PDO::FETCH_ASSOC);
            $username = $userResult['username'];

            // ذخیره اطلاعات در سشن
            $_SESSION['user_id'] = $user_id;
            $_SESSION['username'] = $username;

            // به‌روزرسانی usage_limit برای OTP
            $updateOtpQuery = $conn->prepare("UPDATE otp_codes SET usage_limit = usage_limit - 1 WHERE email = :email AND otp_code = :otp_code");
            $updateOtpQuery->bindParam(':email', $email);
            $updateOtpQuery->bindParam(':otp_code', $otp);
            $updateOtpQuery->execute();

            // تنظیم کوکی سشن
            setcookie('user_session', session_id(), time() + (86400 * 30), "/"); // کوکی 30 روزه

            // پیام موفقیت‌آمیز
            echo "OTP Verified. Login successful!";
        } else {
            // پیام خطا در صورت منقضی شدن یا نادرست بودن کد OTP
            echo "Invalid OTP or OTP expired. Please try again.";
        }
    } else {
        // پیام خطا در صورت پیدا نشدن OTP معتبر
        echo "Invalid OTP or OTP expired. Please try again.";
    }
} catch (PDOException $e) {
    // نمایش خطای پایگاه‌داده
    echo "Error: " . $e->getMessage();
}

$conn = null; // بستن اتصال PDO
?>
