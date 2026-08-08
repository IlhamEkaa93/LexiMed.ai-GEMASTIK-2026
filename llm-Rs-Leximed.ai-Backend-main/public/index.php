<?php

use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// --- 1. VERCEL CORS & PREFLIGHT FIX ---
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE, PATCH");
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    exit(0);
}

// --- 2. VERCEL AUTHORIZATION HEADER FIX ---
if (!isset($_SERVER['HTTP_AUTHORIZATION'])) {
    if (isset($_SERVER['Authorization'])) {
        $_SERVER['HTTP_AUTHORIZATION'] = $_SERVER['Authorization'];
    } elseif (function_exists('getallheaders')) {
        $requestHeaders = getallheaders();
        $requestHeaders = array_change_key_case($requestHeaders, CASE_UPPER);
        if (isset($requestHeaders['AUTHORIZATION'])) {
            $_SERVER['HTTP_AUTHORIZATION'] = $requestHeaders['AUTHORIZATION'];
        }
    }
}

// --- 3. VERCEL SERVERLESS STORAGE FIX (LENGKAP) ---
// Filesystem Vercel READ-ONLY kecuali /tmp. Semua sub-folder storage
// Laravel yang butuh tulis (views, cache, sessions, logs) HARUS
// diarahkan ke /tmp, bukan cuma "views" saja.
$storagePath = '/tmp/storage';

$dirs = [
    $storagePath . '/framework/views',
    $storagePath . '/framework/cache/data',
    $storagePath . '/framework/sessions',
    $storagePath . '/logs',
    $storagePath . '/app',
];

foreach ($dirs as $dir) {
    if (!is_dir($dir)) {
        mkdir($dir, 0777, true);
    }
}

putenv("APP_SERVICES_CACHE=/tmp/services.php");
putenv("APP_PACKAGES_CACHE=/tmp/packages.php");
putenv("APP_CONFIG_CACHE=/tmp/config.php");
putenv("APP_ROUTES_CACHE=/tmp/routes.php");
putenv("APP_EVENTS_CACHE=/tmp/events.php");

putenv("VIEW_COMPILED_PATH={$storagePath}/framework/views");
putenv("SESSION_DRIVER=array");     // <-- kunci: hindari nulis file session sama sekali
putenv("CACHE_STORE=array");        // aman kalau tidak pakai redis/db cache
putenv("LOG_CHANNEL=stderr");       // log ke stderr Vercel, bukan file storage/logs

$_ENV['SESSION_DRIVER'] = 'array';
$_ENV['CACHE_STORE'] = 'array';
$_ENV['LOG_CHANNEL'] = 'stderr';

// --- 4. JALANKAN LARAVEL ---
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

require __DIR__.'/../vendor/autoload.php';

(require_once __DIR__.'/../bootstrap/app.php')
    ->handleRequest(Request::capture());