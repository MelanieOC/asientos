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

var Contenido = document.getElementById('Contenido');
var numero;//variable global que agarrará el valor del numero de asiento
var celdita;//variable global que agarrará la celda seleccionada
function redirect(event){
  limpiar();
  celdita=event.target;
  numero = event.target.textContent;//se extrae el valor de cada celda
  var estadoCelda=celdita.className;

  if(estadoCelda=='desocupado'){//si el asiento esta desocupada se mostrará en pantalla el formulario y el boton Reservar
    Contenido.innerHTML= formulario(numero);
  } else { // si esta ocupada se mostrara los datos que contiene ese asiento y el boton cancelar
    Contenido.innerHTML += mostrar(numero);
    var _button = '<p><button onclick="Liberar()" class="button2">Cancelar</button></p>'
    Contenido.innerHTML+= _button;
  }

}

function Reservar() {//funcion reservar que los datos ingresados se almacenaran en el array global
  var name =  document.getElementById('nombre').value;
  var surname  = document.getElementById('apellido').value;
  var id = document.getElementById('dni').value;
    asientos[numero - 1] = {//se almacena como un objeto dentro del array
      nombre: name,
      apellido:surname,
      dni: id
    };

  if(name!='' && surname!='' && id!=''){
    celdita.className="ocupado";
    limpiar();
  }

}

function formulario(numero) {
  var html = '';
  html+='<p>Asiento N°' + numero + '</p>';
  html+='<p>Nombre: <input type="text" id="nombre" placeholder="Nombres" required/></p>';
  html+= '<p>Apellidos: <input type="text" id="apellido" placeholder="Apellidos" required></p>';
  html+= '<p>DNI: <input type="number" id="dni" placeholder="DNI" required></p>';
  html+= '<p><input type="submit" onclick="Reservar()" value="Reservar"></p>'
  return  '<form id="Reservar"' + html + '</form>';
}

function mostrar(numero) {
  var html='';
  html += "<strong>Asiento Nº "+numero+"</strong><br>";
  html += "<strong>Nombres: </strong>" + asientos[numero-1].nombre + "<br>";
  html += "<strong>Apellidos: </strong>" + asientos[numero-1].apellido + "<br>";
  html += "<strong>DNI: </strong>" + asientos[numero-1].dni + "<br>";
  return '<div class="lista">'+html+ '</div>';
}

function limpiar() { //funcion para que borre el contenido
  Contenido.innerHTML = '';
  document.getElementById('mostrar').innerHTML='';
}

function Busqueda() {
    limpiar();
    var _dni= '<p>Introduzca DNI:<input type="text" id="busqueda"/></p>';
    var _boton ='<p><button class="button2" onclick="Buscar()">Buscar</button></p>';
    document.getElementById('Contenido').innerHTML = _dni + _boton
}

function Liberar() {
  asientos[numero - 1] = undefined;
  celdita.className = "desocupado";
  limpiar();
}

function Buscar() {
  var busqueda = document.getElementById('busqueda').value;
  var lista='';
  for(var i= 1; i <= asientos.length; i++){
    if(asientos[i-1]!=undefined && busqueda == asientos[i-1].dni){
      lista += mostrar(i);
    }
  }
  document.getElementById('mostrar').innerHTML=lista;
}

function Listar() {
  limpiar();
  var lista = '';
  for (var i = 1; i <= asientos.length; i++) {
    if (asientos[i-1]!= undefined) {
      lista += mostrar(i);
    }
  }
  document.getElementById('mostrar').innerHTML=lista;
}
