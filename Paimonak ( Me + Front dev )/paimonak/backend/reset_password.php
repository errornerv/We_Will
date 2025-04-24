<?php
// Load Composer's autoloader if you're using Composer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Make sure this path is correct if you're using Composer

// Database connection
require 'dbconnect.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['reset-email'];

    // Check if the email exists in the users table
    $stmt = $conn->prepare('SELECT email FROM users WHERE email = :email');
    $stmt->bindParam(':email', $email);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        // Email exists, generate a unique token for password reset
        $token = bin2hex(random_bytes(50));

        // Insert token into the password_resets table
        $stmt = $conn->prepare('INSERT INTO password_resets (email, token) VALUES (:email, :token)');
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':token', $token);
        $stmt->execute();

        // Create a password reset link
        $resetLink = "http://localhost/we%20will/backend/reset_form.php?token=" . $token;

        // Setup PHPMailer for SMTP
        $mail = new PHPMailer(true);

        try {
            // SMTP server configuration
            $mail->isSMTP();                                      // Use SMTP
            $mail->Host       = 'python100.limoo.host';           // SMTP server
            $mail->SMTPAuth   = true;                             // Enable SMTP authentication
            $mail->Username   = 'paimonak@wewill.club';           // SMTP username (your email)
            $mail->Password   = 'pPWbqlx!p6qG';                   // SMTP password
            $mail->SMTPSecure = 'ssl';                            // Enable SSL encryption
            $mail->Port       = 465;                              // SMTP port

            // Email sender and recipient
            $mail->setFrom('paimonak@wewill.club', 'Paimonak');    // Sender email and name
            $mail->addAddress($email);                            // Recipient email (the user)

            // Email content
            $mail->isHTML(true);                                  // Set email format to HTML
            $mail->Subject = 'Password Reset Request';
            $mail->Body    = 'Click on the following link to reset your password: <a href="' . $resetLink . '">Reset Password</a>';
            $mail->AltBody = 'Click on the following link to reset your password: ' . $resetLink;

            // Send the email
            $mail->send();
            echo 'A password reset link has been sent to your email.';
        } catch (Exception $e) {
            // Handle error
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }

    } else {
        // Email doesn't exist
        echo 'Email does not exist.';
    }
}
?>
