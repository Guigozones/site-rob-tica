document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Active Nav Link Highlighting on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.5 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => { observer.observe(section); });

    // Chart.js Budget Chart
    const ctx = document.getElementById('budgetChart').getContext('2d');
    const budgetData = {
        labels: ['Peças e Equipamentos', 'Logística e Transporte', 'Inscrição', 'Hospedagem', 'Divulgação'],
        datasets: [{
            data: [5, 60, 15, 15, 5],
            backgroundColor: ['#64FFDA', '#FF8C42', '#8892B0', '#3A5A92', '#CCD6F6'],
            borderColor: '#172A45',
            borderWidth: 4,
            hoverOffset: 15
        }]
    };

    const budgetConfig = {
        type: 'doughnut',
        data: budgetData,
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#8892B0', font: { size: 14 }, padding: 20, boxWidth: 15, usePointStyle: true, pointStyle: 'rectRounded' }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.label || '';
                            if (label) { label += ': '; }
                            if (context.parsed !== null) { label += context.parsed + '%'; }
                            return label;
                        }
                    },
                    backgroundColor: '#0A192F', titleFont: { size: 16 }, bodyFont: { size: 14 }, padding: 12, cornerRadius: 3
                }
            },
            cutout: '60%',
        }
    };
    new Chart(ctx, budgetConfig);
});