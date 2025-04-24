<?php
require 'dbconnect.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Expires: Sat, 01 Jan 2000 00:00:00 GMT");
header("Pragma: no-cache");


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $phone_number = $_POST['user_phone'];
    $otp_code = $_POST['user_otp'];

    try {
        $stmt = $conn->prepare("SELECT * FROM phone_verifications WHERE phone_number = :phone_number AND otp_code = :otp_code AND expires_at > NOW()");
        $stmt->bindParam(':phone_number', $phone_number);
        $stmt->bindParam(':otp_code', $otp_code);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            echo json_encode([
                'flag' => true,
                'message' => 'OTP معتبر است'
            ], JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode([
                'flag' => false,
                'message' => 'کد نامعتبر یا منقضی شده است'
            ], JSON_UNESCAPED_UNICODE);
        }
    } catch (PDOException $e) {
        echo json_encode([
            'flag' => false,
            'message' => 'خطا در پردازش درخواست: ' . $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
}
?>
