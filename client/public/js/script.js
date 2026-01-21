document.addEventListener('DOMContentLoaded', () => {
    ScrollReveal().reveal('.hero-content', { delay: 200, origin: 'top', distance: '50px' });
    ScrollReveal().reveal('.startup-card', { delay: 400, origin: 'bottom', distance: '50px' });
    ScrollReveal().reveal('.portfolio-grid', { delay: 600 });

    const projects = [
        { title: 'Robotic Hand', desc: 'Pick and place precision.' },
        { title: 'Hexapod', desc: 'Spider-inspired locomotion.' },
        { title: 'Quadruped', desc: 'Four-legged robotic platform.' }
    ];

    const container = document.getElementById('project-container');
    projects.forEach(p => {
        const card = document.createElement('div');
        card.className = 'glass project-card';
        card.innerHTML = `<h3>${p.title}</h3><p>${p.desc}</p>`;
        container.appendChild(card);
    });
});
