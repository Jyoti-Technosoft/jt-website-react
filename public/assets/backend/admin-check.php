<?php
session_start();
header('Content-Type: application/json');
if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in']) {
    echo json_encode(['loggedIn' => true]);
} else {
    echo json_encode(['loggedIn' => false]);
} 