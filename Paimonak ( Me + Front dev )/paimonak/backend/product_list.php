
<?php
require 'dbconnect.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Expires: Sat, 01 Jan 2000 00:00:00 GMT");
header("Pragma: no-cache");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $stmt = $conn->prepare("SELECT product_id, product_name, price, description FROM products");
        $stmt->execute();

        $products = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $image_path = $_SERVER['DOCUMENT_ROOT'] . '/wewillwebside/paimonak/frontend/src/assets/' . $row['product_id'] . '.png';
            $image_url = 'http://localhost/wewillwebside/paimonak/frontend/src/assets/' . $row['product_id'] . '.png';

            if (!file_exists($image_path)) {
                $image_url = 'http://localhost/wewillwebside/paimonak/frontend/src/assets/default.png';
            }

            $products[] = [
                'product_id' => $row['product_id'],
                'product_name' => $row['product_name'],
                'price' => $row['price'],
                'description' => $row['description'],
                'image_url' => htmlspecialchars($image_url)
            ];
        }

        echo json_encode(['products' => $products], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()], JSON_UNESCAPED_UNICODE);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Invalid request method. Only GET is allowed.'], JSON_UNESCAPED_UNICODE);
}
?>
