<?php
require 'dbconnect.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $phone_number = $_POST['user_phone'];
    $otp_code = rand(100000, 999999);

    $url = 'https://console.melipayamak.com/api/send/otp/3627782073344c25b13d03c6fc428976';
    $data = array('to' => $phone_number, 'otp' => $otp_code);
    $data_string = json_encode($data);

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Content-Length: ' . strlen($data_string)
    ));

    $result = curl_exec($ch);
    curl_close($ch);

    $stmt = $conn->prepare("INSERT INTO phone_verifications (phone_number, otp_code, expires_at) VALUES (:phone_number, :otp_code, DATE_ADD(NOW(), INTERVAL 5 MINUTE))");
    $stmt->bindParam(':phone_number', $phone_number);
    $stmt->bindParam(':otp_code', $otp_code);
    $stmt->execute();

    echo "کد تایید ارسال شد";
}
?>
