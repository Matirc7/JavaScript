let table = document.querySelector('.table-container')
let $events = document.querySelector ('.tbody-events-container')
let $eventsUpcoming = document.querySelector ('.tbody-upcoming-container')
let $eventsPast = document.querySelector ('.tbody-past-container')

function imprimirTable(datos, contenedor){
    let tr = document.createElement("tr")
    tr.innerHTML = `
        <td class="subtitle"> ${datos.nombre}</td>
        <td class="subtitle">${datos.ganancia}</td>
        <td class="subtitle">${datos.porcentaje}</td>
    `
    contenedor.appendChild(tr)
}

function capacidad ( personas ) {
    return personas.map(p => p ).sort(( b, a ) => (a.capacity) - b.capacity )
}


function porcentaje ( personas ) {
    return personas.map(p => p ).sort(( b, a ) => ((a.assistance * 100) / a.capacity ) - (b.assistance * 100 ) / b.capacity )
}

function printEvents (mayorP, menorP, masC){

    $events.innerHTML = `
    <tr>
        <td class="subtitle">Event with the highest percentaje of attendance:</td>
        <td class="subtitle">Event with the lowest percentaje of attendance:</td>
        <td class="subtitle">Event with larger capacity:</td>
    </tr>
    <tr>
        <td class="content">${mayorP.name} = ${(mayorP.assistance * 100) / mayorP.capacity} % </td>
        <td class="content">${menorP.name} = ${(menorP.assistance * 100) / menorP.capacity} % </td>
        <td class="content">${masC.name} = ${masC.capacity}</td>
    </tr>
    `

    
}

function eventsStats( informacion ){
    const attendanceEvents = porcentaje(informacion)
    const highAttendance = attendanceEvents[0]  //mas porcentaje
    const lowAttendance = attendanceEvents [attendanceEvents.length - 1]//menor porcentaje
    const capacity = capacidad( informacion )
    const highCapacity  = capacity[0]//mas capacidad

    printEvents(highAttendance, lowAttendance, highCapacity) 
}


function upcomingDatos ( categoria, evento ){
    categoria.forEach(element => {

        const eventosIguales = evento.filter( evento => evento.category === element)
        
        const ganancias = eventosIguales.map(evento => (evento.estimate * evento.price)).reduce((acumulador, value)=> acumulador + value)



        const asistencia = eventosIguales.map(evento => (evento.estimate * 100 ) / evento.capacity)
        const sumaAsistencia = asistencia.reduce((acumulador, value) => acumulador + value) / asistencia.length 

        const datos = {
            nombre: element,
            ganancia: ganancias,
            porcentaje: sumaAsistencia.toFixed(2)
        }

        imprimirTable(datos, $eventsUpcoming)
    });
}


function past ( categoria, evento ){
    categoria.forEach(element => {

        const eventosIguales = evento.filter( evento => evento.category === element)
        
        const ganancias = eventosIguales.map(evento => (evento.assistance * evento.price)).reduce((acumulador, value)=> acumulador + value)



        const asistencia = eventosIguales.map(evento => (evento.assistance * 100 ) / evento.capacity)
        const sumaAsistencia = asistencia.reduce((acumulador, value) => acumulador + value) / asistencia.length 

        const datos = {
            nombre: element,
            ganancia: ganancias,
            porcentaje: sumaAsistencia.toFixed(2)
        }
        imprimirTable(datos, $eventsPast)
    });
}


fetch("https://amazing-events.herokuapp.com/api/events")
.then(response => response.json())
.then( data => {
    const eventsData = data
    const eventsInfo = eventsData.events

    const pastEvents = eventsInfo.filter(event => event.date < eventsData.currentDate);
    const upcomingEvents = eventsInfo.filter(event => event.date >= eventsData.currentDate);

    const fnCategory = events => events.category;
    const pastEventsCategory = Array.from(new Set(pastEvents.map(fnCategory)));
    const upcomingEventsCategory = Array.from(new Set(upcomingEvents.map(fnCategory)));
    

    eventsStats(pastEvents)
    upcomingDatos (upcomingEventsCategory, upcomingEvents)
    past(pastEventsCategory, pastEvents)
})

.catch(error => console.log(error))