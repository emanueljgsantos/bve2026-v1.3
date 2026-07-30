const CACHE_NAME =
"BVE-Dashboard-v1";


const FILES = [

"/",

"/index.html",

"/style.css",

"/script.js",

"/config.json",

"/data/operational.json",

"/data/resources.json",

"/data/systems.json",

"/data/incidents.json",

"/data/vehicles.json",

"/data/alerts.json"

];



self.addEventListener(
"install",
event=>{


event.waitUntil(

caches.open(
CACHE_NAME
)
.then(
cache=>cache.addAll(FILES)
)

);


});





self.addEventListener(
"fetch",
event=>{


event.respondWith(


caches.match(
event.request
)
.then(
response=>{


return response ||
fetch(event.request);


}

)

);


});
