var asientos = new Array(32);
var filas = new Array(4);
for(var j = 0; j<filas.length;j++){
  filas[j]='<tr>';
  for (var i = j+1; i <= asientos.length; i+=filas.length) {
    filas[j] += '<td class="number" id="'+i+'">' + i + '</td>';
  }
}

document.getElementById('asientos').innerHTML =  '<table>'+ filas.reverse().join('</tr>')+'</table>';

var celdas = document.getElementsByClassName('number');
for (var i = 0; i < celdas.length; i++) {
    celdas[i].addEventListener('click',redirect);
}
var numero;
function redirect(event){
  limpiar();
  numero = event.target.textContent;
}

function Reservar() {
  var name =  document.getElementById('nombre').value;
  var surname  = document.getElementById('apellido').value;
  var id = document.getElementById('dni').value;
  asientos[numero - 1] = {
    nombre : name,
    apellido :surname,
    dni: id
  };
  console.log(asientos);
  document.getElementById(numero).className = "number2";
  limpiar();
}

function limpiar() {
  document.getElementById('nombre').value = '';
  document.getElementById('apellido').value='';
  document.getElementById('dni').value = '';
  document.getElementById('Asiento').innerHTML='';
  document.getElementById('busqueda').value = '';
}

function Liberar() {
  var nro = document.getElementById('numeroAsiento').innerHTML;
  asientos[nro - 1] = undefined;
  document.getElementById(nro).className = "number";
}

function Buscar() {
  var busqueda = document.getElementById('busqueda').value;
  for(var i= 1; i <= asientos.length; i++){
    if(asientos[i-1]!=undefined && busqueda == asientos[i-1].dni){
      document.getElementById('Asiento').innerHTML='Asiento N°' + i;
      document.getElementById('nombre').value = asientos[i-1].nombre;
      document.getElementById('apellido').value= asientos[i-1].apellido;
      document.getElementById('dni').value = asientos[i-1].dni;
    }
  }
}

function Listar() {
  var lista = '';
  for (var i = 1; i <= asientos.length; i++) {
    if (asientos[i]!=undefined) {
      var chair = "<strong>Asiento: </strong>"+i+"<br>";
      var Name = "<strong>Nombres: </strong>" + asientos[i-1].nombre + "<br>";
      var Surname = "<strong>Apellidos: </strong>" + asientos[i-1].apellido + "<br>";
      var Id = "<strong>DNI: </strong>" + asientos[i-1].dni + "<br>";
      lista += '<div class="lista">'+chair+Name + Surname + Id + '</div>';
    }
  }
  document.getElementById('mostrar').innerHTML=lista;
}



//reserva();
