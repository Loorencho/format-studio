<?php

if (!defined('ABSPATH')) {
    exit;
}

add_action('add_meta_boxes', 'fs_cms_add_meta_boxes');
add_action('save_post_fs_service', 'fs_cms_save_service_meta');
add_action('save_post_fs_project', 'fs_cms_save_project_meta');

function fs_cms_add_meta_boxes() {
    add_meta_box(
        'fs_service_details',
        'Детали услуги',
        'fs_cms_render_service_meta_box',
        'fs_service',
        'normal',
        'high'
    );

    add_meta_box(
        'fs_project_details',
        'Детали проекта',
        'fs_cms_render_project_meta_box',
        'fs_project',
        'normal',
        'high'
    );
}

function fs_cms_render_service_meta_box($post) {
    wp_nonce_field('fs_cms_save_meta', 'fs_cms_meta_nonce');
    $description = get_post_meta($post->ID, 'fs_description', true);
    $items = get_post_meta($post->ID, 'fs_items', true);
    ?>
    <p>
        <label for="fs_description"><strong>Краткое описание</strong></label><br>
        <textarea id="fs_description" name="fs_description" rows="3" style="width:100%;"><?php echo esc_textarea($description); ?></textarea>
    </p>
    <p>
        <label for="fs_items"><strong>Пункты списка</strong> (каждый с новой строки)</label><br>
        <textarea id="fs_items" name="fs_items" rows="5" style="width:100%;"><?php echo esc_textarea($items); ?></textarea>
    </p>
    <?php
}

function fs_cms_render_project_meta_box($post) {
    wp_nonce_field('fs_cms_save_meta', 'fs_cms_meta_nonce');
    $category = get_post_meta($post->ID, 'fs_category', true);
    $area = get_post_meta($post->ID, 'fs_area', true);
    $year = get_post_meta($post->ID, 'fs_year', true);
    ?>
    <p>
        <label for="fs_category"><strong>Категория</strong></label><br>
        <input type="text" id="fs_category" name="fs_category" value="<?php echo esc_attr($category); ?>" style="width:100%;">
    </p>
    <p>
        <label for="fs_area"><strong>Площадь</strong></label><br>
        <input type="text" id="fs_area" name="fs_area" value="<?php echo esc_attr($area); ?>" style="width:100%;" placeholder="78 м²">
    </p>
    <p>
        <label for="fs_year"><strong>Год</strong></label><br>
        <input type="text" id="fs_year" name="fs_year" value="<?php echo esc_attr($year); ?>" style="width:100%;" placeholder="2025">
    </p>
    <p><em>Изображение — через «Изображение записи» справа.</em></p>
    <?php
}

function fs_cms_save_service_meta($post_id) {
    if (!fs_cms_verify_meta_nonce()) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    update_post_meta($post_id, 'fs_description', sanitize_textarea_field($_POST['fs_description'] ?? ''));
    update_post_meta($post_id, 'fs_items', sanitize_textarea_field($_POST['fs_items'] ?? ''));
}

function fs_cms_save_project_meta($post_id) {
    if (!fs_cms_verify_meta_nonce()) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    update_post_meta($post_id, 'fs_category', sanitize_text_field($_POST['fs_category'] ?? ''));
    update_post_meta($post_id, 'fs_area', sanitize_text_field($_POST['fs_area'] ?? ''));
    update_post_meta($post_id, 'fs_year', sanitize_text_field($_POST['fs_year'] ?? ''));
}

function fs_cms_verify_meta_nonce() {
    if (!isset($_POST['fs_cms_meta_nonce']) || !wp_verify_nonce($_POST['fs_cms_meta_nonce'], 'fs_cms_save_meta')) {
        return false;
    }
    return true;
}
