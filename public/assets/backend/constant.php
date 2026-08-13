<?php 
define("CONTACT_US_MAIL_TO","info@jyotitechnosoft.com");
define("BUSSINESS_MAIL_TO","business@jyotitechnosoft.com");
define("CAREER_MAIL_TO","hr@jyotitechnosoft.com");
define("CAREER_MAIL_FROM","hr@jyotitechnosoft.com");
define("CONTACT_US_MAIL_FROM","info@jyotitechnosoft.com");
define("BUSSINESS_MAIL_FROM","business@jyotitechnosoft.com");

function get_required_property($properties, $key) {
    if (!isset($properties[$key]) || trim($properties[$key]) === '') {
        throw new Exception("Missing required property: " . $key);
    }

    return trim($properties[$key]);
}

$propertiesPath = __DIR__ . '/database.properties';
$properties = file_exists($propertiesPath) ? parse_ini_file($propertiesPath) : [];

if ($properties === false) {
    throw new Exception("Unable to read database properties file.");
}

// MySQL Database Configuration
define("DB_HOST", get_required_property($properties, "DB_HOST"));
define("DB_USER", get_required_property($properties, "DB_USER"));
define("DB_PASS", isset($properties["DB_PASS"]) ? trim($properties["DB_PASS"]) : "");
define("DB_NAME", get_required_property($properties, "DB_NAME"));
define("NEWSLETTER_TABLE", "`" . get_required_property($properties, "NEWSLETTER_TABLE") . "`");
?>
