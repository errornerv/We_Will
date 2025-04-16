<?php
require 'dbconnect.php'; // اتصال به دیتابیس

error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json'); // تعیین نوع محتوا به JSON

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // تمیز کردن ورودی‌ها
    $username = trim($_POST['new-username']);
    $email = trim($_POST['email']);
    $phone = trim($_POST['phone']);
    $password = trim($_POST['new-password']);
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    try {
        // بررسی وجود کاربر
        $check_existing_query = "SELECT * FROM users WHERE email = :email OR phone_number = :phone OR username = :username";
        $stmt = $conn->prepare($check_existing_query);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':phone', $phone);
        $stmt->bindParam(':username', $username);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $existing_user = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($existing_user['email'] === $email) {
                echo json_encode(['status' => 'error', 'message' => 'این ایمیل قبلاً ثبت شده است!']);
            } elseif ($existing_user['phone_number'] === $phone) {
                echo json_encode(['status' => 'error', 'message' => 'این شماره موبایل قبلاً ثبت شده است!']);
            } elseif ($existing_user['username'] === $username) {
                echo json_encode(['status' => 'error', 'message' => 'این نام کاربری قبلاً ثبت شده است!']);
            }
        } else {
            // ذخیره کاربر جدید
            $sql = "INSERT INTO users (username, email, phone_number, password) VALUES (:username, :email, :phone, :password)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':username', $username);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':phone', $phone);
            $stmt->bindParam(':password', $hashed_password);

            if ($stmt->execute()) {
                echo json_encode(['status' => 'success', 'message' => 'ثبت‌نام موفقیت‌آمیز بود!']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'خطا در ثبت‌نام. لطفاً دوباره امتحان کنید.']);
            }
        }

    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'خطا در ارتباط با پایگاه داده: ' . $e->getMessage()]);
    }

    // بستن منابع
    $conn = null; // بستن اتصال PDO
}
?>
