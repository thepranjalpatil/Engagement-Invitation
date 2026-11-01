(() => {
  // Countdown to 10:00 AM on 16 November 2026, India Standard Time.
  const target = new Date('2026-11-16T10:00:00+05:30').getTime();
  const ids = ['days', 'hours', 'minutes', 'seconds'];
  const message = document.getElementById('countdownMessage');

  function updateCountdown() {
    const distance = target - Date.now();
    if (distance <= 0) {
      ids.forEach(id => document.getElementById(id).textContent = '0');
      message.textContent = 'The celebrations begin now — welcome!';
      return;
    }
    const values = [
      Math.floor(distance / 86400000),
      Math.floor((distance % 86400000) / 3600000),
      Math.floor((distance % 3600000) / 60000),
      Math.floor((distance % 60000) / 1000)
    ];
    ids.forEach((id, i) => document.getElementById(id).textContent = String(values[i]).padStart(i === 0 ? 1 : 2, '0'));
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    menuToggle.textContent = open ? '×' : '☰';
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  }));

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  const progress = document.getElementById('progressBar');
  function updateProgress() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (scrollable > 0 ? window.scrollY / scrollable * 100 : 0) + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
})();
