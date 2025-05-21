

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

    // Example properties array — replace with actual data injection
    // const properties = [
    //     {
    //         location: "Athens",
    //         lat: 37.9838,
    //         lng: 23.7275,
    //         type: "Apartment",
    //         price: "150000"
    //     },
    //     {
    //         location: "Thessaloniki",
    //         lat: 40.6401,
    //         lng: 22.9444,
    //         type: "House",
    //         price: "200000"
    //     }
    // ];


    // Add markers
    properties.forEach(prop => {
        L.marker([prop.x, prop.y])
            .addTo(map)
            .bindPopup(`<b>${prop.location} - ${prop.type}</b><br>Τιμή: ${prop.price}€`);
    });
});