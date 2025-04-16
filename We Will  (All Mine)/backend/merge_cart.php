<?php
session_start();
include 'db_connection.php'; // Include database connection

$user_id = $_SESSION['user_id']; // Get the logged-in user's ID
$cartItems = json_decode(file_get_contents('php://input'), true)['cartItems']; // Get session cart items

if ($user_id && !empty($cartItems)) {
foreach ($cartItems as $item) {
$product_id = $item['product_id'];
$quantity = $item['quantity'];

// Check if the product already exists in the user's cart in the database
$query = "SELECT * FROM user_cart WHERE user_id = ? AND product_id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("ii", $user_id, $product_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
// If the product exists, update the quantity
$query = "UPDATE user_cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("iii", $quantity, $user_id, $product_id);
} else {
// If the product does not exist, insert a new row
$query = "INSERT INTO user_cart (user_id, product_id, quantity) VALUES (?, ?, ?)";
$stmt = $conn->prepare($query);
$stmt->bind_param("iii", $user_id, $product_id, $quantity);
}
$stmt->execute();
}

echo json_encode(['success' => true]);
} else {
echo json_encode(['success' => false, 'message' => 'No items to merge or user not logged in']);
}
