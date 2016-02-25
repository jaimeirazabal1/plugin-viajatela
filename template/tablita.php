<input type="hidden" id="input_destino" value="<?php echo isset($_POST['destino']) ? $_POST['destino'] : null; ?>">
<div class="combos">
	

	<div class="cargando" style="display:none">
		<center>
			<img src="<?php echo $_POST['plugin_url'] ?>IMG/iconoCargando.gif" alt="no image">
		</center>
	</div>
	<div class="combo1">
		<select name="" id="ciudades">
			<option value="BUE">Bue - Buenos Aires</option>
			
		</select>
	</div>
	<div class="combo2">
		<select name="" id="destinos">
		
		</select>
	</div>
</div>
<table width="100%" id="datos_vuelos">
	<thead>
		<th>Vas</th>
		<th>Volves</th>
		<th>Precio</th>
		<th>Escalas</th>
		<th>Aerolinea</th>
	</thead>

</table>