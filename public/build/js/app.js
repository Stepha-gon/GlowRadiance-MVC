let paso=1;const pasoInicial=1,pasoFinal=3,cita={id:"",nombre:"",fecha:"",hora:"",servicios:[]};function iniciarApp(){mostrarSeccion(),tabs(),botonesPaginador(),paginaSiguiente(),paginaAnterior(),consultarAPI(),idCliente(),nombreCliente(),seleccionarFecha(),seleccionarHora(),mostrarResumen()}function mostrarSeccion(){const e=document.querySelector(".mostrar");e&&e.classList.remove("mostrar");const t="#paso-"+paso;document.querySelector(t).classList.add("mostrar");const o=document.querySelector(".actual");o&&o.classList.remove("actual");document.querySelector(`[data-paso="${paso}"]`).classList.add("actual")}function tabs(){document.querySelectorAll(".tabs button").forEach(e=>{e.addEventListener("click",(function(e){paso=parseInt(e.target.dataset.paso),mostrarSeccion(),botonesPaginador(),3===paso&&mostrarResumen()}))})}function botonesPaginador(){const e=document.querySelector("#anterior"),t=document.querySelector("#siguiente");1===paso?(e.classList.add("ocultar"),t.classList.remove("ocultar")):3===paso?(e.classList.remove("ocultar"),t.classList.add("ocultar")):(e.classList.remove("ocultar"),t.classList.remove("ocultar")),mostrarSeccion()}function paginaAnterior(){document.querySelector("#anterior").addEventListener("click",(function(){paso<=1||(paso--,botonesPaginador())}))}function paginaSiguiente(){document.querySelector("#siguiente").addEventListener("click",(function(){3<=paso||(paso++,botonesPaginador(),3==paso&&mostrarResumen())}))}async function consultarAPI(){try{const e="/api/servicios",t=await fetch(e);mostrarServicios(await t.json())}catch(e){console.log(e)}}function mostrarServicios(e){e.forEach(e=>{const{id:t,nombre:o,precio:a}=e,n=document.createElement("P");n.classList.add("nombre-servicio"),n.textContent=o;const r=document.createElement("P");r.classList.add("precio-servicio"),r.textContent=formatearPrecio(a)+" COP";const c=document.createElement("DIV");c.classList.add("servicio"),c.dataset.idServicio=t,c.onclick=function(){seleccionarServicio(e)},c.appendChild(n),c.appendChild(r),document.querySelector("#servicios").appendChild(c)})}function formatearPrecio(e){const t=e.toString().split("."),o=t[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");if(t.length>1){return`${o}.${t[1]}`}return o}function seleccionarServicio(e){const{id:t}=e,{servicios:o}=cita,a=document.querySelector(`[data-id-servicio="${t}"]`);o.some(e=>e.id===t)?(cita.servicios=o.filter(e=>e.id!==t),a.classList.remove("seleccionado")):(cita.servicios=[...o,e],a.classList.add("seleccionado"))}function nombreCliente(){cita.nombre=document.querySelector("#nombre").value}function idCliente(){cita.id=document.querySelector("#id").value}function seleccionarFecha(){document.querySelector("#fecha").addEventListener("input",(function(e){const t=new Date(e.target.value),o=new Date,a=t.getUTCDay();[6,0].includes(a)?(e.target.value="",mostrarAlerta("Citas no disponibles Fines de Semana","error",".formulario")):t<o?(e.target.value="",mostrarAlerta("No puedes seleccionar una fecha anterior a hoy o el mismo dia","error",".formulario")):cita.fecha=e.target.value}))}function seleccionarHora(){document.querySelector("#hora").addEventListener("input",(function(e){const t=e.target.value.split(":")[0];t<7||t>17?(e.target.value="",mostrarAlerta("citas no disponibles","error",".formulario")):cita.hora=e.target.value}))}function mostrarAlerta(e,t,o,a=!0){const n=document.querySelector(".alerta");n&&n.remove();const r=document.createElement("DIV");r.textContent=e,r.classList.add("alerta"),r.classList.add("error");document.querySelector(o).appendChild(r),a&&setTimeout(()=>{r.remove()},3e3)}function mostrarResumen(){const e=document.querySelector(".contenido-resumen");for(;e.firstChild;)e.removeChild(e.firstChild);if(Object.values(cita).includes("")||0===cita.servicios.length)return void mostrarAlerta("Debes elegir almenos un servicio, fecha y hora de la cita","error",".contenido-resumen",!1);const{nombre:t,fecha:o,hora:a,servicios:n}=cita,r=document.createElement("P");r.innerHTML="<span>Nombre: </span> "+t;const c=new Date(o),i=c.getMonth(),s=c.getDate()+2,d=c.getFullYear(),l=new Date(Date.UTC(d,i,s)).toLocaleDateString("es-CO",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),u=new Date(cita.fecha+"T"+cita.hora).toLocaleString("es-ES",{hour:"numeric",minute:"numeric",hour12:!0}),m=document.createElement("P");m.innerHTML="<span>Fecha de la cita: </span> "+l;const p=document.createElement("P");p.innerHTML="<span>Hora de la cita: </span> "+u;const f=document.createElement("H3");f.textContent="Tus servicios solicitados",e.appendChild(f),n.forEach(t=>{const{id:o,nombre:a,precio:n}=t,r=document.createElement("DIV");r.classList.add("contenedor-servicio");const c=document.createElement("P");c.textContent=a;const i=document.createElement("P"),s=formatearPrecio(n);i.innerHTML=`<span>Precio: </span> ${s} COP`,r.appendChild(c),r.appendChild(i),e.appendChild(r)});const v=document.createElement("H3");v.textContent="Información de tu cita";const h=document.createElement("BUTTON");h.classList.add("boton"),h.textContent="Reservar Cita",h.onclick=reservarCita,e.appendChild(v),e.appendChild(r),e.appendChild(m),e.appendChild(p),e.appendChild(h)}async function reservarCita(){const{nombre:e,fecha:t,hora:o,servicios:a,id:n}=cita,r=a.map(e=>e.id),c=new FormData;c.append("fecha",t),c.append("hora",o),c.append("usuarioid",n),c.append("servicios",r);try{const e="/api/citas",t=await fetch(e,{method:"POST",body:c});(await t.json()).resultado&&Swal.fire({icon:"success",title:"Cita reservada",text:"Tu cita fue creada correctamente",confirmButtonText:"OK"}).then(()=>{window.location.reload()})}catch(e){Swal.fire({icon:"error",title:"Oops...Algo Salio mal!",text:"no se pudo guardar la cita",confirmButtonText:"OK"})}}document.addEventListener("DOMContentLoaded",(function(){iniciarApp()}));
//# sourceMappingURL=app.js.map
