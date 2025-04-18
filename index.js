import { db } from './firebase-config.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu functionality
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Add event listener for close button in success popup
    const closeButton = document.querySelector('#successPopup button');
    if (closeButton) {
        closeButton.addEventListener('click', closePopup);
    }
    
    // Add event listener for overlay click to close popup
    document.getElementById('overlay').addEventListener('click', closePopup);

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Check for saved theme preference or use default dark theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Toggle theme when button is clicked
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
});


function showPopup() {
    document.getElementById('successPopup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function closePopup() {
    document.getElementById('successPopup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

document.querySelector('form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form fields
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const course = document.getElementById('course').value;
    const year = document.getElementById('year').value;
    const phone = document.getElementById('phone').value.trim();
    const events = document.getElementById('events').value;
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !course || !year || !phone || !message) {
        alert('Please fill in all required fields');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Phone validation (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone.replace(/[\s-]/g, ''))) {
        alert('Please enter a valid 10-digit phone number');
        return;
    }

    try {
        // Save to Firestore
        const registrationRef = collection(db, 'registration');
        await addDoc(registrationRef, {
            name,
            email,
            course,
            year,
            phone,
            events,
            message,
            timestamp: new Date()
        });

        // If successful, show success popup
        showPopup();
        this.reset(); // Reset form fields
    } catch (error) {
        console.error('Error saving registration:', error);
        alert('An error occurred while submitting the form. Please try again.');
    }
});