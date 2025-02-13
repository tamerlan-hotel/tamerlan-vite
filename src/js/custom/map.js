var map = L.map("map").setView([49.4397313692332, 26.970028728138093], 14);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var marker = L.marker([49.4397313692332, 26.970028728138093]).addTo(map);

export default map;
