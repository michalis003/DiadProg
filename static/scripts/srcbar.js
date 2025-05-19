console.log("File load")
document.querySelectorAll('.drop2 a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // prevent jump to top
        const selectedText = this.textContent;
        document.querySelector('.srccat').textContent = selectedText;
        });
});

const allCards = Array.from(document.querySelectorAll('.property-card'));
let currentPage = 1;
const itemsPerPage = 2;

function showPage(page) {
const start = (page - 1) * itemsPerPage;
const end = start + itemsPerPage;

allCards.forEach((card, index) => {
    card.style.display = index >= start && index < end ? 'block' : 'none';
});

document.getElementById('pageNum').textContent = page;
}

function nextPage() {
if ((currentPage * itemsPerPage) < allCards.length) {
    currentPage++;
    showPage(currentPage);
}
}

function prevPage() {
if (currentPage > 1) {
    currentPage--;
    showPage(currentPage);
}
}

document.addEventListener('DOMContentLoaded', () => {
showPage(currentPage);
});
