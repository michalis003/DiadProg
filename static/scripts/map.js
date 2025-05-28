document.addEventListener("DOMContentLoaded", function () {

    const raw = document.getElementById('properties-data').textContent;
    const properties = JSON.parse(raw);
    console.log("test1q")
    console.log(properties)


    // Initialize the map
    console.log("test")
    const map = L.map('mapid').setView([37.9838, 23.7275], 6); // Default view over Greece

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    setTimeout(() => {
    map.invalidateSize(); // Forces Leaflet to recalculate dimensions
    map.setView([37.9838, 23.7275], 6); // Reset center just in case
    }, 1);

    // Add markers
    properties.forEach(prop => {
        L.marker([prop.x, prop.y])
            .addTo(map)
            .bindPopup(`<b>${prop.location} - ${prop.type}</b><br>Τιμή: ${prop.price}€`);
    });
});