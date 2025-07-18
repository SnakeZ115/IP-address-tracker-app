
let ipElement = document.querySelector('.ip');
let locationElement = document.querySelector('.location');
let timeZoneElement = document.querySelector('.timezone');
let ispElement = document.querySelector('.isp');

let searchButton = document.querySelector('.searchButton');
let ipInput = document.querySelector('.ip__input');

// Map
let map = L.map('map');
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
//

document.addEventListener('DOMContentLoaded', getIP(""))

searchButton.addEventListener('click', () => {
    getIP(ipInput.value);
});

async function getIP(ipValue) {

    try {
        let url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_34VdfwjTeifqORFvJF1u1PIoYrxPW&ipAddress=${ipValue}&domain=${ipValue}`;
        let result = await fetch(url);
        let data = await result.json();  

        updateDOM(data);
        setMap(data.location.lat, data.location.lng);
    } catch (error) {
        console.log(error);
    }
    
}

function updateDOM(data) {

    ipElement.textContent = data.ip;
    locationElement.textContent = `${data.location.region}, ${data.location.country} ${data.location.postalCode}`;
    timeZoneElement.textContent = `UTC ${data.location.timezone}`;
    ispElement.textContent = data.isp;

}

function setMap(lat, long) {

    map.setView([lat, long], 13)
    L.marker([lat, long]).addTo(map);
 
}


