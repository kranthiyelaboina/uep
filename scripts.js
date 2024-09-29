document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');

            const icon = darkModeToggle.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }

    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const headerOffset = 80; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    function debounce(func, wait = 20, immediate = true) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.style.display = 'flex';
            } else {
                backToTopButton.style.display = 'none';
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const getStartedBtnSmooth = document.querySelector('.get-started-btn');
    const targetSection = document.querySelector('#join-uniengineer');
    if (getStartedBtnSmooth && targetSection) {
        getStartedBtnSmooth.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 800;
            let start = null;

            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }

            requestAnimationFrame(animation);
        });
    }

    const introAnimation = document.getElementById('intro-animation');
    const introLogo = document.querySelector('.intro-logo');
    const pageContent = document.getElementById('main-content');

    if (introAnimation && introLogo && pageContent) {

        pageContent.classList.add('blur');

 
        introLogo.addEventListener('animationend', () => {
            setTimeout(() => {
                introAnimation.classList.add('fade-out');
            }, 1000);
        });

        introAnimation.addEventListener('transitionend', () => {
            introAnimation.style.display = 'none';

            pageContent.classList.remove('blur');
        });

        
        setTimeout(() => {
            if (!introAnimation.classList.contains('fade-out')) {
                introAnimation.classList.add('fade-out');
            }
        }, 4000);
    }
    const skipIntroButton = document.getElementById('skip-intro');
    if (skipIntroButton && introAnimation && pageContent) {
        skipIntroButton.addEventListener('click', () => {
            introAnimation.classList.add('fade-out');
            pageContent.classList.remove('blur');
        });
    }
});
