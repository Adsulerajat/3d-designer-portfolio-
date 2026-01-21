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
    sr.reveal('.reveal-left', { origin: 'left' });
    sr.reveal('.reveal-right', { origin: 'right' });

    sr.reveal('.hero-content', { delay: 400 });
    sr.reveal('.startup-card', { delay: 500, distance: '100px' });
    sr.reveal('.section-title', { interval: 100 });
    sr.reveal('.video-showcase', { delay: 600 });
    sr.reveal('.contact-container', { delay: 500 });

    // Dynamic Portfolio Data
    const projects = [
        { 
            title: 'Pick & Place Robotic Hand', 
            desc: 'A precision-engineered robotic hand designed for high-accuracy industrial operations with integrated sensor feedback.' 
        },
        { 
            title: 'SIRA - Hexapod', 
            desc: 'Biomimetic spider architecture featuring complex hexapod locomotion and terrain adaptation algorithms.' 
        },
        { 
            title: 'SIRA - Quadruped', 
            desc: 'High-agility four-legged robotic platform exploring advanced mobility and balance control systems.' 
        },
        { 
            title: 'Mechanical Systems', 
            desc: 'A comprehensive library of custom designed mechanical parts, chassis architectures, and structural joints.' 
        }
    ];

    const container = document.getElementById('project-container');
    projects.forEach((p, index) => {
        const card = document.createElement('div');
        card.className = 'glass project-card reveal-bottom';
        card.innerHTML = `
            <div>
                <h3>${p.title}</h3>
                <p>${p.desc}</p>
            </div>
            <div style="margin-top: 2rem;">
                <span style="color: var(--secondary); font-family: var(--font-display); font-size: 0.7rem; letter-spacing: 1px;">MECHANICAL ENGINEERING</span>
            </div>
        `;
        container.appendChild(card);
        
        // Stagger reveal project cards with index
        sr.reveal(card, { delay: 400 + (index * 150) });
    });

    // Form submission handling
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'SENDING...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Success! Your message has been sent to the neural network.');
                form.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }

    // Smooth scroll for nav items
    document.querySelectorAll('.nav-item').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
