var $j = jQuery.noConflict();

$j(document).ready(function(){

	$j(".link_destino").click(function(e){
		e.preventDefault();
		var texto = $j(this).text();
		var action_form = $j("#form_viajatela_busqueda").attr('action');
		var url_viajatela = $j("#url_viajatela").val();
		$j("#busqueda_destino_viajatela").val(texto);
		$j("#form_viajatela_busqueda").attr('action',url_viajatela+"/vuelos/"+texto);

	});
	$j(".icono-lupa").click(function(){
		if (!busquedaVacia()) {
			$j("#form_viajatela_busqueda").submit();
		}else{
			console.log("No se eligió destino");
		}
	});
	$j("#busqueda_destino_viajatela").keyup(function(e){
		var tecla = e.keyCode;
		console.log(busquedaVacia());
		if (tecla == 30) {
			if (!busquedaVacia()) {
				$j("#form_viajatela_busqueda").submit();
			}else{
				e.preventDefault();
				console.log("No se eligió destino");
				return false;
			}
		}else{
			var texto = $j(this).val();
			var action_form = $j("#form_viajatela_busqueda").attr('action');
			var url_viajatela = $j("#url_viajatela").val();
			$j("#busqueda_destino_viajatela").val(texto);
			$j("#form_viajatela_busqueda").attr('action',url_viajatela+"/vuelos/"+texto);			
		}
	});
	function busquedaVacia(){
		//alert($j("#busqueda_destino_viajatela").val());
		if($j("#busqueda_destino_viajatela").val()){
			return false;
		}else{
			return true;
		}
	}
});