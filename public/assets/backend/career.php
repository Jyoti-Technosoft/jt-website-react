<?php

function FileTypeEnum()
{
    return (object) array(
        'PDF' => 'application/pdf'
    );
}


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
    if (isset($_FILES["resume"]) && isset($_POST["firstName"]) && isset($_POST["emailAddress"]) && isset($_POST['mobileNo']) && isset($_POST['currentSalary']) && isset($_POST['noticePeriod']) && isset($_POST['recaptcha'])) {
        $secretKey = "6LfmNKMZAAAAAM50bkrw3wtl_2C6wZJI987Tso3Z";

        $verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret=' . $secretKey . '&response=' . $_POST['recaptcha']);
        $responseData = json_decode($verifyResponse, true);
        if ($responseData['success']) {
            sendMail();
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

function sendMail()
{
    if (isset($_FILES["resume"])) {
        // File details
        $file = $_FILES["resume"];
        $file_name = $file["name"];
        $file_tmp = $file["tmp_name"];
        $file_type = $file["type"];


        $file_info = finfo_open(FILEINFO_MIME_TYPE);
        $mime_type = finfo_file($file_info, $file_tmp);

        if ($mime_type  === FileTypeEnum()->PDF) {
            // Read the file content
            $file_content = file_get_contents($file_tmp);

            $to = CAREER_MAIL_TO;
            $from = CAREER_MAIL_FROM;
            $subject = 'Recived one Inquirey on Career portal';

            $replace = array('{name}', '{email}', '{hire}', '{contact}','{current_salary}','{notice_priod}');
            $with = array($_POST['firstName'] . " " . (isset($_POST['lastName']) ? $_POST['lastName'] : ""), $_POST['emailAddress'], $_POST['position'], $_POST['mobileNo'], $_POST['currentSalary'], $_POST['currentSalary']);
            $contents = file_get_contents('careerinternal.html');
            $message =   str_replace($replace, $with, $contents);

            $boundary = md5(time());

            // Headers
            $headers = "From: $from\r\n";
            $headers .= "Reply-To: info.jyotitechnosoft@gmail.com\r\n";
            $headers .= "MIME-Version: 1.0\r\n";

            // Content-Type header for the HTML part
            $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n\r\n";

            // Message body
            $body = "--$boundary\r\n";
            $body .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
            $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
            $body .= $message . "\r\n";

            // Attachment
            $body .= "--$boundary\r\n";
            $body .= "Content-Type: $file_type; name=\"$file_name\"\r\n";
            $body .= "Content-Disposition: attachment; filename=\"$file_name\"\r\n";
            $body .= "Content-Transfer-Encoding: base64\r\n";
            $body .= "X-Attachment-Id: " . rand(1000, 99999) . "\r\n\r\n";
            $body .= chunk_split(base64_encode($file_content)) . "\r\n";

            // End boundary
            $body .= "--$boundary--\r\n";

            // Send the email
            $mail = mail($to, $subject, $body, $headers);

            // Check if the email was sent successfully
            if ($mail) {
                $replyObject = new stdClass();
                $replyObject->message = "Thank you for applying in Jyoti Technosoft LLP";
                $replyObject->sucess = true;
                http_response_code(201);
                echo json_encode($replyObject);
                $header = 'From: info.jyotitechnosoft@gmail.com' . "\r\n" .
                    'Reply-To: info.jyotitechnosoft@gmail.com,=' . "\r\n" .
                    'X-Mailer: PHP/' . phpversion();
                $header .= "MIME-Version: 1.0\r\n";
                $header .= "Content-Type: text/html";
                $replace = array('{name}', '{applyFor}');
                $with = array($_POST['firstName'] . " " . (isset($_POST['lastName']) ? $_POST['lastName'] : ""), $_POST['position']);
                $contents = file_get_contents('careerClient.html');
                $to      = $_POST['emailAddress'];
                $subject = "Thankyou for applying in Jyoti Technsoft LLP ";
                $message =   str_replace($replace, $with, $contents);
                $success = mail($to, $subject, $message, $header);
                exit();
            } else {
                $replyObject = new stdClass();
                $replyObject->message = "Error While Sending Mail";
                $replyObject->sucess = false;
                http_response_code(501);
                echo json_encode($replyObject);
                exit();
            }
        } else {
            $replyObject = new stdClass();
            $replyObject->message = "Please upload file with pdf extention";
            $replyObject->sucess = false;
            http_response_code(501);
            echo json_encode($replyObject);
            exit();
        }
    }
}
