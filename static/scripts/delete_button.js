document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', async (e) => {
        e.preventDefault();
        
        console.log("Delete Button JS")
        const propId = button.dataset.propId;
        const liked = button.dataset.liked === 'true';
        const url = liked ? '/unlike' : '/like';
  
        try {
          const response = await fetch('delete_prop', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ propertyId: propId })
          });
          const data = await response.json();
  
          if (data.success) {
            if (window.location.pathname === '/profile') {
  
              
              window.location.href = '/profile_prop';
  
            }

          } else {
            alert('Error: ' + (data.error || 'Unknown error'));
          }
        } catch (err) {
          alert('Request failed: ' + err.message);
        }
      });
    });
  });