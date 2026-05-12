const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

const revealItems = document.querySelectorAll('.reveal');
if (revealItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

const counters = document.querySelectorAll('[data-target]');
const startCounter = (element) => {
  const target = Number(element.dataset.target || 0);
  const suffix = element.dataset.suffix || '';
  let current = 0;
  const increment = Math.max(1, Math.floor(target / 60));

  const tick = () => {
    current += increment;
    if (current >= target) {
      current = target;
    }
    element.textContent = `${current}${suffix}`;
    if (current < target) {
      requestAnimationFrame(tick);
    }
  };

  tick();
};

if (counters.length) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.started) {
          entry.target.dataset.started = '1';
          startCounter(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));
}

const yearNode = document.querySelector('[data-year]');
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}
