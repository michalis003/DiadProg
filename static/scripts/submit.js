// function showSection(id) {
//     const sections = document.querySelectorAll('.form-part');
//     sections.forEach(section => section.classList.remove('active'));

//     const target = document.getElementById(id);
//     if (target) target.classList.add('active');
//   }

function showSection(sectionId, element) {
    // Εναλλαγή φόρμας
    document.querySelectorAll('.form-part').forEach(el => {
        el.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');

    // Εναλλαγή active στο sidebar
    document.querySelectorAll('.sidebar li').forEach(li => {
        li.classList.remove('active');
    });
    element.classList.add('active');
}
