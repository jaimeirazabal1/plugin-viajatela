var $ = jQuery.noConflict();

$(document).ready(function(){		
	citiesbylanguage(1);
	 $.datepicker.regional['es'] = {
	 closeText: 'Cerrar',
	 prevText: '<Ant',
	 nextText: 'Sig>',
	 currentText: 'Hoy',
	 monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
	 monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
	 dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
	 dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
	 dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
	 weekHeader: 'Sm',
	 dateFormat: 'dd/mm/yy',
	 firstDay: 1,
	 isRTL: false,
	 showMonthAfterYear: false,
	 yearSuffix: ''
	 };
	 $.datepicker.setDefaults($.datepicker.regional['es']);
	$( ".datepicker" ).datepicker({
      changeMonth: true,
      changeYear: true,
      dateFormat:"yy-mm-dd"
    });
    citiesbylanguage();

});
function countriesbylanguage(){
	cargando(1)
	var ajaxRq = $.ajax({
	    type: "POST", 
	    dataType: "json",
	    url: "http://api.viajatela.com/exec/countriesbylanguage",
	  
	    data: {
	    "language": "CAS" /* El lenguaje es un código válido devuelto por http://api.viajatela.com/exec/languages */
	    }, /* La data es un objeto de tipo json*/
	    async:false,
	    success: function (datajson) {
	    //datajson /* El retorno es un objeto de tipo json */
			cargando(0)

	    	console.log(datajson)
		}
	});	
}
function citiesbycountry(c){
	cargando(1)
	var ajaxRq = $.ajax({
	    type: "POST", 
	    dataType: "json",
	    url: "http://api.viajatela.com/exec/citiesbycountry",
	    data: {
	    "language": "CAS", /* El lenguaje es un código válido devuelto por http://api.viajatela.com/exec/languages */
	    "country": c 
	    /* Código de país válido devuelto por http://api.viajatela.com/exec/countriesbylanguage */
	    }, /* La data es un objeto de tipo json*/
	    success: function (datajson) {
	    	cargando(0)
		    //datajson /* El retorno es un objeto de tipo json */
		}
	});
}
function citiesbylanguage(p){
	var sitio = getSitio();
	cargando(1);
	var ajaxRq = $.ajax({
	    type: "POST", 
	    dataType: "json",
	    url: "http://api.viajatela.com/exec/citiesbylanguage",
	    async:false,
	    data: {
	    "language": "CAS", /* El lenguaje es un código válido devuelto por http://api.viajatela.com/exec/languages */
	    "search": sitio /* Texto parcial para utilizar como condición de búsqueda. Si es cadena vacía, retorna todo. */
	    }, /* La data es un objeto de tipo json*/
	    success: function (datajson) {
		    //datajson /* El retorno es un objeto de tipo json */
		    cargando(0)
		    if (p) {
		    	if (datajson) {
		    		$("#destino").val(datajson[0].searchable)
		    	}
		    }else{

			    console.log("citiesbylanguage:",datajson)
			    if (datajson) {
			    	for (var i = 0; i < datajson.length; i++) {
			    		if (i==0) {
			    			$("#destino_code").val(datajson[i].code);
				    		prices(datajson[i].code)
			    		}
			    	}
			    }
		    }
		}
	});
}
function terminalsbycity(country){
	var data;
	var ajaxRq = $.ajax({
	    type: "POST", 
	    dataType: "json",
	    url: "http://api.viajatela.com/exec/terminalsbycity",
	    async:false,
	    data: {
	    "language": "CAS", /* El lenguaje es un código válido devuelto por http://api.viajatela.com/exec/languages */
	    "country": "ES" /* Código de país válido devuelto por http://api.viajatela.com/exec/countriesbylanguage */
	    }, /* La data es un objeto de tipo json*/
	    success: function (datajson) {
		    //datajson /* El retorno es un objeto de tipo json */
		    data=datajson;
			
		}
	});
	return data;
}
function cargando(b){
	if (b) {
		$(".mundo_cargando").css("display","block");
	}else{
		$(".mundo_cargando").css("display","none");
	}
}
function getSitio(){
	if (sitio) {
		var sitio = location.href.split("/")[location.href.split("/").length-1];
	}else{
		var sitio = location.href.split("/")[location.href.split("/").length-2];
	}
	sitio = sitio.toLowerCase().replace(/%20/g," ");
	//console.log("Sitio:"+sitio)
	return sitio;
}
function formatDate(d){
	date = d.split(".");
	return date[2]+"."+date[1]+"."+date[0];
}
function getHourByDate(fecha){
	hora=fecha.split(" ")[1].split(":");
	return hora[0]+":"+hora[1];
}
function getNombreDia(fecha){
	console.log("Adentro de la funcion del nombre del dia -> ",fecha)
	var d = new Date(fecha);
	console.log("fecha pasada por date -> ",d)
	var weekday = new Array(7);
	weekday[0]=  "DOM";
	weekday[1] = "LUN";
	weekday[2] = "MAR";
	weekday[3] = "MIE";
	weekday[4] = "JUE";
	weekday[5] = "VIE";
	weekday[6] = "SAB";
	console.log("repuesta de get day ->",d.getDay());
	var n = weekday[d.getDay()];
	console.log("valor del dia -> ",n);
	return n;
}
function difHoras(d1,d2){
	var a = new Date(d1);
	var b = new Date(d2);
	//La diferencia se da en milisegundos así que debes dividir entre 1000
	var c = ((a-b)/1000);
	//console.log( c ) // resultado 5;	
	console.log("milisegundos -> ",c);
	return formatSegundos(c);
}
function formatSegundos(time){
	var minutes = Math.floor( time / 60 );
	var seconds = time % 60;
	 
	//Anteponiendo un 0 a los minutos si son menos de 10 
	minutes = minutes < 10 ? '0' + minutes : minutes;
	 
	//Anteponiendo un 0 a los segundos si son menos de 10 
	seconds = seconds < 10 ? '0' + seconds : seconds;
	 
	var result = minutes + ":" + seconds;  // 161:30

	var hours = Math.floor( time / 3600 );  
	var minutes = Math.floor( (time % 3600) / 60 );
	var seconds = time % 60;
	 
	//Anteponiendo un 0 a los minutos si son menos de 10 
	minutes = minutes < 10 ? '0' + minutes : minutes;
	 
	//Anteponiendo un 0 a los segundos si son menos de 10 
	seconds = seconds < 10 ? '0' + seconds : seconds;
	 
	var result = hours + " hs " + minutes + " min" ;  // 2:41:30
	console.log("resultado de formatSegundos -> ",result);
	return result;
}
function getScala(s){
	if (s) {
		return "Con Escala";
	}else{
		return "Directo";
	}
}
function prices(to){
	//alert(to)
	//return;
	var tomorrow =	mostrarFecha(new Date(),+3)
	var aftertomorrow =	mostrarFecha(new Date(),+13)
	cargando(1)
	var ajaxRq = $.ajax({
	    type: "POST", 
	    dataType: "json",
	    url: "http://api.viajatela.com/exec/prices",
		//async:false,
	    data: {
	        "cache": 1, /* 1 Graba en la base - 0 NO graba en la base*/
	        "ways": 2, /* 1 - Ida - 2 ida y vuelta*/
	        "from": "BUE", /* Código iata devuelto por http://api.viajatela.com/exec/citiesbylanguage */
	        "to": to ? to : $j("#destino_code").val(),/* Código iata devuelto por http://api.viajatela.com/exec/citiesbylanguage */
	        "departureDate": $j("#ida").val() ? $j("#ida").val() : tomorrow, /* Fecha de partida*/
	        "returningDate": $j("#vuelta").val() ? $j("#vuelta").val() : aftertomorrow, /* Fecha de retorno (Si ways=1, se ignora)*/
	        "adults": $j("#pasajeros").val() ? $j("#pasajeros").val() : 1, /* Cantidad de adultos (Debe ser al menos 1)*/
	        "children": 0, /* Cantidad de niños (menores de 12 años)*/
	        "infants": 0, /* Cantidad de bebés (hasta 36 meses)*/
	        "cabinClass": "economy" /* Uno de los valores de esta lista: economy / business / first */
	    }, /* La data es un objeto de tipo json*/
	    complete: function (r) {

		    //datajson /* El retorno es un objeto de tipo json */
		    cargando(0)
		    contador = 0;
		    var data = new Array();
		    returning=0;
		   	r = r.responseJSON;
		   	esidayvuelta=1;
		   	//console.log(r)
		   	//console.log("Un dato:",datajson)
		   
		   	idavuelta='departure'
			conditions_ida_comienzo={
				scale:"",
				type:'departure'
			}

		   	$(".resultados_busqueda").html("");
		   	comienzo=0;
		   	$.each(r,function(_indx,obj){
		   		
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
		   			console.log(data);
		   			console.log("si sirve data = 4")
		   			tabla(data);
		   			data = new Array();
		   			comienzo=0;
		   			$(".resultados_busqueda").append(html);
		   		}
		   	});
	    	/*while(typeof r[contador] != "undefined" ){
	
	    		if (esidayvuelta) {

		    		data.push(r[contador]);
		    		/*aqui es cuando cambia a retorno*/
		    		/*if (idavuelta != r[contador].type && r[contador].type == 'returning') {

		    			idavuelta = r[contador].Type
		    			returning=1;
		    		}
		    	
		    		if (r[contador].type != 'returning') {
		    			returning=0;
		    		}
		    		/*aqui es el ultimo de vuelta, el proximo es el otro vuelo*/
		    		/*suponiendo que los vuelos sean ida y vuelta, si no, no funciona esto*/
		    		/*if (r[contador].type == 'returning' && typeof r[contador+1] != "undefined" && r[contador+1].type == 'departure') {
						data.push(r[contador]);
						console.log("datos antes de imprimir vuelo: ",data)
						html = tabla(data);
			    		data = new Array();
						
						
			    		$(".resultados_busqueda").append(html);
		    		}

	    		}else{
	    			/*TODO: hacer para los vuelos solo ida*/
	    		/*}
			    contador++;*/
	    	}
		   		
		   	
		  
		// });
	});
}
function tabla(datajson){
	idavuelta = 'departure';
	horas_vuelo_ida='';
	horas_vuelo_vuelta='';
	escalas_ida =0;
	escalas_vuelta =0;
	fecha_ida ='';
	fecha_vuelta ='';
	aerolinea_ida = []
	aerolinea_vuelta = []
	dia_ida_1 = '';
	dia_ida_2 = '';
	hora_ida_1 = '';
	hora_ida_2 = '';
	dia_vuelta_1 = '';
	dia_vuelta_2 = '';
	hora_vuelta_1 = '';
	hora_vuelta_2 = '';
	for (var i = 0; i < datajson.length; i++) {
		if (datajson[i].type == "departure") {
			escalas_ida++;
			if (aerolinea_ida.indexOf(datajson[i].airline) == '-1') {
				
				aerolinea_ida.push(datajson[i].airline);
			}
		}
		if (datajson[i].type == "returning") {
			escalas_vuelta++;
			if (aerolinea_vuelta.indexOf(datajson[i].airline) == '-1') {
				
				aerolinea_vuelta.push(datajson[i].airline);
			}
		}
		/*if (datajson[i].type != "departure") {
			escalas_vuelta++;
			if (aerolinea_vuelta != '' && aerolinea_vuelta.search(datajson[i].airline) != '-1') {

				aerolinea_vuelta += " "+datajson[i].airline+" <br>";
			}
		}*/
		if(typeof datajson[i+1] != "undefined" && datajson[i+1].type != idavuelta){

			idavuelta="returning";
			codigo_partida=datajson[0].tripProductId;
			codigo_arrivo=datajson[datajson.length-1].tripProductId;
			link=datajson[0].deeplink.replace('DEPARTURE',codigo_partida);
			link=link.replace('RETURNING',codigo_arrivo);
			fecha_ida = formatDate(datajson[0].departureDateTime.split(" ")[0].replace(/-/g,"."));

			fecha_vuelta = formatDate(datajson[i+1].arrivalDateTime.split(" ")[0].replace(/-/g,"."));

			//console.log("poniendo la fecha para capturar el dia y hora:->",datajson[0].departureDateTime)
			dia_ida_1=getNombreDia(datajson[0].departureDateTime);
			

			hora_ida_1=getHourByDate(datajson[0].departureDateTime);
			dia_ida_2=getNombreDia(datajson[i].arrivalDateTime);
			hora_ida_2=getHourByDate(datajson[i].arrivalDateTime);

			dia_vuelta_1=getNombreDia(datajson[i+1].departureDateTime);
			hora_vuelta_1=getHourByDate(datajson[i+1].departureDateTime);
			dia_vuelta_2=getNombreDia(datajson[datajson.length-1].arrivalDateTime);
			hora_vuelta_2=getHourByDate(datajson[datajson.length-1].arrivalDateTime);

			horas_vuelo_ida = difHoras(datajson[i].arrivalDateTime,datajson[0].departureDateTime);

			horas_vuelo_vuelta = difHoras(datajson[datajson.length-1].arrivalDateTime,datajson[i+1].departureDateTime);
			
	console.log("Datos: \n escalas_ida:",escalas_ida," \n aerolinea_ida:",aerolinea_ida,"\n escalas_vuelta:",escalas_vuelta,"\n aerolinea_vuelta:",aerolinea_vuelta,"\n fecha_ida:",fecha_ida,"\n fecha_vuelta:",fecha_vuelta+
				"\n dia_ida_1:",dia_ida_1,"\n hora_ida_2:",hora_ida_2,"\n dia_vuelta_1:",dia_vuelta_1,"\n hora_vuelta_1:",hora_vuelta_1,"\n dia_vuelta_2:",dia_vuelta_2,"\n hora_vuelta_2:",hora_vuelta_2,"\n horas_vuelo_ida:",horas_vuelo_ida,"\n horas_vuelo_vuelta:",horas_vuelo_vuelta);
		}
	}
	html = ''+
		    	'<div class="tabla_resultados">'+
                     '<div class="ida">'+
                        '<div class="encabezado">'+
                           '<div class="vas_volves">Vas</div>'+
                           '<div class="cajita_techo_izquierdo"></div>'+
                           '<img src="'+$("#plugin_url_viajatela").val()+'IMG/icon_plain copy.png" class="icon-plain-right" alt="">'+
                           '<p>Buenos Aires <span class="flecha_azul">></span> '+getSitio()+'</p>'+
                        '</div>'+
                        '<div class="informacion_buscada">'+
                           '<div class="aerolinea" style="font-size:10px">'+
                             '<br><center>'+
                              //'<img src="'+$("#plugin_url_viajatela").val()+'IMG/turkish.png" class="icono-aerolinea" alt="">'+
                              aerolinea_ida.join('<br>')+
                           '</center></div>'+
                           '<div class="fecha_ida">'+
                              '<img src="'+$("#plugin_url_viajatela").val()+'IMG/calendar_icon.png" class="icon-calendar-results" alt="">'+
                              '<center>'+fecha_ida+'</center>'+
                           '</div>'+
                           '<div class="hora_ida">'+
                              '<p>'+
                                 dia_ida_1 +'<br>'+
                                 '<b>'+hora_ida_1+'hs</b>'+
                              '</p>'+
                              '<p><img src="'+$("#plugin_url_viajatela").val()+'IMG/flecha_icon.png" alt=""></p>'+
                              '<p>'+
                                 dia_ida_2+'<br>'+
                                 "<b>"+hora_ida_2+'hs </b>'+
                              '</p>'+
                           '</div>'+
                           '<div class="hora_hora">'+
                              '<img src="'+$("#plugin_url_viajatela").val()+'IMG/time_icon.png" class="icon-time-results" alt="">'+
                              '<center>'+horas_vuelo_ida+'</center>'+
                           '</div>'+
                           '<div class="escala">'+
                              escalas_ida+" Escalas"+
                           '</div>'+
                        '</div>'+
                     '</div>'+
                     '<div class="clearfix"></div>'+
                     '<div class="vuelta">'+
                        '<div class="encabezado">'+
                           '<div class="vas_volves">Volves</div>'+
                           '<div class="cajita_techo_izquierda_2"></div>'+
                           '<img src="'+$("#plugin_url_viajatela").val()+'IMG/icon_plain copy.png" class="icon-plain-left" alt="">'+
                           '<p>'+getSitio()+' <span class="flecha_azul">></span> Buenos Aires</p>'+
                        '</div>'+
                        '<div class="informacion_buscada">'+
                           '<div class="aerolinea" style="font-size:10px">'+
                           '<br><center>'+
                              //'<img src="'+$("#plugin_url_viajatela").val()+'IMG/british.png" class="icono-aerolinea" alt="">'+
                              aerolinea_vuelta+
                           '</center></div>'+
                           '<div class="fecha_ida">'+
                              '<img src="'+$("#plugin_url_viajatela").val()+'IMG/calendar_icon.png" class="icon-calendar-results" alt="">'+
                              '<center>'+fecha_vuelta+'</center>'+
                           '</div>'+
                           '<div class="hora_ida">'+
                              '<p>'+
                                 dia_vuelta_1+'<br>'+
                                 '<b>'+hora_vuelta_1+'hs</b>'+
                              '</p>'+
                              '<p><img src="'+$("#plugin_url_viajatela").val()+'IMG/flecha_icon.png" alt=""></p>'+
                              '<p>'+
                                dia_vuelta_2+'<br>'+
                                ' <b>'+hora_vuelta_2+'hs</b>'+
                              '</p>'+
                           '</div>'+
                           '<div class="hora_hora">'+
                              '<img src="'+$("#plugin_url_viajatela").val()+'IMG/time_icon.png" class="icon-time-results" alt="">'+
                              '<center>'+horas_vuelo_vuelta+'</center>'+
                           '</div>'+
                           '<div class="escala">'+
                              escalas_vuelta+" Escalas"+
                           '</div>'+
                        '</div>'+
                        
                     '</div>'+
                     '<div class="comprar_resultado">'+
                        '<div class="cajita_techo_derecho"></div>'+
                        '<div class="linea_uno_blanca"></div>'+
                        '<img src="'+$("#plugin_url_viajatela").val()+'IMG/icon_money.png" class="icon-money" alt="">'+
                        '<div class="precio_resultado">'+
                           '<p>'+
                              "$ "+datajson[0].totalPrice+
                           '</p>'+
                           '<div class="texto_loco_comprar"><a href="http://www.'+datajson[0].provider+'.com/">'+datajson[0].provider+'</a></div>'+
                           '<center>'+
                              '<a href="'+link+'" target="_blank" class="btn-comprar" >COMPRAR</a>'+
                           '</center>'+
                        '</div>'+
                        '<div class="linea_dos_blanca"></div>'+
                     '</div><br><br><br>'+
                  '</div>';
    return html
}
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