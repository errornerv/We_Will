<?php
session_start();

$response = [];

// بررسی لاگین بودن کاربر از سشن
if (isset($_SESSION['user_id'])) {
    $response['status'] = 'logged_in';
    $response['username'] = $_SESSION['username']; // بازگشت نام کاربری
} else {
    $response['status'] = 'logged_out';
}

// ارسال پاسخ به فرمت JSON
echo json_encode($response);
?>
