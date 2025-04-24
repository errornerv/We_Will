<?php
session_start();
include 'dbconnect.php';

$merchant_id = "ca0db5c4-2723-4f80-a004-7ebe43d2858b"; // کد مخصوص زرین‌پال شما
$authority = $_GET['Authority'];
$status = $_GET['Status'];

if ($status == "OK") {
    $amount = $_POST['total_price']; // مبلغ پرداخت به ریال (باید با مقدار اولیه یکی باشد)

    // ارسال درخواست تأیید به API زرین‌پال
    $url = "https://api.zarinpal.com/pg/v4/payment/verify.json";
    $data = [
        "merchant_id" => $merchant_id,
        "amount" => $amount,
        "authority" => $authority
    ];

    $options = [
        "http" => [
            "header" => "Content-Type: application/json\r\n",
            "method" => "POST",
            "content" => json_encode($data)
        ]
    ];

    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $contسext);
    $response = json_decode($result, true);

    if (isset($response['data']['code']) && $response['data']['code'] == 100) {
        echo "پرداخت با موفقیت انجام شد. شماره پیگیری: " . $response['data']['ref_id'];
        // اینجا می‌توانید وضعیت سفارش را در دیتابیس به‌روز کنید و پیام موفقیت به کاربر نمایش دهید.
    } else {
        echo "خطا در تایید پرداخت: " . $response['errors']['message'];
    }
} else {
    echo "پرداخت لغو شد.";
}
?>
