<?php
session_start();
require 'dbconnect.php'; // Include your DB connection file

// Check if user is logged in
if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];

    // Prepare the query to fetch cart items along with product details
    $stmt = $conn->prepare("
        SELECT p.product_id, p.product_name, p.price, c.quantity
        FROM cart c
        JOIN products p ON c.product_id = p.product_id
        WHERE c.user_id = ?
    ");
    $stmt->execute([$user_id]);
    $cartItems = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return JSON response
    echo json_encode($cartItems);
} else {
    // If user is not logged in, return session cart data (if any)
    // Handle session cart logic here if applicable
    echo json_encode([]);
}
