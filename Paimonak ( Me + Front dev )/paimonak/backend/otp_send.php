<?php
// Include the database connection (make sure the path is correct)
include 'dbconnect.php'; // This will define the $conn variable (your PDO connection)

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Expires: Sat, 01 Jan 2000 00:00:00 GMT");
header("Pragma: no-cache");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve phone number from POST request
    $phone_number = trim(file_get_contents('php://input'));

    // Generate a random 6-digit OTP
    $otp_code = rand(100000, 999999);

    // Set the expiry time to 5 minutes from now
    $expires_at = date("Y-m-d H:i:s", strtotime('+5 minutes'));

    try {
        // Prepare and execute the SQL insert query
        $stmt = $conn->prepare("INSERT INTO phone_verifications (phone_number, otp_code, expires_at) VALUES (:phone_number, :otp_code, :expires_at)");
        $stmt->bindParam(':phone_number', $phone_number);
        $stmt->bindParam(':otp_code', $otp_code);
        $stmt->bindParam(':expires_at', $expires_at);
        $stmt->execute();

        // Send OTP via Melipayamak API
        $url = 'https://console.melipayamak.com/api/send/otp/c17b71e07b2a4411bd29999ec6696e29';
        $data = array('to' => $phone_number, 'otp' => $otp_code);
        $data_string = json_encode($data);

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Insecure, but OK for testing
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
            'Content-Length: ' . strlen($data_string)
        ));

        $result = curl_exec($ch);

        if (curl_errno($ch)) {
            echo 'خطا در ارسال پیامک: ' . curl_error($ch);
        } else {
            echo 'کد تایید ارسال شد!';
        }

        curl_close($ch);
    } catch (PDOException $e) {
        // Handle database-related errors
        echo 'خطا در ذخیره‌سازی کد OTP در دیتابیس: ' . $e->getMessage() . "{{$phone_number}}";
    }
}
?>
