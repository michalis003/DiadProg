DiadProg – Διαδραστική Πλατφόρμα Αγγελιών Ακινήτων

This is a 4th year semester project for ECE, University of Patras.

🔧 Built With:

Node.js

Express.js

Handlebars.js

SQLite3

Leaflet.js (OpenStreetMap)

HTML5, CSS3, JavaScript

Bootstrap (UI Components)

🏠 Project Description

DiadProg is a full-stack web application for managing and browsing property listings (real estate). It allows users to explore available properties based on location, price, size, and other criteria. Admins and users can interact with listings via a user-friendly interface backed by a lightweight database and map functionality.

Key features include:

🔍 Advanced property search with filters (price, area, year, etc.)

📍 Interactive map integration using Leaflet and OpenStreetMap

👤 User session support

❤️ Like/unlike properties (favorites)

🗂️ Admin panel for managing listings

🧱 Sorting mechanism (price, surface, year) with dynamic label updating

📁 Database Schema

The app uses an SQLite database with tables like USER and AKINITO. Properties include coordinates (x, y) to display markers on the map.

Example schema:

CREATE TABLE "AKINITO" (
  "prop_id" INTEGER PRIMARY KEY,
  "price" INTEGER,
  "surface" INTEGER,
  ...
  "x" REAL,
  "y" REAL,
  FOREIGN KEY("user_id") REFERENCES "USER"("id")
);

🌐 API & Routes

Core Endpoints:

GET / – Home page

GET /searchPage – Search interface for properties

GET /places?sort=... – Sorted property listings

POST /like/:id – Toggle like/unlike on a property

Admin Actions:

GET /admin – Admin dashboard

POST /admin/add – Add a new property

💡 Extra Features

🌍 Map markers for each property

🧠 Smart sorting dropdown with readable labels (e.g., "Τιμή ↑")

📱 Responsive design

🔐 Basic session authentication

🚀 How to Run

Clone the repository:

git clone https://github.com/michalis003/DiadProg.git
cd DiadProg

Install dependencies:

npm install

Run the server:

node app.js

Open your browser and go to:http://localhost:3000

