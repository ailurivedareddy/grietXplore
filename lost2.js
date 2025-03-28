document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('lostForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevents form from reloading the page

        const formData = {
            name: document.getElementById('name').value,
            itemLost: document.getElementById('itemLost').value,
            itemDescriptionLost: document.getElementById('itemDescriptionLost').value,
            lostLocation: document.getElementById('lostLocation').value,
            contactLost: document.getElementById('contactLost').value,
            contactLostInput: document.getElementById('contactLostInput').value,
        };

        // POST request to API
        fetch('http://localhost:5000/api/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            document.getElementById('submittedItems').innerHTML = `
                <p>Name: ${data.name}</p>
                <p>Item Lost: ${data.itemLost}</p>
                <p>Description: ${data.itemDescriptionLost}</p>
                <p>Location: ${data.lostLocation}</p>
                <p>Contact: ${data.contactLostInput}</p>
            `;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});
