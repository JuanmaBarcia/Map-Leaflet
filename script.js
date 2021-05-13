let marker
let arrMarker = []
let positionBefore = []
let positionActual = []

let posiciones = () => {
    let positions = async() => {
        let respBus = await fetch("https://api.metro.net/agencies/lametro/vehicles/")
        let dataBus = await respBus.json()
        let respRail = await fetch("https://api.metro.net/agencies/lametro-rail/vehicles/")
        let dataRail = await respRail.json()
        return [dataBus, dataRail]
    }
    positions()
        .then(datos => {
            // console.log(datos)
            datos.map(dato => {
                // console.log(dato)
                dato.items.map((vehiculo, i) => {
                    // if (i == 0) {
                    //     // console.log(marker)

                    //     // if (marker != undefined) {
                    //     //     positionBefore = {
                    //     //         id: marker._popup._content.split(" ")[1],
                    //     //         lat: marker._latlng.lat,
                    //     //         lng: marker._latlng.lng
                    //     //     }
                    //     //     console.log(`anterior`)
                    //     //     console.log(positionBefore)

                    //     // }
                    //     // console.log(marker)





                    //     // console.log(`vehiculo`)

                    //     // console.log(vehiculo)

                    // }

                    pintarDatos(vehiculo)
                })
            })
        })
}
const mapId = 'map';
const initialCoordinates = [34.076275636500945, -118.24132489330957];
const map = L.map(mapId).setView(initialCoordinates, 15);

const MAPBOX_API = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'

const ATTRIBUTION = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
const ACCESS_TOKEN = 'pk.eyJ1IjoiY2Nhc3RpbGxvMDZtYiIsImEiOiJja2k1eXpybXU3em1mMnRsNjNqajJ0YW12In0.aFQJlFDBDQeUpLHT4EiRYg';

L.tileLayer(MAPBOX_API, {
    attribution: ATTRIBUTION,
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: ACCESS_TOKEN
}).addTo(map);

let pintarDatos = ({ id, latitude, longitude }) => {
    if (id.length == 3) {
        let myIcon = L.icon({
            iconUrl: 'assets/train.png',
            iconSize: [30, 30]
        });
        const vehiculo = [latitude, longitude];
        marker = L.marker(vehiculo, { icon: myIcon }).bindPopup(`<strong>ID: ${id} </strong>`).addTo(map);
        arrMarker.push(marker)

        // if (id == 105) {
        //     positionActual = {
        //         id: id,
        //         lat: latitude,
        //         lng: longitude
        //     }
        //     console.log(`Actual`)
        //     console.log(positionActual)
        // }

        // if (positionBefore.id == positionActual.id) {
        //     do {} while (positionBefore.lat != positionActual.lat || positionBefore.lng != positionActual.lng)
        //     console.log(`cambio`)

        // }




    } else {
        let myIcon = L.icon({
            iconUrl: 'assets/bus.png',
            iconSize: [30, 30]
        });
        const vehiculo = [latitude, longitude];
        marker = L.marker(vehiculo, { icon: myIcon }).bindPopup(`<strong>ID: ${id} </strong>`).addTo(map);
        arrMarker.push(marker)
    }
}

posiciones()

setInterval(() => {
    for (let i = 0; i < arrMarker.length; i++) {

        map.removeLayer(arrMarker[i])
    }
    // console.log(arrMarker[0])
    // console.log(`anterior`)
    // console.log(arrMarker[0])

    // console.log(arrMarker[0]["_latlng"].lat)
    // console.log(arrMarker[0]["_latlng"].lng)

    // console.log(`arrMarker`)

    // console.log(arrMarker[0])
    // console.log(arrMarker[0]._popup._content.split(" ")[1])


    arrMarker = []
    posiciones()
}, 10000);

// console.log(`anterior`)

// console.log(positionBefore)
// console.log(`actual`)

// console.log(positionActual)