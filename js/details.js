let events = data.events;

let sectionInfo = document.getElementById("contenedor-imagenes")

const queryString = location.search

let parametro = new URLSearchParams (queryString)

const id = parametro.get("id")

let carta = events.find(events => (events._id.toString()) === id ) 

console.log(carta)



sectionInfo.innerHTML = `
            <div class="contenedor-imagenes1">
                <img id="imagen-contenedor" src="${carta.image}" alt="${carta.name}">
            </div>
            <div class="contenedor-imagenes2">
                <h2 id="h2-infor">${carta.name}</h2>
                <p><span class ="spanInfo">Description: </span>${carta.description}</p>
                <p><span class ="spanInfo">Category: </span> ${carta.category}</p>
                <p><span class ="spanInfo">Capacity: </span> ${carta.capacity}</p>
                <p><span class ="spanInfo">Assistance o Estimate: </span> ${carta.assistance || carta.estimate}</p> 
                <p><span class ="spanInfo">Lugar: </span> ${carta.place}</p>
                <p><span class ="spanInfo">Fecha: </span> ${carta.date}</p>
                <p><span class ="spanInfo">Precio: </span> $${carta.price}</p>
                
                
            </div>
`




