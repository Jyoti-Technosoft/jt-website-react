<?php
include_once 'constant.php';

header('Content-Type: application/json');
if (isset($_SERVER["HTTP_ORIGIN"])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
} else {
    header("Access-Control-Allow-Origin: *");
}
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_HEADERS"])) {
    header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
}

if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    exit(0);
}

$token = isset($_GET['token']) ? trim($_GET['token']) : '';
if (!$token) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Token is missing.']);
    exit();
}

// Connect to MySQL database
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database connection failed.']);
    exit();
}

// Find subscriber by confirmation token
$stmt = $conn->prepare("SELECT id, email, status, token_expires_at FROM " . NEWSLETTER_TABLE . " WHERE confirmation_token = ?");
$stmt->bind_param("s", $token);
$stmt->execute();
$result = $stmt->get_result();
$subscriber = $result->fetch_assoc();
$stmt->close();

if (!$subscriber) {
    $conn->close();
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid or already used confirmation token.']);
    exit();
}

if ($subscriber['status'] === 'subscribed') {
    $conn->close();
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'This email is already confirmed.']);
    exit();
}

if (strtotime($subscriber['token_expires_at']) < time()) {
    $conn->close();
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Confirmation token has expired. Please subscribe again.']);
    exit();
}

// Update subscriber to confirmed/subscribed
$stmt = $conn->prepare("UPDATE " . NEWSLETTER_TABLE . " SET status='subscribed', confirmed_at=NOW(), confirmation_token=NULL, token_expires_at=NULL WHERE id=?");
$stmt->bind_param("i", $subscriber['id']);
$stmt->execute();
$stmt->close();
$conn->close();

echo json_encode(['success' => true, 'message' => 'Subscription confirmed successfully! Welcome to the Jyoti Technosoft newsletter.']);
?>
