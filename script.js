/* ===================================================
   BVE Dashboard Operacional SADO
   Script v1.3
   =================================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{

    updateClock();

    setInterval(
        updateClock,
        1000
    );


    checkInternet();


    loadOperational();

    loadAlerts();

    loadIncidents();

    loadVehicles();

    loadSystems();


});



// =====================================
// Relógio
// =====================================

function updateClock(){

    const now =
    new Date();


    document.getElementById("date")
    .innerHTML =
    now.toLocaleDateString(
        "pt-PT",
        {
            weekday:"long",
            year:"numeric",
            month:"long",
            day:"numeric"
        }
    );


    document.getElementById("clock")
    .innerHTML =
    now.toLocaleTimeString(
        "pt-PT"
    );

}




// =====================================
// Internet
// =====================================

function checkInternet(){


const status =
document.getElementById(
"internetStatus"
);


if(navigator.onLine){

status.innerHTML =
"🟢 Internet Online";

}

else{

status.innerHTML =
"🔴 Sem Internet";

}


}


window.addEventListener(
"online",
checkInternet
);


window.addEventListener(
"offline",
checkInternet
);




// =====================================
// Situação operacional
// =====================================


async function loadOperational(){


try{


const r =
await fetch(
"data/operational.json"
);


const data =
await r.json();



document.getElementById(
"riskLevel"
)
.innerHTML =
data.risk.level;



document.getElementById(
"alertLevel"
)
.innerHTML =
data.alert.state;



document.getElementById(
"temperature"
)
.innerHTML =
data.weather.temperature;



document.getElementById(
"wind"
)
.innerHTML =
data.weather.wind;



document.getElementById(
"riskPanel"
)
.innerHTML =

`
🔥 Distrito:
${data.risk.district}

<br>

📍 Município:
${data.risk.municipality}

<br><br>

Nível:
<strong>
${data.risk.level}
</strong>

<br><br>

Atualização:
${data.updated}
`;



document.getElementById(
"weatherPanel"
)
.innerHTML =

`

🌡 ${data.weather.temperature}

<br>

💧 Humidade:
${data.weather.humidity}

<br>

🌬 Vento:
${data.weather.wind}

<br>

Direção:
${data.weather.direction}

`;



}

catch(e){

console.log(
"Erro operacional",
e
);

}


}





// =====================================
// Alertas
// =====================================


async function loadAlerts(){


try{


const r =
await fetch(
"data/alerts.json"
);


const alerts =
await r.json();



let html="";



alerts.forEach(
a=>{


html +=

`

<div>

${a.icon}

<strong>
${a.title}
</strong>

<br>

${a.message}

</div>

<hr>

`;



});



document.getElementById(
"alertsPanel"
)
.innerHTML =
html;



}


catch(e){

console.log(
"Sem alertas"
);

}


}





// =====================================
// Ocorrências
// =====================================


async function loadIncidents(){


try{


const r =
await fetch(
"data/incidents.json"
);


const incidents =
await r.json();



let html="";



incidents.forEach(
i=>{


html +=

`

<div>

🕒 ${i.time}

<br>

🚨 ${i.type}

<br>

📍 ${i.location}

<br>

Estado:
${i.status}

</div>

<hr>

`;



});



document.getElementById(
"incidentsPanel"
)
.innerHTML =
html;


}


catch(e){


console.log(
"Erro ocorrências"
);


}


}





// =====================================
// Viaturas
// =====================================


async function loadVehicles(){


try{


const r =
await fetch(
"data/vehicles.json"
);


const vehicles =
await r.json();



let html="";



vehicles.forEach(
v=>{


html +=

`

<div>

🚒
<strong>
${v.name}
</strong>

<br>

${v.status}

<br>

Local:
${v.location}

<br>

Tripulação:
${v.crew}

</div>

<hr>

`;



});



document.getElementById(
"vehiclesPanel"
)
.innerHTML =
html;


}



catch(e){

console.log(
"Erro meios"
);


}


}







// =====================================
// Sistemas
// =====================================


async function loadSystems(){


try{


const r =
await fetch(
"data/systems.json"
);


const systems =
await r.json();



let html="";



systems.forEach(
s=>{


html +=


`

<div>

${s.icon}

${s.name}

<br>

${s.status}

</div>

<hr>

`;



});



document.getElementById(
"systemsPanel"
)
.innerHTML =
html;


document.getElementById(
"systemState"
)
.innerHTML =
"🟢 OK";


}


catch(e){


document.getElementById(
"systemState"
)
.innerHTML =
"🔴 Falha";


}


}





// =====================================
// Atualização manual
// =====================================


document
.getElementById(
"refreshAll"
)
.addEventListener(
"click",
()=>{


loadOperational();

loadAlerts();

loadIncidents();

loadVehicles();

loadSystems();


}
);





// =====================================
// Full Screen
// =====================================


document
.getElementById(
"fullscreen"
)
.addEventListener(
"click",
()=>{


if(!document.fullscreenElement){

document.documentElement
.requestFullscreen();

}

else{

document.exitFullscreen();

}

if(
"serviceWorker" in navigator
){

window.addEventListener(
"load",
()=>{


navigator.serviceWorker.register(
"service-worker.js"
);


}

);

}
});
