// Navigation scroll effect
window.addEventListener('scroll', function() {
	const nav = document.querySelector('nav');
	if (window.scrollY > 50) {
		nav.classList.add('scrolled');
	} else {
		nav.classList.remove('scrolled');
	}
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navEl = document.querySelector('nav');
menuToggle?.addEventListener('click', () => {
	const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
	menuToggle.setAttribute('aria-expanded', String(!expanded));
	navEl.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('nav .nav-links a').forEach(a => {
	a.addEventListener('click', () => {
		if (navEl.classList.contains('active')) {
			navEl.classList.remove('active');
			menuToggle?.setAttribute('aria-expanded', 'false');
		}
	});
});

// Scrollspy - highlight active nav link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav .nav-links a');
const setActiveLink = () => {
	let current = '';
	sections.forEach(sec => {
		const top = window.scrollY;
		const offset = sec.offsetTop - 120; // account for fixed nav
		const height = sec.offsetHeight;
		if (top >= offset && top < offset + height) {
			current = '#' + sec.id;
		}
	});
	navLinks.forEach(link => {
		link.classList.toggle('active', link.getAttribute('href') === current);
	});
};
window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('visible');
			revealObserver.unobserve(entry.target);
		}
	});
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// Footer year
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = String(new Date().getFullYear());
