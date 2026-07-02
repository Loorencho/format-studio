<?php

if (!defined('ABSPATH')) {
    exit;
}

add_action('admin_menu', 'fs_cms_register_settings_page');
add_action('admin_init', 'fs_cms_register_settings');

function fs_cms_register_settings_page() {
    add_menu_page(
        'Format Studio',
        'Format Studio',
        'manage_options',
        'format-studio-cms',
        'fs_cms_render_settings_page',
        'dashicons-admin-site-alt3',
        3
    );
}

function fs_cms_register_settings() {
    register_setting('fs_cms_settings_group', 'fs_site_settings', array(
        'type' => 'array',
        'sanitize_callback' => 'fs_cms_sanitize_settings',
        'default' => fs_cms_default_settings(),
    ));
}

function fs_cms_sanitize_settings($input) {
    return is_array($input) ? $input : fs_cms_default_settings();
}

function fs_cms_render_settings_page() {
    if (!current_user_can('manage_options')) {
        return;
    }

    $settings = get_option('fs_site_settings', fs_cms_default_settings());
    ?>
    <div class="wrap">
        <h1>Format Studio — настройки сайта</h1>
        <p>Контент для React-сайта. Услуги и проекты редактируются в отдельных разделах меню.</p>
        <form method="post" action="options.php">
            <?php settings_fields('fs_cms_settings_group'); ?>
            <table class="form-table" role="presentation">
                <tr>
                    <th scope="row">Hero — бейдж</th>
                    <td><input type="text" name="fs_site_settings[hero][badge]" value="<?php echo esc_attr($settings['hero']['badge'] ?? ''); ?>" class="regular-text"></td>
                </tr>
                <tr>
                    <th scope="row">Hero — заголовок</th>
                    <td><input type="text" name="fs_site_settings[hero][title]" value="<?php echo esc_attr($settings['hero']['title'] ?? ''); ?>" class="regular-text"></td>
                </tr>
                <tr>
                    <th scope="row">Hero — акцент</th>
                    <td><input type="text" name="fs_site_settings[hero][title_accent]" value="<?php echo esc_attr($settings['hero']['title_accent'] ?? ''); ?>" class="regular-text"></td>
                </tr>
                <tr>
                    <th scope="row">Hero — текст</th>
                    <td><textarea name="fs_site_settings[hero][text]" rows="3" class="large-text"><?php echo esc_textarea($settings['hero']['text'] ?? ''); ?></textarea></td>
                </tr>
                <tr>
                    <th scope="row">Телефон</th>
                    <td><input type="text" name="fs_site_settings[contacts][phone]" value="<?php echo esc_attr($settings['contacts']['phone'] ?? ''); ?>" class="regular-text"></td>
                </tr>
                <tr>
                    <th scope="row">Телефон (для ссылки)</th>
                    <td><input type="text" name="fs_site_settings[contacts][phone_raw]" value="<?php echo esc_attr($settings['contacts']['phone_raw'] ?? ''); ?>" class="regular-text" placeholder="+74951234567"></td>
                </tr>
                <tr>
                    <th scope="row">Email</th>
                    <td><input type="email" name="fs_site_settings[contacts][email]" value="<?php echo esc_attr($settings['contacts']['email'] ?? ''); ?>" class="regular-text"></td>
                </tr>
                <tr>
                    <th scope="row">Telegram</th>
                    <td><input type="url" name="fs_site_settings[contacts][telegram]" value="<?php echo esc_attr($settings['contacts']['telegram'] ?? ''); ?>" class="regular-text"></td>
                </tr>
                <tr>
                    <th scope="row">Адрес</th>
                    <td><input type="text" name="fs_site_settings[contacts][address]" value="<?php echo esc_attr($settings['contacts']['address'] ?? ''); ?>" class="large-text"></td>
                </tr>
                <tr>
                    <th scope="row">Режим работы</th>
                    <td><input type="text" name="fs_site_settings[contacts][hours]" value="<?php echo esc_attr($settings['contacts']['hours'] ?? ''); ?>" class="regular-text"></td>
                </tr>
                <tr>
                    <th scope="row">О студии — заголовок</th>
                    <td><input type="text" name="fs_site_settings[about][title]" value="<?php echo esc_attr($settings['about']['title'] ?? ''); ?>" class="large-text"></td>
                </tr>
                <tr>
                    <th scope="row">О студии — абзац 1</th>
                    <td><textarea name="fs_site_settings[about][paragraphs][0]" rows="3" class="large-text"><?php echo esc_textarea($settings['about']['paragraphs'][0] ?? ''); ?></textarea></td>
                </tr>
                <tr>
                    <th scope="row">О студии — абзац 2</th>
                    <td><textarea name="fs_site_settings[about][paragraphs][1]" rows="3" class="large-text"><?php echo esc_textarea($settings['about']['paragraphs'][1] ?? ''); ?></textarea></td>
                </tr>
            </table>
            <?php submit_button('Сохранить настройки'); ?>
        </form>
        <hr>
        <p><strong>REST API:</strong> <code><?php echo esc_url(rest_url('format-studio/v1/content')); ?></code></p>
    </div>
    <?php
}
