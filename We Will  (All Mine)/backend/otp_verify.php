<?php
require 'dbconnect.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $phone_number = $_POST['user_phone'];
    $otp_code = $_POST['user_otp'];

    $stmt = $conn->prepare("SELECT * FROM phone_verifications WHERE phone_number = :phone_number AND otp_code = :otp_code AND expires_at > NOW()");
    $stmt->bindParam(':phone_number', $phone_number);
    $stmt->bindParam(':otp_code', $otp_code);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        echo "OTP معتبر است";
    } else {
        echo "کد نامعتبر یا منقضی شده است";
    }
}
?>
