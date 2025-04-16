<?php
session_start();
require 'dbconnect.php'; // Include your DB connection file

// Check if user is logged in
if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];

    // Get the data from the request
    $data = json_decode(file_get_contents('php://input'), true);
    $product_id = $data['product_id'];
    $new_quantity = $data['quantity'];

    // Update the quantity in the cart
    $stmt = $conn->prepare("
        UPDATE cart
        SET quantity = ?
        WHERE user_id = ? AND product_id = ?
    ");
    $stmt->execute([$new_quantity, $user_id, $product_id]);

    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'User not logged in']);
}
?>
