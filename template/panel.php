<?php

      // Count view
      blu_set_post_views(get_the_ID());
      // Get the page layout
      $layout_class = ' col-xs-12 col-sm-12 col-md-12 col-lg-12';
      $page_layout = !get_post_meta( get_the_ID(), 'blu_page_layout', true ) ? bl_utilities::get_option('post_page_layout', 'right_side') : get_post_meta( get_the_ID(), 'blu_page_layout', true );
      $post_look = get_post_meta( $post->ID, 'bluth_page_look', true );
      $blu_hide_page_title = get_post_meta( $post->ID, 'blu_hide_page_title', true );

      if($page_layout == 'left_side'){
         $layout_class = ' pull-right col-xs-12 col-sm-12 col-md-9 col-lg-9';
      }elseif($page_layout == 'right_side'){
         $layout_class = ' col-xs-12 col-sm-12 col-md-9 col-lg-9';
      }
      // get sidebars to use
      $blu_page_sidebar          = (!get_post_meta( $post->ID, 'blu_page_sidebar', 'page_sidebar' ) or get_post_meta( $post->ID, 'blu_page_sidebar', 'page_sidebar' ) == 'false') ? 'page_sidebar' : get_post_meta( $post->ID, 'blu_page_sidebar', 'page_sidebar' );
      $blu_page_sidebar_sticky   = (!get_post_meta( $post->ID, 'blu_page_sidebar_sticky', 'page_sidebar_sticky' ) or get_post_meta( $post->ID, 'blu_page_sidebar_sticky', 'page_sidebar_sticky' ) == 'false') ? 'page_sidebar_sticky' : get_post_meta( $post->ID, 'blu_page_sidebar_sticky', 'page_sidebar_sticky' );
      $blu_page_advanced         = (!get_post_meta( $post->ID, 'blu_page_advanced', true ) or get_post_meta( $post->ID, 'blu_page_advanced', true ) == '') ? '' : get_post_meta( $post->ID, 'blu_page_advanced', true );

      get_header(); ?>
      <style type="text/css">
      #contenido{
         background-color: #f4f4f4;
         position:relative;
 
         width:100%;
         background-image: url("../IMG/background_nyc.jpg");
         margin-bottom: 50px;
         padding-bottom: 50px;
      }
      .icon-calendar,.icon-name-buscador{
         position: absolute;
         top:35px;
         left:8px;
         height:18px;
      }
      .linea_dos_blanca{
         position: absolute;
         width: 90%;
         height:1px;
         background-color: white;
         left:10px;
         bottom: 10px;
      }
      .hora_ida p{
         position: relative;
         color:#3a4d7f;
         font-family: Arial, Helvetica, Verdana;
         font-size: 20px;
         margin-top: 0px;
         float:left;
         margin-left: 12px;

      }
      </style>
      <section id="main-content" class="container container-parent">
      <div class="mundo_cargando">
         <center>
            <h3>Buscando...</h3>
            <img src="<?php echo $plugin_url ?>IMG/mundo.gif-c200" alt="">
         </center>
      </div>
      <input type="hidden" value="<?php echo $plugin_url ?>" id="plugin_url_viajatela">
         <div id="contenido">
               <div class="franja_busqueda">
                  <div class="div_inputs_busqueda">
                     <div class="label_input">
                        <label>Origen</label><br>
                        <input type="text" id="origen" readonly value="BUE-Buenos Aires">
                     </div>
                     <div class="label_input">
                        <label>Destino</label><br>
                     
                        <input type="text" id="destino" readonly value="">
                        <input type="hidden" id="destino_code"  value="">
                     </div>
                     <div class="label_input">
                        <label>Ida</label><br>
                        <img src="<?php echo $plugin_url ?>IMG/icon_calendar copy.png" class="icon-calendar" alt="">
                        <div class="linea_input_busqueda"></div>
                        <input type="text" id="ida" class="datepicker"  value="">
                     </div>
                     <div class="label_input">
                        <label>Vuelta</label><br>
                        <img src="<?php echo $plugin_url ?>IMG/icon_calendar copy.png" class="icon-calendar" alt="">
                        <div class="linea_input_busqueda"></div>
                        <input type="text" id="vuelta"  class="datepicker" value="">
                     </div>
                     <div class="label_input">
                        <label>Pasajeros</label><br>
                        <img src="<?php echo $plugin_url ?>IMG/icon_name.png" class="icon-name-buscador" alt="">
                        <div class="linea_input_busqueda"></div>
                        <input type="number" id="pasajeros" value="1">
                     </div>
                     <div class="label_input">
                        <input type="submit" value="BUSCAR" onclick="prices()">
                     </div>
                  </div>
               </div>
               <div class="resultados_busqueda">
                  
               </div>
         </div>
         
      </section>

<?php get_footer(); ?>
