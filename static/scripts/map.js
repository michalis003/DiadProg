document.addEventListener("DOMContentLoaded", function () {
    const propertiesDataElement = document.getElementById('properties-data');
    
    if (!propertiesDataElement) {
        // console.warn("#properties-data δεν βρέθηκε στο DOM.");
        return;
    }

    const raw = propertiesDataElement.textContent;
    let properties;

    try {
        properties = JSON.parse(raw);
    } catch (e) {
        console.error("Σφάλμα στην ανάλυση JSON:", e);
        return;
    }

    console.log("Φορτώθηκαν ιδιοκτησίες:", properties);

    // Initialize the map
    const map = L.map('mapid').setView([37.9838, 23.7275], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    setTimeout(() => {
        map.invalidateSize();
        map.setView([37.9838, 23.7275], 6);
    }, 1);

    // Add markers
    properties.forEach(prop => {
        if (prop.x && prop.y) {
            L.marker([prop.x, prop.y])
                .addTo(map)
                .bindPopup(`<b>${prop.location} - ${prop.type}</b><br>Τιμή: ${prop.price}€`);
        }
    });
});