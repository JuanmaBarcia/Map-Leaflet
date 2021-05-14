console.log(`Map Leaflet`)

let positionAntes = []
let positionActual = []
let cambios = []

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
            datos.map(dato => {
                dato.items.map(vehiculo => {
                    if (vehiculo.id.length == 3) {
                        let myIcon = L.icon({
                            iconUrl: 'assets/train.png',
                            iconSize: [30, 30]
                        });
                        positionActual.push(L.marker([vehiculo.latitude, vehiculo.longitude], { icon: myIcon }).bindPopup(`<strong>ID: ${vehiculo.id} </strong>`))
                    } else {
                        let myIcon = L.icon({
                            iconUrl: 'assets/bus.png',
                            iconSize: [30, 30]
                        });
                        positionActual.push(L.marker([vehiculo.latitude, vehiculo.longitude], { icon: myIcon }).bindPopup(`<strong>ID: ${vehiculo.id} </strong>`))
                    }
                })
            })
        }).then(() => {
            positionActual.forEach(vehiculo => vehiculo.addTo(map))
            if (positionAntes.length == positionActual.length) {
                for (let i = 0; i < positionAntes.length; i++) {
                    if (positionActual[i]._latlng != positionAntes[i]._latlng) {
                        cambios.push(positionAntes[i])
                    }
                }
            }
            cambios.forEach(vehiculo => map.removeLayer(vehiculo))
        })
}

const mapId = 'map';
const initialCoordinates = [34.076275636500945, -118.24132489330957];
const map = L.map(mapId).setView(initialCoordinates, 13);

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

posiciones()

setInterval(() => {
    positionAntes.forEach(vehiculo => map.removeLayer(vehiculo))
    cambios = []
    posiciones()

    positionAntes = positionActual
    positionActual = []
}, 1500);