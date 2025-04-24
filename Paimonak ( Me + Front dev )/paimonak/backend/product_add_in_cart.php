<?php
session_start();
require 'dbconnect.php'; // Include your DB connection file

header('Content-Type: application/json'); // Ensure the response is in JSON format

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => true]); // Generic error response
    exit();
}

if (!isset($data['product_id'])) {
    echo json_encode(['error' => true]); // Generic error response
    exit();
}

$user_id = $_SESSION['user_id'];
$product_id = $data['product_id'];

try {
    // Check if the product is already in the cart
    $stmt = $conn->prepare("SELECT * FROM cart WHERE user_id = ? AND product_id = ?");
    $stmt->execute([$user_id, $product_id]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        // Increment the quantity
        $stmt = $conn->prepare("UPDATE cart SET quantity = quantity + 1 WHERE user_id = ? AND product_id = ?");
        $stmt->execute([$user_id, $product_id]);
    } else {
        // Add new product with a quantity of 1
        $stmt = $conn->prepare("INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, 1)");
        $stmt->execute([$user_id, $product_id]);
    }

    echo json_encode(['success' => true]); // Successful response
} catch (Exception $e) {
    echo json_encode(['error' => true]); // Generic error response
}
