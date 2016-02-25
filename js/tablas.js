var $j = jQuery.noConflict();
$j(document).ready(function(){
	var ajaxRq = $j.ajax({
	    type: "POST", 
	    dataType: "json",
	    url: "http://api.viajatela.com/exec/citiesbycountry",
	    data: {
	    "language": "CAS", /* El lenguaje es un código válido devuelto por http://api.viajatela.com/exec/languages */
	    "country": "AR" /* Código de país válido devuelto por http://api.viajatela.com/exec/countriesbylanguage */
	    }, /* La data es un objeto de tipo json*/
	    success: function (datajson) {
	    	// console.log(datajson)
	    	$j("#ciudades").html("");
	    	for (var i = 0; i < datajson.length; i++) {
	    		if (datajson[i].code == "BUE") {
	    			$j("#ciudades").append("<option  value='"+datajson[i].code+"' selected='selected'>"+datajson[i].code+" - "+datajson[i].description+"</option");

	    		}else{

	    			$j("#ciudades").append("<option value='"+datajson[i].code+"'>"+datajson[i].code+" - "+datajson[i].description+"</option");
	    		}
	    		
	    	};
	    }
	    //datajson /* El retorno es un objeto de tipo json */
	});
	function cargar_datos(){
		var select_c_p="";
		if ($j("#input_destino").val()) {
			$j(".cargando").css("display","block");
			var ajaxRq = $j.ajax({
			    type: "POST", 
			    dataType: "json",
			    // async:false,
			    url: "http://api.viajatela.com/exec/citiesbylanguage",
			    data: {
			    "language": "CAS", /* El lenguaje es un código válido devuelto por http://api.viajatela.com/exec/languages */
			    "search":$j("#input_destino").val(),
			    }, /* La data es un objeto de tipo json*/
			    success: function (destinos) {
					$j(".cargando").css("display","none");

			    	if (destinos.length) {
			    		console.log("Cargando destinos validos que coinciden");
			    		var options = "";
			    		console.log('listo:',$j("#destinos").attr("listo"))
			    		if (!$j("#destinos").attr("listo")) {

			    			$j("#destinos").html("");
				    		for (var i = 0; i < destinos.length; i++) {
				    			// console.log(destinos[i].description)
				    			options+= "<option value='"+destinos[i].code+"'>"+destinos[i].description+"</option>";
				    			$j("#destinos").append(options)
				    		}
				    		$j("#destinos").attr("listo",true);
			    		}
			    		if ($j("#ciudades").val() && $j("#destinos").val()) {
			    			var hoy = new Date();
								hoy=hoy.yyyymmdd();
							var tomorrow =	mostrarFecha(new Date(),+3)
							var aftertomorrow =	mostrarFecha(new Date(),+4)
							// console.log(tomorrow,aftertomorrow);
			    			$j(".cargando").css("display","block");	
				    		var ajaxRq = $j.ajax({
							    type: "POST", 
							    dataType: "json",
							    url: "http://api.viajatela.com/exec/prices",
							    data: {
							        "cache": 1, /* 1 Graba en la base - 0 NO graba en la base*/
							        "ways": 2, /* 1 - Ida - 2 ida y vuelta*/
							        "from": $j("#ciudades").val(), /* Código iata devuelto por http://api.viajatela.com/exec/citiesbylanguage */
							        "to": $j("#destinos").val(),/* Código iata devuelto por http://api.viajatela.com/exec/citiesbylanguage */
							        "departureDate": tomorrow, /* Fecha de partida*/
							        "returningDate": aftertomorrow, /* Fecha de retorno (Si ways=1, se ignora)*/
							        "adults": 1, /* Cantidad de adultos (Debe ser al menos 1)*/
							        "children": 0, /* Cantidad de niños (menores de 12 años)*/
							        "infants": 0, /* Cantidad de bebés (hasta 36 meses)*/
							        "cabinClass": "economy" /* Uno de los valores de esta lista: economy / business / first */
							    }, /* La data es un objeto de tipo json*/
							    success: function (r) {
							    		data = new Array();
								   			conditions_ida_comienzo={
												scale:"",
												type:'departure'
											}
							    	$j.each(r,function(_indx, obj){
							    		//console.log("Todo bien por aqui")
							    		//console.log(_indx, obj);
							    				   		// console.log("index:",typeof _indx)
								   		_indx=parseInt(_indx);
								   		if (conditions_ida_comienzo.scale == obj.scale && conditions_ida_comienzo.type == obj.type && data.length == 0) {
								   			comienzo=1;
								   			/*el primer registro de vuelo de ida*/
								   			data.push(obj);
								   		}
								   		if (typeof r[_indx+1] != "undefined" && r[_indx+1].scale == "" && data.length == 1) {
								   			data.push(obj);
								   			//comienzo=0;
								   		}
								   		if (r[_indx].scale == "" && r[_indx].type == "returning" && data.length == 2 && typeof r[_indx-1] != "undefined" && r[_indx-1].type=="departure") {
								   			data.push(obj);
								   		}
								   		/*es el ultimo objeto*/
										if (typeof r[_indx+1] == "undefined" &&  r[_indx].type=='returning' && data.length == 3) {
											data.push(obj);
										}
										if (typeof r[_indx-1] != "undefined" && r[_indx-1].type=="returning" && r[_indx].type=='returning' && data.length == 3 && r[_indx].scale != "") {
											data.push(obj);
										}
								   		if (data.length == 4) {
								   			// console.log(data);
								   			// console.log("si sirve data = 4")
								   			//tabla(data);
								   			escalas_ida=0;
								   			escalas_vuelta=0
								   			aerolinea_ida=[];
								   			aerolinea_vuelta=[];
								   			for (var i = 0; i < data.length; i++) {
												if (data[i].type == "departure") {
													escalas_ida++;
													if (aerolinea_ida.indexOf(data[i].airline) == '-1') {
														
														aerolinea_ida.push(data[i].airline);
													}
												}
												if (data[i].type == "returning") {
													escalas_vuelta++;
													if (aerolinea_vuelta.indexOf(data[i].airline) == '-1') {
														
														aerolinea_vuelta.push(data[i].airline);
													}
												}
											}
								   			comienzo=0;
								   			codigo_partida=data[0].tripProductId;
											codigo_arrivo=data[data.length-1].tripProductId;
								   			link=data[0].deeplink.replace('DEPARTURE',codigo_partida);
											link=link.replace('RETURNING',codigo_arrivo);
								   			html = '';
											html += "<tr class='fila_tabla' onclick=\"window.open('"+link+"','_blank');\">";
											html += '<td>'+data[0].departureDateTime+"</td>";
											html += '<td>'+data[3].arrivalDateTime+"</td>";
											html += '<td>$'+data[0].totalPrice+"</td>";
											html += '<td>'+escalas_ida+"</td>";
											html += '<td>'+aerolinea_ida.join(',')+"</td>";
											html += '<tr>';
											// console.log(html)
											$j("#datos_vuelos").append(html);
								   			data = new Array();
											html = '';
								   			//$(".resultados_busqueda").append(html);
								   		}
							    	});
							    	$j(".cargando").css("display","none");	
									
								}
							});
			    		}else{
			    			console.log("El origen y destino deben ser validos");
			    		}
			    	}else{
			    		console.log("No se Encontraron coincidencias para los destinos..");
			    	}
			    
					
			    	
				}
			});
			
		}
	}


	cargar_datos();
	$j("#ciudades, #destinos").change(function(){
		cargar_datos();
	})
})

 Date.prototype.yyyymmdd = function() {
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
   var dd  = this.getDate().toString();
   return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // padding
  };

function mostrarFecha(date,days){

    milisegundos=parseInt(35*24*60*60*1000);

 

    fecha=date;

    day=fecha.getDate();

    // el mes es devuelto entre 0 y 11

    month=fecha.getMonth()+1;

    year=fecha.getFullYear();

 


 

    //Obtenemos los milisegundos desde media noche del 1/1/1970

    tiempo=fecha.getTime();

    //Calculamos los milisegundos sobre la fecha que hay que sumar o restar...

    milisegundos=parseInt(days*24*60*60*1000);

    //Modificamos la fecha actual

    total=fecha.setTime(tiempo+milisegundos);
  
     day=fecha.getDate();

     month=fecha.getMonth()+1;

     year=fecha.getFullYear();

 

     return year+"-"+month+"-"+day;

}