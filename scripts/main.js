(() => {
    // Google Analytics Configuration
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'G-YPS9WXPQTD');

    // Centralized Google Analytics Event Sender
    function sendGAEvent(category, label) {
        gtag('event', 'click', {
            event_category: category,
            event_label: label,
        });
    }

    // Email Copy to Clipboard Function
    function copyEmailToClipboard(event) {
        event.preventDefault();

        const email = "caleb.tote@gmail.com";

        // Send Analytics Event
        sendGAEvent('Button', 'Contact');

        navigator.clipboard
            .writeText(email)
            .then(() => {
                const contactLink = event.target.closest('a');
                contactLink.innerHTML = '<span class="menu-icon fas fa-check"></span><span class="link-text">Copied!</span>';
                setTimeout(() => {
                    contactLink.innerHTML = '<span class="menu-icon fas fa-envelope"></span><span class="link-text">Email</span>';
                }, 2000);
            })
            .catch((err) => console.error('Failed to copy email:', err));
    }

    // Debounce Utility Function
    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    document.addEventListener('DOMContentLoaded', () => {
        // Prevent navigation interception on external links
        const externalLinks = document.querySelectorAll('a.external-link');
        externalLinks.forEach((link) => {
            link.addEventListener('click', (event) => {
                event.stopPropagation();
            });
        });

        // Navigation Arrows State Management
        const backArrow = document.getElementById('arrow-left');
        const forwardArrow = document.getElementById('arrow-right');

        function updateArrows() {
            const currentHash = window.location.hash || '#home';

            // Disable back arrow if on #home
            if (currentHash === '#home') {
                backArrow.classList.add('disabled');
                backArrow.style.pointerEvents = 'none';
                backArrow.style.opacity = '0.5';
            } else {
                backArrow.classList.remove('disabled');
                backArrow.style.pointerEvents = 'auto';
                backArrow.style.opacity = '1';
            }

            // Disable forward arrow if on #resume
            if (currentHash === '#resume') {
                forwardArrow.classList.add('disabled');
                forwardArrow.style.pointerEvents = 'none';
                forwardArrow.style.opacity = '0.5';
            } else {
                forwardArrow.classList.remove('disabled');
                forwardArrow.style.pointerEvents = 'auto';
                forwardArrow.style.opacity = '1';
            }
        }

        updateArrows();
        window.addEventListener('hashchange', updateArrows);

        // Attach Copy Email Function to Button
        const contactLink = document.querySelector('.email-link');
        if (contactLink) {
            contactLink.addEventListener('click', copyEmailToClipboard);
        }

        // Attach Google Analytics Event Listeners to Navigation Links
        const navLinks = document.querySelectorAll('[data-ga-event]');
        navLinks.forEach((link) => {
            link.addEventListener('click', (event) => {
                const eventLabel = event.target.getAttribute('data-ga-event');
                sendGAEvent('Navigation', eventLabel);
            });
        });
    });
})();
