let contador=parseInt(localStorage.getItem("contador"))||0;
const divCompra=document.querySelector("#divCompra");
const btnCompra=document.querySelector("#btnCompra");
let modoSeleccionado=localStorage.getItem("modo-pag");
let carritoLS=localStorage.getItem("carritoLS");
let carrito=[];
if(carritoLS!==null){
    carritoLS =JSON.parse(localStorage.getItem("carritoLS")||"[]");
    carrito.push(...carritoLS);
}else{
    carritoLS=[];

}
if (carritoLS.length===0){
    divCompra.classList.add("d-none");
    Swal.fire({
        icon:"error",
        title:"No tienes productos en tu carrito",
        confirmButtonText:"Elegí un producto",
        showCloseButton:true,
        showCancelButton:true,
        cancelButtonText:"Cancelar"
    }).then(
        (res)=>{
            if(res.isConfirmed){
                window.location.href="../index.html#productos"
            }
        }
    );
}
const clickComprar=()=>{
    localStorage.setItem("carritoLS",[]);
localStorage.setItem("contador",0);
mostrarCarrito();
Swal.fire({
    showConfirmButton:false,
    timer:3000,
    title:"Compra Realizada",
    icon:"success",
}).then(()=>window.location.href="../index.html#productos");


}
btnCompra.addEventListener("click",clickComprar);
const divCarritoVacio=document.querySelector("#carrito-vacio");
const divCarritoSeleccionado=document.querySelector("#carrito-seleccion");
const body=document.body;
let btnModoBody=body.querySelector("#btn-modo");
let icono=body.querySelector("#btn-modo");

if(modoSeleccionado==="modo-oscuro"){
    body.classList.add("modo-oscuro");
    icono.innerHTML=`<i class="fa fa-sun-o" style="font-size:30px;"></i>`;
}else{
    icono.innerHTML=`<i class="fa fa-moon-o" style="font-size:30px;"></i>`;
}

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

const mostrarCarrito=()=>{

    divCarritoSeleccionado.innerHTML="";
    carritoLS.forEach((el)=>{
    
        divCarritoVacio.classList.add("d-none");
        divCarritoSeleccionado.classList.remove("d-none");
        divProductoSeleccionado=document.createElement("div");
        divProductoSeleccionado.classList.add("producto-seleccionado","d-flex");
        divProductoSeleccionado.innerHTML+=`
        
        
        <h3> ${el.nombre}</h3>
        <p>Categoria: ${el.categoria}</p>
        <p>Precio: $${el.precio}</p>
        <p>Cantidad: ${el.cantidad}</p>
        <p>Subtotal: $${el.precio*el.cantidad}</p>
        <div><img src=".${el.img}" alt="${el.nombre}"/></div>
        
        
        `;
        btnEliminarDelCarrito=document.createElement("button");
        btnEliminarDelCarrito.innerText="X";
        btnEliminarDelCarrito.addEventListener("click",()=>{
            borrarDelCarrito(el);
        });

        btnResta1Carrito=document.createElement("button");
        btnResta1Carrito.innerText="-";
        btnResta1Carrito.addEventListener("click",()=>{
            restarDelCarrito(el);
            
        });
        btnSuma1Carrito=document.createElement("button");
        btnSuma1Carrito.innerText="+";
        btnSuma1Carrito.addEventListener("click",()=>{
            
                sumarDelCarrito(el);
            
            
        });
        divProductoSeleccionado.append(btnEliminarDelCarrito,btnResta1Carrito,btnSuma1Carrito);
        divCarritoSeleccionado.append(divProductoSeleccionado);
    })
}
const buscarObjeto=(producto)=>{
    carrito.forEach((el)=>{
        
            return el;
        
    }
    
)
}
function borrarDelCarrito(producto){

    const posicionEncontrada= carrito.findIndex(item=>item.id===producto.id);
    const elementoEncontrado=carrito.find(item=>item.id===producto.id);
    
    
    
    contador-=parseInt(elementoEncontrado.cantidad);
    localStorage.setItem("contador",contador);
    
    carrito.splice(posicionEncontrada,1);
    localStorage.setItem("carritoLS",JSON.stringify(carrito));
    location.reload();
}
function restarDelCarrito(producto){

    const posicionEncontrada= carrito.findIndex(item=>item.id===producto.id);
    const elementoEncontrado=carrito.find((item)=>item.id===producto.id);
    console.log(elementoEncontrado);
    if(elementoEncontrado.cantidad>1){
        
        elementoEncontrado.cantidad--;
        contador--;
    }
    
    localStorage.setItem("carritoLS",JSON.stringify(carrito));
    localStorage.setItem("contador",contador);
    mostrarCarrito();
    location.reload();
}
function sumarDelCarrito(producto){
    contador++;
    localStorage.setItem("contador",contador);
    //const elementoEncontrado= carrito.findIndex(item=>item.id===producto.id);
    const elementoEncontrado=carrito.find(item=>item.id===producto.id);
    
        elementoEncontrado.cantidad++;
    
    
    localStorage.setItem("carritoLS",JSON.stringify(carrito));
    mostrarCarrito();
    location.reload();
}
const div=document.querySelector("#resultado-total");
const p=document.createElement("p");
const mostrarTotal= ()=>{
    let precioTotal=carrito.reduce((acc,el)=>acc+(el.cantidad*el.precio),0);
    p.innerText=`$${precioTotal}`;
    div.append(p);
}
if(carrito.length>0){
    mostrarCarrito();
}

mostrarTotal();