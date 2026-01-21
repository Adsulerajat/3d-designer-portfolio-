document.addEventListener('DOMContentLoaded', () => {
    // ScrollReveal Config
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1000,
        delay: 200,
        reset: false
    });

    sr.reveal('.hero-content', { delay: 300 });
    sr.reveal('.startup-card', { delay: 400 });
    sr.reveal('.section-title', { delay: 300 });
    sr.reveal('.video-showcase', { delay: 500 });
    sr.reveal('.contact-container', { delay: 400 });

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
            desc: 'Agile four-legged robotic platform exploring advanced mobility algorithms.' 
        },
        { 
            title: 'Mechanical Components', 
            desc: 'A library of custom designed mechanical parts including joints, limbs and chassis.' 
        }
    ];

    const container = document.getElementById('project-container');
    projects.forEach((p, index) => {
        const card = document.createElement('div');
        card.className = 'glass project-card';
        card.innerHTML = `
            <h3>${p.title}</h3>
            <p>${p.desc}</p>
        `;
        container.appendChild(card);
        
        // Stagger reveal project cards
        sr.reveal(card, { delay: 300 + (index * 100) });
    });

    // Form submission handling
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Message received! I will get back to you soon.');
            form.reset();
        });
    }
});
