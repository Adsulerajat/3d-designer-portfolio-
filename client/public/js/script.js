document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Glow Effect
    const cursor = document.querySelector('.cursor-glow');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // ScrollReveal Config
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '80px',
        duration: 1200,
        delay: 200,
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        reset: false
    });

    sr.reveal('.reveal-top', { origin: 'top' });
    sr.reveal('.reveal-bottom', { origin: 'bottom' });

    sr.reveal('.hero-content', { delay: 400 });
    sr.reveal('.startup-card', { delay: 500 });
    sr.reveal('.section-title', { interval: 100 });
    sr.reveal('.video-showcase', { delay: 600 });
    sr.reveal('.contact-container', { delay: 500 });

    // Dynamic Portfolio Data
    const projects = [
        { 
            title: 'Pick & Place Robotic Hand', 
            desc: 'A precision-engineered robotic hand designed for high-accuracy industrial operations.' 
        },
        { 
            title: 'SIRA - Hexapod', 
            desc: 'Biomimetic spider architecture with complex hexapod locomotion systems.' 
        },
        { 
            title: 'SIRA - Quadruped', 
            desc: 'Agile four-legged robotic platform exploring advanced mobility control.' 
        },
        { 
            title: 'Mechanical Systems', 
            desc: 'Custom designed mechanical parts, chassis architectures, and structural joints.' 
        }
    ];

    const container = document.getElementById('project-container');
    projects.forEach((p, index) => {
        const card = document.createElement('div');
        card.className = 'glass project-card reveal-bottom';
        card.innerHTML = `<h3>${p.title}</h3><p>${p.desc}</p>`;
        container.appendChild(card);
        sr.reveal(card, { delay: 400 + (index * 150) });
    });

    // Form logic
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Success! Your message has been sent.');
            form.reset();
        });
    }

    // Smooth scroll
    document.querySelectorAll('.nav-item').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
