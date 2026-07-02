<?php

if (!defined('ABSPATH')) {
    exit;
}

add_action('rest_api_init', function () {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function ($value) {
        $origin = get_http_origin();
        $allowed = apply_filters('fs_cms_allowed_origins', array(
            'http://localhost:5173',
            'http://127.0.0.1:5173',
            'http://xristou7.beget.tech',
            'https://xristou7.beget.tech',
            'https://format-studio.ru',
            'https://www.format-studio.ru',
        ));

        if ($origin && (in_array($origin, $allowed, true) || defined('FS_CMS_ALLOW_ALL_CORS'))) {
            header('Access-Control-Allow-Origin: ' . esc_url_raw($origin));
            header('Access-Control-Allow-Methods: GET, OPTIONS');
            header('Access-Control-Allow-Credentials: true');
        }

        return $value;
    }, 15);
}, 15);
