<?php

if (!defined('ABSPATH')) {
    exit;
}

function fs_cms_register_post_types() {
    register_post_type('fs_service', array(
        'labels' => array(
            'name' => 'Услуги',
            'singular_name' => 'Услуга',
            'add_new' => 'Добавить услугу',
            'add_new_item' => 'Добавить услугу',
            'edit_item' => 'Редактировать услугу',
        ),
        'public' => true,
        'show_in_rest' => true,
        'menu_icon' => 'dashicons-hammer',
        'supports' => array('title', 'editor', 'page-attributes'),
        'has_archive' => false,
    ));

    register_post_type('fs_project', array(
        'labels' => array(
            'name' => 'Проекты',
            'singular_name' => 'Проект',
            'add_new' => 'Добавить проект',
            'add_new_item' => 'Добавить проект',
            'edit_item' => 'Редактировать проект',
        ),
        'public' => true,
        'show_in_rest' => true,
        'menu_icon' => 'dashicons-admin-home',
        'supports' => array('title', 'thumbnail', 'page-attributes'),
        'has_archive' => false,
    ));

    $meta_args = array(
        'single' => true,
        'show_in_rest' => true,
        'type' => 'string',
        'auth_callback' => function () {
            return current_user_can('edit_posts');
        },
    );

    register_post_meta('fs_service', 'fs_description', $meta_args);
    register_post_meta('fs_service', 'fs_items', array_merge($meta_args, array(
        'type' => 'string',
        'description' => 'Пункты списка, каждый с новой строки',
    )));

    register_post_meta('fs_project', 'fs_category', $meta_args);
    register_post_meta('fs_project', 'fs_area', $meta_args);
    register_post_meta('fs_project', 'fs_year', $meta_args);
}
