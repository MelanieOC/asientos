var N = 10; // Número de asientos
var asientos = new Array(N);
mostrar(asientos);
function mostrar(asientos){
   var str = new Array(2);
   for(var j = 0; j<str.length;j++){
     str[j]='';
     for (var i = j+1; i <= asientos.length; i+=str.length) {
        if (asientos[i-1] == undefined)
           str[j] += i + "[ " + "] ";
        else
           str[j] += i + "[X] ";
     }
   }

   document.getElementById('asientos').innerHTML =  str.join('<br>');
}
function Reservar() {
  var numero = parseInt( prompt("Seleccione numero de asiento: "));
  if (numero > 0 && numero <= N) {
     var name =  prompt( "Nombre del pasajero" )  ;
     var id = parseInt( prompt( "DNI del pasajero"  ) );
     asientos[numero - 1] = {
        nombre : name,
        dni: id
     };
  }
  console.log(asientos);
  mostrar(asientos);
}

function Buscar() {
  var busqueda = prompt('DNI a buscar: ');
  for(var i= 1; i <= asientos.length; i++){
    if(asientos[i-1]!=undefined)
      if(busqueda == asientos[i-1].dni)
        alert('Numero de asiento ' + i);
  }
}

function Liberar() {
  var nro = parseInt( prompt("Seleccione asiento: "));
  if (nro >0 && nro <= N) {
     asientos[nro - 1] = undefined;
  }
  mostrar(asientos);
}





//reserva();
