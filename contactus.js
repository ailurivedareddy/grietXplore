
// Initialize EmailJS
emailjs.init('Ailurivedareddy'); // Replace YOUR_USER_ID with your EmailJS user ID

// Add event listener to the form
document.getElementById('contactForm').addEventListener('submit', function (event) {
  event.preventDefault();

  // Get form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Prepare data for EmailJS
  const formData = {
    Name: name,
    Email: email,
    Message: message,
  };

  // Send email using EmailJS
  emailjs.send('service_nvyyffq', 'template_daevlkj', formData) // Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID with EmailJS service and template IDs
    .then(function () {
      alert('Your message has been sent successfully!');
      document.getElementById('contactForm').reset();
    })
    .catch(function (error) {
      alert('Failed to send message. Please try again later.');
      console.error('EmailJS Error:', error);
    });
});