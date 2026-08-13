<?php
include_once 'constant.php';

header('Content-Type: application/json');
if (isset($_SERVER["HTTP_ORIGIN"])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
} else {
    header("Access-Control-Allow-Origin: *");
}
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 600");

if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_METHOD"]))
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_HEADERS"]))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

$input = json_decode(file_get_contents("php://input"), true);
if (!isset($input['email'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Email is required']);
    exit();
}

$email = strtolower(trim($input['email']));
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
    exit();
}

if (!isset($input['recaptcha'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please complete the reCAPTCHA verification.']);
    exit();
}

$secretKey = "6LfmNKMZAAAAAM50bkrw3wtl_2C6wZJI987Tso3Z";
$verifyResponse = @file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret=' . $secretKey . '&response=' . $input['recaptcha']);
$responseData = json_decode($verifyResponse, true);

// Allow localhost environment to bypass/mock if needed, but validate properly
$isLocalhost = isset($_SERVER['HTTP_HOST']) && (
    strpos($_SERVER['HTTP_HOST'], 'localhost') !== false ||
    strpos($_SERVER['HTTP_HOST'], '127.0.0.1') !== false
);

if (!$isLocalhost && (!$responseData || !$responseData['success'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Robot Verification Failed :(']);
    exit();
}


// Connect to MySQL database
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database connection failed.']);
    exit();
}

// Ensure table exists
$conn->query("CREATE TABLE IF NOT EXISTS " . NEWSLETTER_TABLE . " (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    status ENUM('pending','subscribed','unsubscribed') DEFAULT 'pending',
    confirmation_token VARCHAR(128),
    unsubscribe_token VARCHAR(128),
    token_expires_at DATETIME,
    subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    confirmed_at DATETIME DEFAULT NULL,
    unsubscribed_at DATETIME DEFAULT NULL
)");

// Check if subscriber already exists
$stmt = $conn->prepare("SELECT id, status FROM " . NEWSLETTER_TABLE . " WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$existing = $result->fetch_assoc();
$stmt->close();

if ($existing && $existing['status'] === 'subscribed') {
    $conn->close();
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'This email is already subscribed to our newsletter.']);
    exit();
}

// Generate tokens
$token = bin2hex(random_bytes(32));
$unsubscribeToken = bin2hex(random_bytes(32));
$expiresAt = date('Y-m-d H:i:s', time() + (24 * 60 * 60)); // 24 hours

if ($existing) {
    // Update existing pending/unsubscribed record
    $stmt = $conn->prepare("UPDATE " . NEWSLETTER_TABLE . " SET status='pending', confirmation_token=?, unsubscribe_token=?, token_expires_at=?, subscribed_at=NOW(), confirmed_at=NULL, unsubscribed_at=NULL WHERE email=?");
    $stmt->bind_param("ssss", $token, $unsubscribeToken, $expiresAt, $email);
} else {
    // Insert new subscriber
    $stmt = $conn->prepare("INSERT INTO " . NEWSLETTER_TABLE . " (email, status, confirmation_token, unsubscribe_token, token_expires_at) VALUES (?, 'pending', ?, ?, ?)");
    $stmt->bind_param("ssss", $email, $token, $unsubscribeToken, $expiresAt);
}

if (!$stmt->execute()) {
    $stmt->close();
    $conn->close();
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to save subscription. Please try again.']);
    exit();
}
$stmt->close();
$conn->close();

// Send confirmation email
$frontendUrl = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : 'https://jyotitechnosoft.com';
$confirmUrl = $frontendUrl . '/newsletter/confirm?token=' . $token;

$to = $email;
$from = CONTACT_US_MAIL_FROM;
$subject = "Confirm your newsletter subscription - Jyoti Technosoft";

$headers  = 'From: ' . $from . "\r\n";
$headers .= 'Reply-To: ' . $from . "\r\n";
$headers .= 'X-Mailer: PHP/' . phpversion() . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8";

$templatePath = __DIR__ . '/newsletter_confirm.html';
$contents = file_exists($templatePath) ? file_get_contents($templatePath) : '';
if (!$contents) {
    $contents = '<p>Please confirm your subscription by clicking: <a href="{confirm_url}">{confirm_url}</a></p>';
}
$message = str_replace('{confirm_url}', $confirmUrl, $contents);

// Suppress warning if mail fails (common on localhost without SMTP)
$success = @mail($to, $subject, $message, $headers);

$isLocalhost = isset($_SERVER['HTTP_HOST']) && (
    strpos($_SERVER['HTTP_HOST'], 'localhost') !== false ||
    strpos($_SERVER['HTTP_HOST'], '127.0.0.1') !== false
);

if ($success || $isLocalhost) {
    http_response_code(201);
    $msg = 'Thanks for subscribing! Please check your inbox to confirm your subscription.';
    if (!$success && $isLocalhost) {
        $msg .= ' (Localhost: email queued but not actually sent)';
    }
    echo json_encode(['success' => true, 'message' => $msg]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Subscription saved but failed to send confirmation email. Please try again.']);
}
?>
