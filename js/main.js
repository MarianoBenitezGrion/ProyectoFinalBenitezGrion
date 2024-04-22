const body=document.body;
let contador=localStorage.getItem("contador")||0;
let modoSeleccionado=localStorage.getItem("modo-pag");
let carrito=[];
let btnCarrito=document.querySelector("#btnCarrito");
let btnModoBody=body.querySelector("#btn-modo");
let icono=body.querySelector("#btn-modo");

if(modoSeleccionado==="modo-oscuro"){
    body.classList.add("modo-oscuro");
    icono.innerHTML=`<i class="fa fa-sun-o" style="font-size:30px;"></i>`;
}else{
    icono.innerHTML=`<i class="fa fa-moon-o" style="font-size:30px;"></i>`;
}
const pContador=document.createElement("p");
const mostrarContador=()=>{
    
    pContador.innerText="";
    if(contador>0){
        
        pContador.innerText=contador;
        btnCarrito.append(pContador);
    }
    

}
mostrarContador();
function modopagclick(){
    body.classList.toggle("modo-oscuro");
    if(body.classList.contains("modo-oscuro")){
        icono.innerHTML=`<i class="fa fa-sun-o" style="font-size:30px;"></i>`;
        localStorage.setItem("modo-pag", "modo-oscuro");
    }else{
        icono.innerHTML=`<i class="fa fa-moon-o" style="font-size:30px;"></i>`;
        localStorage.removeItem("modo-pag");
    }
    }
btnModoBody.addEventListener("click",modopagclick);


let carritoLS=localStorage.getItem("carritoLS");
if(carritoLS!==null) {
    carritoLS = JSON.parse(localStorage.getItem("carritoLS") || "[]");
} else {
    
    carritoLS=[];
}
if(carrito.length===0&&carritoLS.length>0){
    carrito.push(...carritoLS);
}

// Mostrar elementos del carrito almacenados en localStorage
if (carritoLS.length === 0) {
    localStorage.setItem("carritoLS",JSON.stringify(carrito));
}
/*if(carritoLS!==undefined){
    
    carritoLS.forEach((el)=>{console.log("LOCALSTORAGE: ",el)});
}else{
    localStorage.setItem("carritoLS",JSON.stringify(carrito));
}*/

const arrayProductos=[{
    id:1,
    nombre: "Remera Blanca Lisa",
    categoria:"indumentaria",
    img:"./img/remera-blanca-lisa.jpg",
    precio: 21000

},

{
    id:2,
    nombre:"Remera Negra Lisa",
    categoria:"indumentaria",
    img:"./img/remera-negra-lisa.png",
    precio:22000
},

{
    id:3,
    nombre:"Remera Blanca con Flor",
    categoria:"indumentaria",
    img:"./img/remera-blanca-flor.JPG",
    precio:22000
},
{
    id:4,
    nombre:"Remera Gris",
    categoria: "indumentaria",
    img:"./img/remera-gris.jpg",
    precio:2000
},
{
    id:6,
    nombre:"Remera Marron",
    categoria:"indumentaria",
    img:"./img/remera-marron.jpeg",
    precio:2400
}

];

const div=document.querySelector("#resultado-total");
const p=document.createElement("p");

function mostrarPromedio(prom){
labelProm=document.querySelector("#lblPromedio");
labelProm.innerHTML=prom;
}
function obtenerOrden(sl,array){
    switch(parseInt(sl)){
        case 1:
            array.sort((a,b)=>b.precio-a.precio);
            
            break;
        case 2:
            array.sort((a,b)=>a.precio-b.precio);
            break;
        case 3:
            array.sort((a, b) => {
                const aL = a.nombre.toLowerCase(); 
                const bL = b.nombre.toLowerCase(); 
                if (aL > bL) {
                    return 1;
                }
                if (aL < bL) {
                    return -1;
                }
                return 0;
            });

        break;
            
    }
}





function mostrarResultados(array){
    let sectionProductos= document.querySelector("section.texto");
    
    sectionProductos.innerHTML="";
    if(array.length==0){
        sectionProductos.innerHTML="<label class='rojo'>Su busqueda no coincide con nuestros registros</label>";
    }
        array.forEach((prod)=>{
            const article=document.createElement("article");
            article.classList.add("borde");
            article.innerHTML+=`
            
            <div class="contenedor-producto">
            <img src="${prod.img}" alt="${prod.nombre}">
                <h3>
                ${ prod.nombre}
    
        </h3>
        <p>
        categoria:
        ${
            prod.categoria
    }
                </p>
                <p>
                $
        ${prod.precio}
                </p>
                
            </div>
            
        `;
        
        const btn=document.createElement("button")
        btn.innerText="Agregar al carrito";
        btn.addEventListener("click",()=>{
            contador++;
            localStorage.setItem("contador",contador);
            Toastify({
                text: prod.nombre+" se agrego al carrito",
                gravity:"top",
                duration:5000,
                destination:"./pages/carrito.html",
                style:{
                    background:"linear-gradient(to left, #0F2D5C, #679AEA)",
                }
              }).showToast();
                aniadirAlCarrito(prod);
                
                mostrarContador();
            
        });
        
    
    localStorage.setItem("carritoLS",JSON.stringify(carrito));
    carritoLS=JSON.parse(localStorage.getItem("carritoLS"));






        article.append(btn);
        sectionProductos.append(article);
        
    }   
        
    )
}
    
    



const aniadirAlCarrito=(producto)=>{
    
    const itemEncontrado= carrito.find((el)=>el.id===producto.id);

//seleccion de un elemento

if(itemEncontrado){
    itemEncontrado.cantidad++;

}else{
    carrito.push({...producto, cantidad:1});
    
}
localStorage.removeItem("carritoLS");

localStorage.setItem("carritoLS",JSON.stringify(carrito));
carritoLS=JSON.parse(localStorage.getItem("carritoLS"));
}


function calcularPromedio(array){
    let suma=array.reduce((acc,producto)=>acc+producto.precio,0);
    let cantidad=array.reduce((cont)=>cont+1,0);
    console.log(suma);
    console.log(cantidad);
    return (suma/cantidad).toFixed(2);
}

const sl=document.getElementById("slOrden");
console.log(sl);
obtenerOrden(sl,arrayProductos);
mostrarResultados(arrayProductos);
let promedio=calcularPromedio(arrayProductos);
mostrarPromedio(promedio);
const btnBuscar=document.getElementById("btnBuscar");
btnBuscar.addEventListener("click",
()=>{
    
    let slClick=document.getElementById("slOrden").value;
    const txt=document.getElementById("txtFiltro").value.replace(/\s/g, '').toLowerCase();
    console.log(txt);
    if(txt!=""){
        arrayFiltrado=arrayProductos.filter((el)=>el.categoria.replace(/\s/g, '').toLowerCase()==txt ||el.nombre.replace(/\s/g, '').toLowerCase()==txt);
    obtenerOrden(slClick,arrayFiltrado);
    console.log(arrayFiltrado);
    mostrarResultados(arrayFiltrado);
    promedio=calcularPromedio(arrayFiltrado);
    mostrarPromedio(promedio);
    }else{
        obtenerOrden(slClick,arrayProductos);
        mostrarResultados(arrayProductos);
        promedio=calcularPromedio(arrayProductos);
        mostrarPromedio(promedio);
    }
    
    }


);

