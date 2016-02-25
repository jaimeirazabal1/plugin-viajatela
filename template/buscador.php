

<div class='container_wrap' id='main'>
	<div id="contenido">
		
		<div class="div_caja_busqueda">
				<div class="capa_borde_negro">
			
				</div>
			<div class="caja_busqueda">
			<form action="<?php echo get_site_url() ?>/vuelos/" method="post" id="form_viajatela_busqueda">
				<input type="search" id="busqueda_destino_viajatela">
				<input type="hidden" id="url_viajatela" value="<?php echo get_site_url() ?>">
				<img src="<?php echo $plugin_url ?>IMG/icon_plain.png" class="icono-avion" alt="">
				<span class="linea_buscador_azul"></span>
				<img src="<?php echo $plugin_url ?>IMG/icon_lupa.png" class="icono-lupa" alt="">
				
			</form>
			</div>
			<p class="texto_caja_busqueda">
				<img src="<?php echo $plugin_url ?>IMG/icon_location.png" class="icono-location" alt="">
				<!--Acapulco, Aruba, Barcelona, Bogota, <b>Boston</b>, Cancún, Cartagena, Chicago, Cusco, Florianopolis, Fortaleza, Fort Lauderdale, Frankfurt, Hawai, <b>Hong Kong</b>, Houston, La Habana, <b>Lima</b>, Lisboa, Las Vegas, Londres, Los Angeles, Maceio, Madrid, <b>Malaga</b>, Medellin, México, <b>Miami</b>, Milan, Natal, <b>New York</b>, Orlando, Panama, París, Playa del Carmen, Punta Cana, Rio de Janeiro, Roma, Salvador de Bahía, San Diego, San Francisco, Santiago de Chile, <b>Sao Paulo</b>, Tokio, Toronto, Vancouver-->
				<?php echo imprimirPaisesLink() ?>
			</p>
		</div>
		<div class="capa_de_datos_usuario">
			<div class="mensaje_promocion">
				<div class="div_texto_linea">				
					<p>Te mandamos las mejores promociones que encontramos</p>
					<div class="linea"></div>
				</div>
				<div class="div_inputs">
					<div class="div_inputs_usuario">
						<img src="<?php echo $plugin_url ?>IMG/icon_name.png" class="icono-name" alt="">
						<input type="text" class="input_nombre inputs_datos_usuario">
					</div>
					<div class="div_inputs_email">
						<img src="<?php echo $plugin_url ?>IMG/icon_mail.png" class="icono-mail" alt="">
						<input type="text" class="input_email inputs_datos_email">
					</div>
					<div class="div_btn_ahorra_ya">
						<input type="submit" onclick='javascript:location.href="busqueda.html"' value="¡Ahorrá ya!">
					</div>
					<div class="borde_abajo"></div>
				</div>
				
			</div>

		</div>

	</div>
</div>
