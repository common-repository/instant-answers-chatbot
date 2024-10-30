<?php 

// Disallow Direct File Access
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly      

/*
Plugin Name:  Instant Answers Chatbot
Plugin URI:   https://instantanswers.xyz/
Description:  Allows to add a chatbot created in Instant Answers into the WordPress site. 
Version:      1.0
Author:       Instant Corp 
License:      GPL2
*/

add_action('admin_menu', 'instant_answers_add_options_page');
add_action('admin_init', 'instant_answers_register_options');
add_action('wp_footer', 'instant_answers_chat_footer');
add_action('wp_enqueue_scripts', 'instant_answers_enqueue_script');

function instant_answers_add_options_page() {

    add_options_page(
        'Instant Answers Plugin Settings', 
        'Instant Answers Options', 
        'administrator', 
        'instant_answers_settings', 
        'instant_answers_display_options_page'
    );
}

function instant_answers_register_options() {
    register_setting( 'instant_answers_settings', 'instant_answers_chatbot_id' );
}

function instant_answers_display_options_page() {
?>
<div class="wrap">
    <h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
    <form method="post" action="options.php">
        <?php settings_fields( 'instant_answers_settings' ); ?>
        <?php do_settings_sections( 'instant_answers_settings' ); ?>
        <table class="form-table">
            <tr valign="top">
            <th scope="row">Instant Answers ID</th>
            <td><input type="text" name="instant_answers_chatbot_id" value="<?php echo esc_attr( get_option('instant_answers_chatbot_id') ); ?>" /></td>
            </tr>
        </table>
        <?php submit_button(); ?>
    </form>
</div>
<?php
}

function instant_answers_enqueue_script() {
    // Using the plugin's version as script version
    wp_enqueue_script('instant_answers_script', plugins_url('instant-answers-chat.js', __FILE__), [], '1.0', true);
    wp_localize_script('instant_answers_script', 'instantAnswersParams', array('chatbotId' => get_option('instant_answers_chatbot_id')));
}

function instant_answers_chat_footer() {
    if (get_option('instant_answers_chatbot_id')) {
        wp_print_scripts('instant_answers_script');
    }
}
?>
