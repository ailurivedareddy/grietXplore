document.addEventListener("DOMContentLoaded", function () {
    const lostForm = document.getElementById("lostForm");
    const submittedItems = document.getElementById("submittedItems");

    // Load persisted data from localStorage
    loadSubmittedItems();

    if (lostForm) {
        lostForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // Collect form data
            const name = document.getElementById("name").value;
            const itemLost = document.getElementById("itemLost").value;
            const itemDescriptionLost = document.getElementById("itemDescriptionLost").value;
            const lostLocation = document.getElementById("lostLocation").value;
            const contactType = document.getElementById("contactLost").value;
            const contactInfo = document.getElementById("contactLostInput").value;

            // Create a new item object
            const newItem = {
                name,
                itemLost,
                itemDescriptionLost,
                lostLocation,
                contactType,
                contactInfo,
            };

            // Add to the DOM
            addItemToDOM(newItem);

            // Save to localStorage
            saveItemToLocalStorage(newItem);

            // Clear the form
            lostForm.reset();
        });
    }

    // Function to add an item to the DOM
    function addItemToDOM(item) {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("submitted-item");
        itemDiv.innerHTML = `
            <h3>Lost Item</h3>
            <p><strong>Name:</strong> ${item.name}</p>
            <p><strong>Item Lost:</strong> ${item.itemLost}</p>
            <p><strong>Description:</strong> ${item.itemDescriptionLost}</p>
            <p><strong>Lost Location:</strong> ${item.lostLocation}</p>
            <p><strong>Contact (${item.contactType}):</strong> ${item.contactInfo}</p>
            <button class="found-button">Mark as Found</button>
        `;

        // Add functionality to the "Mark as Found" button
        const foundButton = itemDiv.querySelector(".found-button");
        foundButton.addEventListener("click", function () {
            itemDiv.remove();
            removeItemFromLocalStorage(item); // Remove from localStorage
        });

        submittedItems.appendChild(itemDiv);
    }

    // Function to save an item to localStorage
    function saveItemToLocalStorage(item) {
        const items = JSON.parse(localStorage.getItem("submittedItems")) || [];
        items.push(item);
        localStorage.setItem("submittedItems", JSON.stringify(items));
    }

    // Function to load items from localStorage
    function loadSubmittedItems() {
        const items = JSON.parse(localStorage.getItem("submittedItems")) || [];
        items.forEach((item) => {
            addItemToDOM(item);
        });
    }

    // Function to remove an item from localStorage
    function removeItemFromLocalStorage(itemToRemove) {
        const items = JSON.parse(localStorage.getItem("submittedItems")) || [];
        const filteredItems = items.filter((item) => {
            return (
                item.name !== itemToRemove.name ||
                item.itemLost !== itemToRemove.itemLost ||
                item.itemDescriptionLost !== itemToRemove.itemDescriptionLost ||
                item.lostLocation !== itemToRemove.lostLocation ||
                item.contactType !== itemToRemove.contactType ||
                item.contactInfo !== itemToRemove.contactInfo
            );
        });
        localStorage.setItem("submittedItems", JSON.stringify(filteredItems));
    }
});
