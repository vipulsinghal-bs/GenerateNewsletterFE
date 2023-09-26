// const generateNewsletter = require('./newsletter_generator');
import {hello} from './newsletter_generator.js';
document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = 'https://718e-43-248-153-114.ngrok.io/scrape';
    const myForm = document.getElementById("myForm");

    myForm.addEventListener("submit", function (event) {
        event.preventDefault();
        console.log(event)
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const url = document.getElementById("url").value;
        const duration = document.getElementById("duration").value;

        const requestData = {
            email: email,
            password: password,
            space_url: url,
            months: duration
          };

        // Simple email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.match(emailRegex)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Password length validation
        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        // Additional custom validation for the URL can be added here

        // If all validation passes, log the values
        console.log("Email:", email);
        console.log("Password:", password);
        console.log("URL:", url);
        console.log("Duration:", duration + " month(s)");

         const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // You may need to add other headers like authorization tokens here
            },
            body: JSON.stringify(requestData)
          };

          alert("We are processing the messages. Your newsletter will be downloaded after few minutes.")  
          
          // Make the POST request
          fetch(apiUrl, requestOptions)
          .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(data => {
              console.log('API Response:', data.data);

              hello(data.data);
            })
            .catch(error => {
              console.error('Error:', error);
            });

      
    });
});
