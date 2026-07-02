<?php
if (($_GET['key'] ?? '') !== 'fs2025setup') {
    http_response_code(403);
    exit('Forbidden');
}
require __DIR__ . '/wp-load.php';
require_once ABSPATH . 'wp-admin/includes/plugin.php';
$result = activate_plugin('format-studio-cms/format-studio-cms.php');
if (is_wp_error($result)) {
    http_response_code(500);
    exit($result->getMessage());
}
echo 'Plugin activated OK';
@unlink(__FILE__);
