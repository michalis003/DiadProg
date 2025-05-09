document.querySelectorAll('.drop2 a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // prevent jump to top
        const selectedText = this.textContent;
        document.querySelector('.srccat').textContent = selectedText;
        });
});

