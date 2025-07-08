<?php
include_once 'constant.php';
if (isset($_SERVER["HTTP_ORIGIN"])) {
    // You can decide if the origin in $_SERVER['HTTP_ORIGIN'] is something you want to allow, or as we do here, just allow all
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
} else {
    //No HTTP_ORIGIN set, so I am  allow localhost. You can disallow if needed here
    header("Access-Control-Allow-Origin: http://localhost:4200");
}

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 600");    // cache for 10 minutes

if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_METHOD"]))
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT"); //Make sure you remove those you do not want to support

    if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_HEADERS"]))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    //Just exit with 200 OK with the above headers for OPTIONS method
    exit(0);
}
function initFunction()
{
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        validateRecaptcha();
    } else {
        $myObj = new stdClass();
        $myObj->message = "Not Post Request";
        $myObj->sucess = false;
        http_response_code(404);
        echo json_encode($myObj);
        exit();
    }
}

initFunction();

function validateRecaptcha()
{
    $post = json_decode(file_get_contents("php://input"), true);
    if (isset($post['firstName']) && isset($post['emailAddress']) && isset($post['subject']) && isset($post['message']) && isset($post['recaptcha'])) {
        $secretKey = "6LfmNKMZAAAAAM50bkrw3wtl_2C6wZJI987Tso3Z";

        $verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret=' . $secretKey . '&response=' . $post['recaptcha']);
        $responseData = json_decode($verifyResponse, true);
        if ($responseData['success']) {
            sendMail($post);
        } else {
            $replyObject = new stdClass();
            $replyObject->message = "Robot Verification Falied :(";
            $replyObject->sucess = false;
            http_response_code(401);
            echo json_encode($replyObject);
            exit();
        }
    } else {
        $replyObject = new stdClass();
        $replyObject->message = "Please enter details properly";
        $replyObject->sucess = false;
        http_response_code(403);
        echo json_encode($replyObject);
        exit();
    }
}

function sendMail($data)
{
    $to   = CONTACT_US_MAIL_TO;
    $from = CONTACT_US_MAIL_FROM;
    $subject = "Recived Mail From Website ";

    $headers = 'From: '. $from . "\r\n" .
        'Reply-To: '. $from .',=' . "\r\n" .
        'X-Mailer: PHP/' . phpversion();
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html";

    $replace = array('{name}', '{email}', '{mobile_no}', '{subject}', '{message}');
    $with = array($data['firstName'] . " " . (isset($data['lastName']) ? $data['lastName'] : ""), $data['emailAddress'], (isset($data['mobileNo']) ? $data['mobileNo'] : "-"), $data['subject'], $data['message']);
    $contents = file_get_contents('internal.html');
    $message =   str_replace($replace, $with, $contents);

    $success = mail($to, $subject, $message, $headers);

    //Sending email to user
    $replyObject = new stdClass();
    if ($success) {
        $replyObject->message = "Thank you for connecting Us will get back to you";
        $replyObject->sucess = true;
        http_response_code(201);
        echo json_encode($replyObject);

        $replace = array('{name}');
        $with = array($data['firstName'] . " " . (isset($data['lastName']) ? $data['lastName'] : ""));
        $contents = file_get_contents('client.html');
        $to      = $data['emailAddress'];

        $header = 'From: info.jyotitechnosoft@gmail.com' . "\r\n" .
            'Reply-To: info.jyotitechnosoft@gmail.com,=' . "\r\n" .
            'X-Mailer: PHP/' . phpversion();
        $header .= "MIME-Version: 1.0\r\n";
        $header .= "Content-Type: text/html";
        $subject = "Thankyou for contacting Jyoti Technsoft LLP ";
        $message =   str_replace($replace, $with, $contents);
        $success = mail($to, $subject, $message, $header);
        exit();
    } else {
        $replyObject->message = "Error while sending mail";
        $replyObject->sucess = false;
        http_response_code(400);
        echo json_encode($replyObject);
        exit();
    }
}
