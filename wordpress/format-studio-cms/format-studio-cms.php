<?php
/**
 * Plugin Name: Format Studio CMS
 * Description: Headless CMS для сайта «Студия Формат» — услуги, проекты и настройки через REST API.
 * Version: 1.0.0
 * Author: Format Studio
 * Text Domain: format-studio-cms
 */

if (!defined('ABSPATH')) {
    exit;
}

define('FS_CMS_VERSION', '1.0.0');
define('FS_CMS_PATH', plugin_dir_path(__FILE__));
define('FS_CMS_URL', plugin_dir_url(__FILE__));

require_once FS_CMS_PATH . 'includes/post-types.php';
require_once FS_CMS_PATH . 'includes/meta-boxes.php';
require_once FS_CMS_PATH . 'includes/settings-page.php';
require_once FS_CMS_PATH . 'includes/rest-api.php';
require_once FS_CMS_PATH . 'includes/cors.php';

register_activation_hook(__FILE__, 'fs_cms_activate');

function fs_cms_activate() {
    fs_cms_register_post_types();
    flush_rewrite_rules();

    if (!get_option('fs_site_settings')) {
        update_option('fs_site_settings', fs_cms_default_settings());
    }
}

add_action('init', 'fs_cms_register_post_types');

function fs_cms_default_settings() {
    return array(
        'hero' => array(
            'badge' => 'Ремонт с 2012 года',
            'title' => 'Ремонт квартир',
            'title_accent' => 'под ключ',
            'text' => 'Дизайн, черновая и чистовая отделка, сантехника и электрика. Создаём уютные интерьеры с фиксированной сметой и сроками.',
            'cta_primary' => 'Бесплатный замер',
            'cta_secondary' => 'Наши работы',
            'stats' => array(
                array('value' => '320+', 'label' => 'квартир отремонтировано'),
                array('value' => '12', 'label' => 'лет опыта'),
                array('value' => '3 года', 'label' => 'гарантия на работы'),
            ),
        ),
        'about' => array(
            'label' => 'О студии',
            'title' => 'Создаём интерьеры, в которых хочется жить',
            'paragraphs' => array(
                '«Студия Формат» — команда дизайнеров, прорабов и мастеров отделки. Делаем ремонт квартир и домов в новостройках и вторичном жилье — от косметического обновления до полной перепланировки.',
                'Работаем по договору, ведём фотоотчёты и сдаём объект точно в срок. Все материалы закупаем сами — вы получаете готовый результат без хлопот.',
            ),
            'experience_value' => '320+',
            'experience_label' => 'объектов',
            'image_url' => 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
            'features' => array(
                array('icon' => '🎨', 'title' => 'Дизайн-проект', 'text' => '3D-визуализация и подбор материалов до начала работ.'),
                array('icon' => '📋', 'title' => 'Фиксированная смета', 'text' => 'Стоимость прописывается в договоре и не меняется в процессе.'),
                array('icon' => '🧹', 'title' => 'Чистота на объекте', 'text' => 'Ежедневная уборка, вывоз мусора и защита мебели и полов.'),
                array('icon' => '🛡️', 'title' => 'Гарантия 3 года', 'text' => 'На все виды отделочных и инженерных работ.'),
            ),
        ),
        'sections' => array(
            'services' => array(
                'label' => 'Услуги',
                'title' => 'Чем мы занимаемся',
                'subtitle' => 'Ремонт любой сложности — от одной комнаты до всей квартиры',
            ),
            'projects' => array(
                'label' => 'Портфолио',
                'title' => 'Наши работы',
                'subtitle' => 'Реальные объекты, которые мы сдали заказчикам',
            ),
        ),
        'contacts' => array(
            'phone' => '+7 (495) 123-45-67',
            'phone_raw' => '+74951234567',
            'email' => 'hello@format-studio.ru',
            'address' => 'г. Москва, ул. Мастеров, 8, офис 12',
            'hours' => 'Пн–Сб: 10:00–20:00',
            'telegram' => 'https://t.me/format_studio',
        ),
    );
}
