const body=document.body;
let contador=localStorage.getItem("contador")||0;
let modoSeleccionado=localStorage.getItem("modo-pag");
let carrito=[];
let btnCarrito=document.querySelector("#btnCarrito");
let btnModoBody=body.querySelector("#btn-modo");
let icono=body.querySelector("#btn-modo");
let arrayProductos=[];
//localhost para funcionamiento local
//const jsonEnlace="http://localhost:5500/data/productos.json";
const jsonEnlace="/ProyectoFinalBenitezGrion/data/productos.json";
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

const cargarProductosJSON=()=>{
    fetch(jsonEnlace,{
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      })
    .then(res=>res.json())
    .then(data=>mostrarResultados(data))
    .catch(error=>console.log(error))
    
}




const div=document.querySelector("#resultado-total");
const p=document.createElement("p");

//select
let arrayOrdenado=[];
function obtenerOrden(sl){
    
    switch(parseInt(sl)){
        case 1:
            fetch(jsonEnlace)
            .then(res=>res.json())
            .then(data=>mostrarResultados(data.sort((a,b)=>b.precio-a.precio)));
            
            
            break;
        case 2:
            fetch(jsonEnlace)
            .then(res=>res.json())
            .then(data=>mostrarResultados(data.sort((a,b)=>a.precio-b.precio)));
            
            break;
        case 3:
            fetch(jsonEnlace)
            .then(res=>res.json())
            .then(data=>mostrarResultados(data.sort((a, b) => {
                const aL = a.nombre.toLowerCase(); 
                const bL = b.nombre.toLowerCase(); 
                if (aL > bL) {
                    return 1;
                }
                if (aL < bL) {
                    return -1;
                }
                return 0;
            }))
        
        );
            

        break;
            
    }
}
function obtenerOrdenMasFiltro(sl,txt){
    
    switch(parseInt(sl)){
        case 1:
            fetch(jsonEnlace)
            .then(res=>res.json())
            .then(data=>{data.sort((a,b)=>b.precio-a.precio);
                
                mostrarResultados(data.filter((el)=>el.categoria.replace(/\s/g, '').toLowerCase()==txt ||el.nombre.replace(/\s/g, '').toLowerCase()==txt));
            });
            
            
            break;
        case 2:
            fetch(jsonEnlace)
            .then(res=>res.json())
            .then(data=>{data.sort((a,b)=>a.precio-b.precio);
                
                mostrarResultados(data.filter((el)=>el.categoria.replace(/\s/g, '').toLowerCase()==txt ||el.nombre.replace(/\s/g, '').toLowerCase()==txt));
            });
            
            break;
        case 3:
            fetch(jsonEnlace)
            .then(res=>res.json())
            .then(data=>{data.sort((a, b) => {
                const aL = a.nombre.toLowerCase(); 
                const bL = b.nombre.toLowerCase(); 
                if (aL > bL) {
                    return 1;
                }
                if (aL < bL) {
                    return -1;
                }
                return 0;
            })
            
                mostrarResultados(data.filter((el)=>el.categoria.replace(/\s/g, '').toLowerCase()==txt ||el.nombre.replace(/\s/g, '').toLowerCase()==txt));
            }
        );
            

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



const sl=document.getElementById("slOrden").value;
console.log(sl);
obtenerOrden(sl);
mostrarResultados(arrayProductos);

const btnBuscar=document.getElementById("btnBuscar");
btnBuscar.addEventListener("click",
()=>{
    
    let slClick=document.getElementById("slOrden").value;
    const txt=document.getElementById("txtFiltro").value.replace(/\s/g, '').toLowerCase();
    console.log(txt);
    if(txt!=""){
        obtenerOrdenMasFiltro(slClick,txt);
        
       /* fetch(jsonEnlace)
        .then(res=>res.json())
        .then(data=>mostrarResultados(data.filter((el)=>el.categoria.replace(/\s/g, '').toLowerCase()==txt ||el.nombre.replace(/\s/g, '').toLowerCase()==txt)));
    */
    }else{
        obtenerOrden(slClick);
    }
    
    }
);

