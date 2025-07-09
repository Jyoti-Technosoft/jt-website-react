<?php
session_start();

$USERNAME = 'admin@example.com';
$PASSWORD = 'password123';

// Accept JSON POST
$data = json_decode(file_get_contents('php://input'), true);

if ($data['email'] === $USERNAME && $data['password'] === $PASSWORD) {
    $_SESSION['admin_logged_in'] = true;
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
} 