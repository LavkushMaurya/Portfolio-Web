(() => {
  const themeToggle = document.getElementById('themeB');
const root = document.documentElement;

themeToggle.addEventListener('change', () => {
  root.classList.toggle('dark', themeToggle.checked);
});

})();

  // Project modal
  const openBtns = Array.from(document.querySelectorAll('.openProj'));
  const modal = document.getElementById('projModal');
  const modalTitle = document.getElementById('projTitle');
  const modalDesc = document.getElementById('projDesc');
  const closeBtn = document.getElementById('closeProj');

  function openModal(title, desc) {
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }
  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBtns.forEach(b => b.addEventListener('click', () => openModal(b.dataset.title, b.dataset.desc)));
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal(); });

  // Smooth scrolling for internal links
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });

  // Back to top
  const topBtn = document.getElementById('topB');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) topBtn.classList.add('show'); else topBtn.classList.remove('show');
  });
  topBtn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  // Form: basic client validation; allow Formspree to handle sending
  const form = document.getElementById('contactB');
  if (form) {
    form.addEventListener('submit', (e) => {
      const name = form.name.value.trim(), email = form.email.value.trim(), msg = form.message.value.trim();
      let valid = true;
      if (name.length < 2) valid = false;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) valid = false;
      if (msg.length < 8) valid = false;
      if (!valid) { e.preventDefault(); alert('Please complete form fields correctly.'); }
      else {
        // show natural submission; Formspree will handle network
        // optionally show a temporary message (not blocking)
        setTimeout(()=>alert('Thanks! Your message has been submitted.'), 500);
      }
    });
  }

  // Update year
  const yearB = document.getElementById('yearB'); if (yearB) yearB.textContent = new Date().getFullYear();


