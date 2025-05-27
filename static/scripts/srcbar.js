
let currentPageMap = {
    "my_prop": 1,
    "favorities": 1,
    "search_section": 1
};

const itemsPerPage = 2;

function showPage(sectionId, page) {
    const section = document.getElementById(sectionId);
    const cards = Array.from(section.querySelectorAll('.property-card'));

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    cards.forEach((card, index) => {
        card.style.display = index >= start && index < end ? 'block' : 'none';
    });

    currentPageMap[sectionId] = page;

    const pageNumSpan = document.getElementById(`pageNum-${sectionId}`);
    if (pageNumSpan) {
        pageNumSpan.textContent = page;
    }
}

function nextPage(sectionId) {
    const section = document.getElementById(sectionId);
    const cards = section.querySelectorAll('.property-card');
    let currentPage = currentPageMap[sectionId];

    if ((currentPage * itemsPerPage) < cards.length) {
        currentPage++;
        showPage(sectionId, currentPage);
    }
}

function prevPage(sectionId) {
    let currentPage = currentPageMap[sectionId];
    if (currentPage > 1) {
        currentPage--;
        showPage(sectionId, currentPage);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const sections = ["my_prop", "favorities", "search_section"];
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            showPage(id, 1);
        }
    });
});
