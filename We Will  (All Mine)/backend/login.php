<?php
require 'dbconnect.php'; // اتصال به دیتابیس

// Before session_start()
session_set_cookie_params(0); // Set cookie to expire when the browser is closed
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize user input
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    if (empty($username) || empty($password)) {
        echo "لطفا همه فیلدها را پر کنید.";
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

                // Success message
                echo "ورود موفقیت‌آمیز بود!";
            } else {
                echo "رمز عبور اشتباه است!";
            }
        } else {
            echo "کاربری با این نام کاربری یافت نشد!";
        }
    } catch (PDOException $e) {
        echo "خطا در اجرای درخواست: " . $e->getMessage();
    }

    // Close the connection (optional with PDO, but good practice)
    $conn = null;
}
?>
