//Se crea la tabla con for
var asientos = new Array(32);//son los numeros de asientos
var filas = new Array(4);//el numero de filas
for(var j = 0; j<filas.length;j++){
  filas[j]='<tr>';//se crea filas de la tabla
  var espacios = '<tr>';
  for (var i = j+1; i <= asientos.length; i+=filas.length) {
    filas[j] += '<td class="desocupado">' + i + '</td>';//se crea las celdas con una clase y un id
    espacios+='<td> </td>';//fila en blanco
  }
}
var tab = new Array(5);
tab[0]=filas[0];
tab[1]=filas[1];
tab[2]=espacios;
tab[3]=filas[2];
tab[4]=filas[3];
document.getElementById('asientos').innerHTML =  '<table>'+ tab.reverse().join('</tr>')+'</table>';//se imprime la tabla en html

//Para cada celda se le da el evento click
var celdas = document.getElementsByClassName('desocupado');
for (var i = 0; i < celdas.length; i++) {
    celdas[i].addEventListener('click',redirect);
}

var numero;//variable global que agarrará el valor del numero de asiento
var celdita;//variable global que agarrará la celda seleccionada
function redirect(event){
  limpiar();
  celdita=event.target;
  numero = event.target.textContent;//se extrae el valor de cada celda
  document.getElementById('Asiento').innerHTML = "Asiento N°"+numero;
  var estadoCelda=celdita.className;

  if(estadoCelda=='desocupado'){//si el asiento esta desocupada se mostrará en pantalla el formulario y el boton Reservar
    var _nombre='<p>Nombre: <input type="text" id="nombre" placeholder="Nombres" required/></p>';
    var _apellido = '<p>Apellidos: <input type="text" id="apellido" placeholder="Apellidos" required></p>';
    var _dni= '<p>DNI: <input type="number" id="dni" placeholder="DNI" required></p>';
    var boton= '<p><button onclick="Reservar()">Reservar</button></p>'
    document.getElementById('Contenido').innerHTML= '<form id="Reservar">' + _nombre+_apellido+_dni+boton+'</form>';
  } else { // si esta ocupada se mostrara los datos que contiene ese asiento y el boton cancelar
    var Name = "<strong>Nombres: </strong>" + asientos[numero-1].nombre + "<br>";
    var Surname = "<strong>Apellidos: </strong>" + asientos[numero-1].apellido + "<br>";
     var Id = "<strong>DNI: </strong>" + asientos[numero-1].dni + "<br>";
    var _button = '<p><button onclick="Liberar()">Cancelar</button></p>'
    document.getElementById('Contenido').innerHTML='<div class="lista">'+Name + Surname + Id +_button+ '</div>';
  }

}

function Reservar() {//funcion reservar que los datos ingresados se almacenaran en el array global
  var name =  document.getElementById('nombre').value;
  var surname  = document.getElementById('apellido').value;
  var id = document.getElementById('dni').value;
    asientos[numero - 1] = {//se almacena como un array
      nombre: name,
      apellido:surname,
      dni: id
    };
    celdita.className="ocupado";
    //document.getElementById(numero).className = "ocupado";
  limpiar();
}

function limpiar() { //funcion para que borre el contenido
  document.getElementById('Contenido').innerHTML = '';
  document.getElementById('Asiento').innerHTML='Dale click al asiento';
  document.getElementById('mostrar').innerHTML='';
}

function Busqueda() {
    limpiar();
    var _dni= 'Introduzca DNI:<input type="text" id="busqueda"/>';
    var _boton ='<button onclick="Buscar()">Buscar</button>';
    document.getElementById('Contenido').innerHTML = _dni + _boton
}
function Liberar() {
  asientos[numero - 1] = undefined;
  celdita.className = "desocupado";
  limpiar();
}

function Buscar() {
  var busqueda = document.getElementById('busqueda').value;
  for(var i= 1; i <= asientos.length; i++){
    if(asientos[i-1]!=undefined && busqueda == asientos[i-1].dni){
      var chair = "<strong>Asiento"+numero+"</strong><br>";
      var Name = "<strong>Nombres: </strong>" + asientos[i-1].nombre + "<br>";
      var Surname = "<strong>Apellidos: </strong>" + asientos[i-1].apellido + "<br>";
      var Id = "<strong>DNI: </strong>" + asientos[i-1].dni + "<br>";
      document.getElementById('mostrar').innerHTML='<div class="lista">'+chair +Name + Surname + Id + '</div>';;
    }
  }
}

function Listar() {
  limpiar();
  var lista = '';
  for (var i = 1; i <= asientos.length; i++) {
    if (asientos[i-1]!= undefined) {
      var chair = "<strong>Asiento: </strong>"+i+"<br>";
      var Name = "<strong>Nombres: </strong>" + asientos[i-1].nombre + "<br>";
      var Surname = "<strong>Apellidos: </strong>" + asientos[i-1].apellido + "<br>";
      var Id = "<strong>DNI: </strong>" + asientos[i-1].dni + "<br>";
      lista += '<div class="lista">'+chair+Name + Surname + Id + '</div>';
    }
  }
  document.getElementById('mostrar').innerHTML=lista;
}
