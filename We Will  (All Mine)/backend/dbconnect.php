<?php
$dsn = 'mysql:host=localhost;dbname=paimonak;charset=utf8mb4'; // Adjust your database name
$username = 'root'; // Your database username
$password = '8313ali4.3'; // Your database password

try {
    $conn = new PDO($dsn, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Enable exceptions for errors
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>
