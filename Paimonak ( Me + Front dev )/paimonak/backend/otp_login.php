 
<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';
include 'dbconnect.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Expires: Sat, 01 Jan 2000 00:00:00 GMT");
header("Pragma: no-cache");

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email']; // دریافت ایمیل

    // تولید کد OTP
    $otp = rand(100000, 999999);

    // زمان انقضای OTP
    $expiresAt = date('Y-m-d H:i:s', strtotime('+5 minutes'));

    try {
        // دریافت user_id بر اساس ایمیل
        $stmt = $conn->prepare("SELECT user_id FROM users WHERE email = :email"); // تغییر به user_id
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $userData = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($userData) {
            $userId = $userData['user_id']; // استخراج user_id

            // ذخیره OTP در دیتابیس
            $stmt = $conn->prepare("INSERT INTO otp_codes (user_id, email, otp_code, expires_at, usage_limit) 
            VALUES (:user_id, :email, :otp_code, :expires_at, 1)");
            $stmt->bindParam(':user_id', $userId); // استفاده از user_id
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':otp_code', $otp);
            $stmt->bindParam(':expires_at', $expiresAt);
            $stmt->execute();

            // ارسال کد OTP به ایمیل
            $mail = new PHPMailer(true);
            $mail->CharSet = 'UTF-8'; // تنظیم UTF-8 برای متن ایمیل
            $mail->isSMTP();
            $mail->Host = 'python100.limoo.host';
            $mail->SMTPAuth = true;
            $mail->Username = 'paimonak@wewill.club';
            $mail->Password = 'pPWbqlx!p6qG';
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            $mail->Port = 465;

            $mail->setFrom('paimonak@wewill.club', 'Paimonak');
            $mail->addAddress($email); // ارسال به ایمیل کاربر

            $mail->isHTML(true);
            $mail->Subject = 'کد یکبار مصرف شما';
            $mail->Body = "بفرمایید کد، این کد برای وارد شدن به اکانت شماست: <b>$otp</b>";

            $mail->send();
            echo 'کد OTP به ایمیل شما ارسال شد.';
        } else {
            echo "کاربری با این ایمیل یافت نشد.";
        }
    } catch (PDOException $e) {
        echo "خطا در ذخیره OTP: " . $e->getMessage();
    }
}
?>
