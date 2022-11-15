
let sectionInfo = document.getElementById("contenedor-imagenes")

const queryString = location.search

let parametro = new URLSearchParams (queryString)

const id = parametro.get("id")



fetch("https://amazing-events.herokuapp.com/api/events")
.then(response => response.json())
.then( data => {
    const eventsData = data
    const eventsInfo = eventsData.events
    
    let carta = eventsInfo.find(events => (events._id.toString()) === id )

    console.log()
    
    sectionInfo.innerHTML = `
                <div class="contenedor-imagenes1">
                    <img id="imagen-contenedor" src="${carta.image}" alt="${carta.name}">
                </div>
                <div class="contenedor-imagenes2">
                    <h2 id="h2-infor">${carta.name}</h2>
                    <p><span class ="spanInfo">Description: </span>${carta.description}</p>
                    <p><span class ="spanInfo">Category: </span> ${carta.category}</p>
                    <p><span class ="spanInfo">Capacity: </span> ${carta.capacity}</p>
                    <p><span class ="spanInfo">Assistance or Estimate: </span> ${carta.assistance || carta.estimate}</p> 
                    <p><span class ="spanInfo">Place: </span> ${carta.place}</p>
                    <p><span class ="spanInfo">Date: </span> ${carta.date}</p>
                    <p><span class ="spanInfo">Price: </span> $${carta.price}</p>
                </div>
    `



})    
.catch(error => console.log(error))





