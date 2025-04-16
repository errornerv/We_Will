<?php
require 'dbconnect.php'; // اتصال به دیتابیس

header('Content-Type: application/json'); // تعیین نوع محتوا به JSON

try {
    // درخواست برای دریافت تمام محصولات از پایگاه داده
    $stmt = $conn->prepare("SELECT product_id, product_name, price, description FROM products");
    $stmt->execute();

    $products = []; // آرایه‌ای برای ذخیره محصولات

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        // ساخت URL تصویر بر اساس ID محصول
        $image_url = '../frontend/products/' . $row['product_id'] . '.jpg'; // ساخت URL بر اساس product_id
        // بررسی وجود تصویر، در صورت عدم وجود از تصویر پیش‌فرض استفاده کنید
        if (!file_exists($image_url)) {
            $image_url = '../frontend/products/default.jpg'; // مسیر تصویر پیش‌فرض
        }

        // اضافه کردن محصول به آرایه
        $products[] = [
            'product_id' => $row['product_id'], // Added product ID for cart functionality
            'product_name' => $row['product_name'],
            'price' => $row['price'],
            'description' => $row['description'],
            'image_url' => htmlspecialchars($image_url) // اضافه کردن URL تصویر
        ];
    }

    // خروجی به فرمت JSON
    if (empty($products)) {
        echo json_encode(['products' => []]);
    } else {
        echo json_encode(['products' => $products]);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
