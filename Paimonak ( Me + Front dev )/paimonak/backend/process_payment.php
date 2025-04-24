<?php
session_start();
include 'dbconnect.php';

if (!isset($_SESSION['user_id'])) {
    echo "شما وارد سیستم نشده‌اید.";
    exit;
}

$merchant_id = "ca0db5c4-2723-4f80-a004-7ebe43d2858b"; // کد مخصوص زرین‌پال شما
$amount = $_POST['total_price']; // مبلغ پرداختی که از سبد خرید دریافت شده است
$description = "پرداخت بابت خرید از فروشگاه"; // توضیحات مربوط به پرداخت
$callback_url = "http://yourwebsite.com/payment_verify.php"; // آدرس بازگشت از درگاه، باید تنظیم شود

// ارسال درخواست به API زرین‌پال
$url = "https://api.zarinpal.com/pg/v4/payment/request.json";
$data = [
    "merchant_id" => $merchant_id,
    "amount" => $amount,
    "description" => $description,
    "callback_url" => $callback_url
];

$options = [
    "http" => [
        "header" => "Content-Type: application/json\r\n",
        "method" => "POST",
        "content" => json_encode($data)
    ]
];

$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);
$response = json_decode($result, true);

// بررسی موفقیت‌آمیز بودن درخواست
if (isset($response['data']['code']) && $response['data']['code'] == 100) {
    // هدایت به درگاه پرداخت
    $authority = $response['data']['authority'];
    header("Location: https://www.zarinpal.com/pg/StartPay/$authority");
    exit;
} else {
    // نمایش خطا در صورت عدم موفقیت
    echo "خطا در ایجاد درخواست پرداخت: " . $response['errors']['message'];
}
?>
