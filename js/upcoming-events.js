let element = document.querySelector(".cards-section")
let events = data.events
let fragmento = document.createDocumentFragment ();
let checkSearch = document.getElementById("check-search")
const contenedorCheck = document.getElementById('checkbox')

let eventosFuturos = events.filter(event => (event.date >= data.currentDate) )

console.log(eventosFuturos)


//FILTRAR CHECK


const misCategorias = (events) =>events.category


const categories = new Set (events.map(misCategorias))

const arrayCategories = Array.from(categories)




function createChek (valores, contenedor){

    let template = ' '

    valores.forEach( values => template += ` 
                        <label class="form-check-label" for="${values}">
                            <input class="form-check-input" type="checkbox" value="${values}" name="" id="${values}" checked autocomplete="off"> ${values}
                        </label> ` 
        
    );

    contenedor.innerHTML = template
}




createChek (arrayCategories, contenedorCheck)











function createCards ( events ) {

    let divCard = document.createElement ('div')
    divCard.className = 'card'
    divCard.innerHTML = ` 
    <img src="${events.image}" class="card-img-top" alt="${events.name}">
    <div class="card-body">
        <h5 class="card-title">${events.name}</h5>
        <p class="card-text">${events.description}</p>
        <div class="info-cards"></div>
        <p class="valor-card" >$${events.price}<a name="${events.name}" class="ancors-cards" href="./details.html?id=${events._id}" role="button" >View more...</a> </p>
    </div>`
    return divCard
}


function printCards( events, contenedor ) {

    contenedor.innerHTML = ''

    let fragment = document.createDocumentFragment()

    events.forEach( events => fragment.appendChild (createCards (events) ) )

    contenedor.appendChild (fragment)
}

printCards (eventosFuturos, element)






checkSearch.addEventListener ('submit', (e) => {
    e.preventDefault()
    let datosCheck = Array.from(document.querySelectorAll("input[type='checkbox']:checked")).map(input => input.value)
    let filtros = filtrarCheck (eventosFuturos, datosCheck) 


    let datosSearch = Array.from(document.querySelectorAll("input[type='search']")).map(input => input.value)
    let valueSearch = datosSearch.toString().toLowerCase()
    let checkSearchFilter = filtrarSearch(filtros, valueSearch)
    printCards(checkSearchFilter, element)
})



function filtrarCheck (events, checked) {
    let filtrados = events.filter(events => checked.includes(events.category) || checked.length === 0)
    return filtrados
}

//FILTRAR SEARCH

function filtrarSearch (events, value) {
    if (value.length === 0) {
        return events;
    }
    let searchFilter = events.filter(events => events.name.toLowerCase().includes(value))
    return searchFilter
}



