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
const messageBox = document.getElementById('formMessage');

if (form && messageBox) {
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // stop redirect

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const msg = form.message.value.trim();
    let valid = true;

    if (name.length < 2) valid = false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) valid = false;
    if (msg.length < 2) valid = false;

    if (!valid) {
      messageBox.className = "error show";
      messageBox.textContent = "⚠️ Please complete form fields correctly.";
      setTimeout(() => messageBox.className = "", 4000); // fade out after 4s
      return;
    }

    fetch(form.action, {
      method: "POST",
      body: new URLSearchParams({ name, email, message: msg })
    })
    .then(res => res.text())
    .then(data => {
      messageBox.className = "success show";
      messageBox.textContent = "✅ Thanks! Your message has been submitted.";
      form.reset();
      setTimeout(() => messageBox.className = "", 4000); // fade out after 4s
    })
    .catch(err => {
      messageBox.className = "error show";
      messageBox.textContent = "❌ Error sending message: " + err;
      setTimeout(() => messageBox.className = "", 4000); // fade out after 4s
    });
  });
}


  // Update year
  const yearB = document.getElementById('yearB'); if (yearB) yearB.textContent = new Date().getFullYear();


