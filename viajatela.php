<?php
   /*
      Plugin Name: viajatela.com
      Plugin URI: jaig.net.ve
      Description: muestra información de vuelos según la api construida por viajatela.com
      Version: 1.0
      Author: Jaime A. Irazabal G.
      Author URI: jaig.net.ve
   */

   /*
      esto aparecerá directamente en el panel de 
      administración de plugins
   */ 

      /*run one time the remove the code*/
/*add_action('init',function(){
  add_rewrite_rule('^vuelos/([^/]+)/?','index.php?destino=$matches[1]','top');

  flush_rewrite_rules();

});*/
function viajatela( $atts ) {
  $url = plugins_url()."/viajatela/";
  wp_register_style( 'tablitas', $url . 'css/tablas.css', array(), '1.1', 'all' ); 
  wp_enqueue_style( 'tablitas' );
  wp_enqueue_script( 'tablas', $url . 'js/tablas.js', array ( 'jquery' ), 1.1, true);
  wp_enqueue_script( 'underscore', $url . 'js/underscore-min.js', array ( 'jquery' ), 1.1, true);
      $a = shortcode_atts( array(
        'destino' => 'something',
        'bar' => 'something else',
        'plugin_url' => plugins_url()."/viajatela/"
    ), $atts,'viajatela' );

  $postdata = http_build_query($a);

  $opts = array('http' =>
      array(
          'method'  => 'POST',
          'header'  => 'Content-type: application/x-www-form-urlencoded',
          'content' => $postdata
      )
  );

  $context  = stream_context_create($opts);

  $content = file_get_contents($url.'template/tablita.php',false, $context);
  return $content;
}
add_shortcode( 'viajatela', 'viajatela' );

add_filter('query_vars',function($query_vars){
  $query_vars[]='destino';
  return $query_vars;
});

function carga_estilos_plugin()
{
  $url = plugins_url()."/viajatela/";
    /*si no es el template de resultados de busqueda*/
  if (!isset($wp_query->query_vars['destino'])) {
    wp_register_style( 'estilos', $url . '/css/style.css', array(), '1.1', 'all' );
    wp_register_style( 'estilos-media-query', $url . '/css/media_query.css', array(), '1.1', 'all' );

    wp_register_style( 'estilos-query-ui', $url . 'vendors/jquery-ui/jquery-ui.css', array(), '1.1', 'all' ); 
    wp_enqueue_style( 'estilos-query-ui' );
    wp_enqueue_style( 'estilos' );
    wp_enqueue_style( 'estilos-media-query' );
  }else{
       
  }
}
add_action('wp_print_styles', 'carga_estilos_plugin');

function carga_scripts_plugin(){

  $url = plugins_url()."/viajatela/";
  /*  /wp-includes/js/jquery/jquery.query.js*/
  global $wp_query;
  /*si no es el template de resultados de busqueda*/
  if (!isset($wp_query->query_vars['destino'])) {

    wp_enqueue_script( 'scripts', $url . 'js/scripts.js', array ( 'jquery.min' ), 1.1, true);
  }else{
    //die($url . '/js/busqueda.js');
    wp_enqueue_script( 'busqueda', $url . 'js/busqueda.js', array ( 'jquery' ), 1.1, true);
    wp_enqueue_script( 'jquery-ui', $url . 'vendors/jquery-ui/jquery-ui.js', array ( 'jquery' ), 1.1, true);
  }
}
add_action('wp_enqueue_scripts', 'carga_scripts_plugin');

function wptuts_scripts_with_jquery()
{
    $url = plugins_url()."/viajatela/";
    // create array of all scripts
    $scripts=array('custom-script'=>'js/scripts.js');
    
    foreach($scripts as $key=>$sc)
    {
       wp_register_script( $key, $url. $sc, array('jquery') );
       wp_enqueue_script( $key );
    }
}
add_action( 'wp_enqueue_scripts', 'wptuts_scripts_with_jquery' );


/*function my_template() {
  $plugin_url = plugins_url()."/viajatela/";
  include("template/buscador.php");
  exit;
}
add_action('template_redirect', 'my_template');*/

function getPaises(){
  return array(
    'Acapulco', 'Aruba', 'Barcelona', 'Bogota', 'Boston', 'Cancún', 'Cartagena', 'Chicago', 'Cusco', 'Florianopolis', 'Fortaleza', 'Fort Lauderdale', 'Frankfurt', 'Hawai', 'Hong Kong', 'Houston', 'La Habana', 'Lima', 'Lisboa', 'Las Vegas', 'Londres', 'Los Angeles', 'Maceio', 'Madrid', 'Malaga', 'Medellin', 'México', 'Miami', 'Milan', 'Natal', 'New York', 'Orlando', 'Panama', 'París', 'Playa del Carmen', 'Punta Cana', 'Rio de Janeiro', 'Roma', 'Salvador de Bahía', 'San Diego', 'San Francisco', 'Santiago de Chile', 'Sao Paulo', 'Tokio', 'Toronto', 'Vancouver'
  );
}
function imprimirPaisesLink(){
  $links = '';
  $p=getPaises();
  for ($i=0; $i <count($p) ; $i++) {
    if ($i == count($p)-1) {
      $links.= " <a style='color:black' href='".site_url()."/vuelos/".$p[$i]."' class=''>".$p[$i]."</a>";
    }else{
      $links.= " <a style='color:black' href='".site_url()."/vuelos/".$p[$i]."' class=''>".$p[$i]."</a>,";
    }
  }
  echo $links;
}


add_action("widgets_init", array('Widget_name', 'register'));
class Widget_name {
  function control(){
    echo 'I am a control panel';
  }
  function widget($args){
    echo $args['before_widget'];
        //si quisieramos un título lo pondríamos aquí --> echo $args['before_title'] . 'El título como lo quisieras aquí' . $args['after_title'];
    $plugin_url = plugins_url()."/viajatela/";
    include("template/buscador.php");
    echo $args['after_widget'];
  }
   function register(){
    register_sidebar_widget('Viajatela.com Buscador', array('Widget_name', 'widget'));
    register_widget_control('Viajatela.com Buscador', array('Widget_name', 'control'));
  }
}

/*add_action("init",function(){
  global $wp_query;
  echo "<pre>";
  die(var_dump($wp_query));
  if (isset($wp_query->query_vars['destino'])) {
    $destino = $wp_query->query_vars['destino'];
    include("template/panel.php");
    exit();
  }
});*/

function my_template() {
  global $wp_query;
  $plugin_url = plugins_url()."/viajatela/";

  if (isset($wp_query->query_vars['destino'])) {
    $url = plugins_url()."/viajatela/";
    /*  /wp-includes/js/jquery/jquery.query.js*/
    $destino = $wp_query->query_vars['destino'];
    include("template/panel.php");
    exit;
  }


}
add_action('template_redirect', 'my_template');

