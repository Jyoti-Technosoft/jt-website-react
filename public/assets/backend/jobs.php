<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$FILE_PATH = __DIR__ . '/openings.json';

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

function read_jobs($file) {
    if (!file_exists($file)) return ['jobs' => []];
    $data = file_get_contents($file);
    return json_decode($data, true) ?: ['jobs' => []];
}

function write_jobs($file, $data) {
    file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $data = read_jobs($FILE_PATH);
        echo json_encode(['jobs' => $data['jobs'] ?? []]);
        break;
    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        $data = read_jobs($FILE_PATH);
        $newJob = array_merge(['id' => round(microtime(true) * 1000)], $input ?: []);
        $data['jobs'][] = $newJob;
        write_jobs($FILE_PATH, $data);
        http_response_code(201);
        echo json_encode(['message' => 'Job added', 'job' => $newJob]);
        break;
    case 'PUT':
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['message' => 'Missing job id']);
            break;
        }
        $id = intval($_GET['id']);
        $input = json_decode(file_get_contents('php://input'), true);
        $data = read_jobs($FILE_PATH);
        $found = false;
        foreach ($data['jobs'] as &$job) {
            if ($job['id'] == $id) {
                $job = array_merge($job, $input ?: []);
                $found = true;
                break;
            }
        }
        if (!$found) {
            http_response_code(404);
            echo json_encode(['message' => 'Job not found']);
            break;
        }
        write_jobs($FILE_PATH, $data);
        echo json_encode(['message' => 'Job updated', 'job' => $job]);
        break;
    case 'DELETE':
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['message' => 'Missing job id']);
            break;
        }
        $id = intval($_GET['id']);
        $data = read_jobs($FILE_PATH);
        $originalCount = count($data['jobs']);
        $data['jobs'] = array_values(array_filter($data['jobs'], function($j) use ($id) { return $j['id'] != $id; }));
        if (count($data['jobs']) === $originalCount) {
            http_response_code(404);
            echo json_encode(['message' => 'Job not found']);
            break;
        }
        write_jobs($FILE_PATH, $data);
        echo json_encode(['message' => 'Job deleted']);
        break;
    default:
        http_response_code(405);
        echo json_encode(['message' => 'Method not allowed']);
        break;
} 