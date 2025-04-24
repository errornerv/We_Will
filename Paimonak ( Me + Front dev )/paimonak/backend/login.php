
<?php
require 'dbconnect.php'; // اتصال به دیتابیس

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Expires: Sat, 01 Jan 2000 00:00:00 GMT");
header("Pragma: no-cache"); 

// Before session_start()
session_set_cookie_params(0); // Set cookie to expire when the browser is closed
session_start();

$response = []; // آرایه برای ذخیره نتیجه

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize user input
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    if (empty($username) || empty($password)) {
        $response['flag'] = false;
        $response['message'] = "لطفا همه فیلدها را پر کنید.";
        echo json_encode($response, JSON_UNESCAPED_UNICODE);
        exit();
    }

    try {
        // Prepare a query to check the username
        $sql = "SELECT * FROM users WHERE username = :username";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':username', $username, PDO::PARAM_STR);
        $stmt->execute();

        if ($stmt->rowCount() == 1) {
            // Fetch the user data
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            // Verify the password
            if (password_verify($password, $user['password'])) {
                // Store session data and set expiration time
                $_SESSION['user_id'] = $user['user_id'];
                $_SESSION['username'] = $user['username'];

                // Set session expiration time (e.g., 15 minutes)
                $_SESSION['last_activity'] = time();
                $_SESSION['expire_time'] = 900; // Session will expire after 900 seconds (15 minutes)

                // Success response
                $response['flag'] = true;
                $response['message'] = "ورود موفقیت‌آمیز بود!";
            } else {
                $response['flag'] = false;
                $response['message'] = "رمز عبور اشتباه است!";
            }
        } else {
            $response['flag'] = false;
            $response['message'] = "کاربری با این نام کاربری یافت نشد!";
        }
    } catch (PDOException $e) {
        $response['flag'] = false;
        $response['message'] = "خطا در اجرای درخواست: " . $e->getMessage();
    }

    // Return the response as JSON
    echo json_encode($response, JSON_UNESCAPED_UNICODE);

    // Close the connection (optional with PDO, but good practice)
    $conn = null;
}
?>
