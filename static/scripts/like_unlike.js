document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.like-toggle-btn').forEach(button => {
    button.addEventListener('click', async (e) => {
      e.preventDefault();

      const propId = button.dataset.propId;
      const liked = button.dataset.liked === 'true';
      const url = liked ? '/unlike' : '/like';

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ propertyId: propId })
        });
        const data = await response.json();

        if (data.success) {
          button.dataset.liked = (!liked).toString();
          button.textContent = liked ? 'Like' : 'Unlike';
        } else {
          alert('Error: ' + (data.error || 'Unknown error'));
        }
      } catch (err) {
        alert('Request failed: ' + err.message);
      }
    });
  });
});
