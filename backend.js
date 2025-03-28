// Function to handle form submission
function handleFormSubmit(event, type) {
    event.preventDefault(); // Prevent page reload on submit

    // Get the form data
    const form = event.target;
    const name = form.querySelector('input[name="name"]').value;
    const item = form.querySelector('input[name="itemLost"], input[name="itemFound"]').value;
    const description = form.querySelector('textarea').value;
    const location = form.querySelector('input[name="lostLocation"], input[name="foundLocation"]').value;
    const contact = form.querySelector('input[type="text"]').value;

    // Create a new submission entry
    const submission = document.createElement('div');
    submission.classList.add('submission');
    submission.innerHTML = `
        <h3>${type === 'lost' ? 'Lost' : 'Found'} Item: ${item}</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Contact:</strong> ${contact}</p>
    `;

    // Append the new submission to the submissions list
    const submissionsList = document.getElementById('submissionsList');
    submissionsList.appendChild(submission);

    // Optionally clear the form after submission
    form.reset();
}

// Add event listeners to the forms
document.querySelector('.form-box:nth-child(1) form').addEventListener('submit', function(event) {
    handleFormSubmit(event, 'lost');
});

document.querySelector('.form-box:nth-child(2) form').addEventListener('submit', function(event) {
    handleFormSubmit(event, 'found');
});
