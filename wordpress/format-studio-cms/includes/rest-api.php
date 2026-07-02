<?php

if (!defined('ABSPATH')) {
    exit;
}

add_action('rest_api_init', 'fs_cms_register_rest_routes');

function fs_cms_register_rest_routes() {
    register_rest_route('format-studio/v1', '/content', array(
        'methods' => 'GET',
        'callback' => 'fs_cms_get_content',
        'permission_callback' => '__return_true',
    ));

    register_rest_route('format-studio/v1', '/settings', array(
        'methods' => 'GET',
        'callback' => 'fs_cms_get_settings',
        'permission_callback' => '__return_true',
    ));
}

function fs_cms_get_settings() {
    return rest_ensure_response(get_option('fs_site_settings', fs_cms_default_settings()));
}

function fs_cms_get_content() {
    return rest_ensure_response(array(
        'settings' => get_option('fs_site_settings', fs_cms_default_settings()),
        'services' => fs_cms_format_services(),
        'projects' => fs_cms_format_projects(),
    ));
}

function fs_cms_format_services() {
    $posts = get_posts(array(
        'post_type' => 'fs_service',
        'post_status' => 'publish',
        'numberposts' => -1,
        'orderby' => 'menu_order',
        'order' => 'ASC',
    ));

    $services = array();

    foreach ($posts as $post) {
        $items_raw = get_post_meta($post->ID, 'fs_items', true);
        $items = array_values(array_filter(array_map('trim', preg_split('/\r\n|\r|\n/', (string) $items_raw))));

        $services[] = array(
            'id' => $post->ID,
            'title' => get_the_title($post),
            'description' => get_post_meta($post->ID, 'fs_description', true) ?: wp_strip_all_tags($post->post_content),
            'items' => $items,
        );
    }

    return $services;
}

function fs_cms_format_projects() {
    $posts = get_posts(array(
        'post_type' => 'fs_project',
        'post_status' => 'publish',
        'numberposts' => -1,
        'orderby' => 'menu_order',
        'order' => 'ASC',
    ));

    $projects = array();

    foreach ($posts as $post) {
        $image = get_the_post_thumbnail_url($post, 'large');
        if (!$image) {
            $image = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80';
        }

        $projects[] = array(
            'id' => $post->ID,
            'title' => get_the_title($post),
            'category' => get_post_meta($post->ID, 'fs_category', true),
            'area' => get_post_meta($post->ID, 'fs_area', true),
            'year' => get_post_meta($post->ID, 'fs_year', true),
            'image' => $image,
        );
    }

    return $projects;
}
