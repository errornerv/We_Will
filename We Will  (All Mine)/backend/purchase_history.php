<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();
require 'dbconnect.php'; // Database connection

header('Content-Type: application/json'); // Set the header to return JSON

if (!isset($_SESSION["user_id"])) {
    // Return an error message if the user is not logged in
    echo json_encode(['error' => 'لطفا وارد حساب کاربری خود شوید.']);
    exit;
}

$user_id = $_SESSION["user_id"];

try {
    // Prepare the SQL statement to fetch purchase history
    $stmt = $conn->prepare("SELECT t.*, p.product_name, p.uid, p.server 
                             FROM purchase_history t 
                             JOIN products p ON t.product_id = p.product_id 
                             WHERE t.user_id = :user_id");
    $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();

    $purchaseHistory = [];

    if ($stmt->rowCount() > 0) {
        // Fetch the data and store it in an array
        while ($transaction = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $purchaseHistory[] = [
                'product_name' => htmlspecialchars($transaction["product_name"]),
                'quantity' => htmlspecialchars($transaction["quantity"]),
                'total_price' => htmlspecialchars($transaction["total_price"]),
                'purchased_at' => htmlspecialchars($transaction["purchased_at"]),
                'uid' => htmlspecialchars($transaction["uid"]),
                'server' => htmlspecialchars($transaction["server"])
            ];
        }

        // Return the purchase history as a JSON array
        echo json_encode($purchaseHistory);
    } else {
        // Return an empty array if no purchases are found
        echo json_encode([]);
    }
} catch (PDOException $e) {
    // Return a JSON error message if a database error occurs
    echo json_encode(['error' => 'خطا در اجرای درخواست: ' . $e->getMessage()]);
} finally {
    // Close the database connection
    $conn = null;
}
