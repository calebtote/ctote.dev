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

                // Temporarily disable hover/focus styles
                contactLink.classList.add('copied');
                contactLink.setAttribute('data-original-html', contactLink.innerHTML); // Backup original content

                // Update content to show "Copied!"
                contactLink.innerHTML = `
                    <span class="menu-icon fas fa-check"></span>
                    <span class="link-text copied-text">Copied!</span>
                  `;

                // Remove "Copied!" and restore original content after 2 seconds
                setTimeout(() => {
                    contactLink.innerHTML = contactLink.getAttribute('data-original-html');
                    contactLink.removeAttribute('data-original-html');
                    contactLink.classList.remove('copied');
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

        // Define sections in order
        const sections = ['#home', '#about-me', '#resume'];

        function getNextSection(currentHash, direction) {
            const currentIndex = sections.indexOf(currentHash);
            if (currentIndex === -1) return '#home'; // Default to home if hash is unrecognized

            // Calculate the next index based on the direction
            const nextIndex =
                direction === 'next'
                    ? (currentIndex + 1) % sections.length // Move forward, cycle back to start
                    : (currentIndex - 1 + sections.length) % sections.length; // Move backward, cycle to end
            return sections[nextIndex];
        }

        function handleArrowClick(direction) {
            const currentHash = window.location.hash || '#home';
            const nextSection = getNextSection(currentHash, direction);
            window.location.hash = nextSection; // Update the hash to navigate to the new section
        }

        // Attach event listeners to arrows
        if (backArrow) {
            backArrow.addEventListener('click', () => handleArrowClick('prev'));
        }
        if (forwardArrow) {
            forwardArrow.addEventListener('click', () => handleArrowClick('next'));
        }

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
