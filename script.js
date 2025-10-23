// ==============================
// Função helper para safe onclick
// ==============================
function safeOnClick(id, callback) {
  const el = document.getElementById(id);
  if (el) {
    el.onclick = callback;
  }
}

// ==============================
// Redirecionamentos dos botões
// ==============================
safeOnClick("btnsaude", () => location.href = "./bem-estar.html");
safeOnClick("btnprotect", () => location.href = "./bem-estar.html#btnprotect");
safeOnClick("btncurso", () => location.href = "./oportunidades.html");
safeOnClick("btnedu", () => location.href = "./oportunidades.html#btnedu");
safeOnClick("btnopo", () => location.href = "./oportunidades.html#btnopo");
safeOnClick("btnslide-1", () => location.href = "./bem-estar.html");


// ==============================
// Carrossel de slides
// ==============================
document.addEventListener('DOMContentLoaded', () => {
  const slides = Array.from(document.querySelectorAll('.slides'));
  const prevBtn = document.getElementById('btnleft');
  const nextBtn = document.getElementById('btnright');
  const container = document.querySelector('.carrossel');

  if (slides.length === 0) return; // sem slides, ignora

  let currentIndex = 0;
  let intervalId = null;
  const AUTO_DELAY = 5000;

  function showSlide(index) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === index);
      s.style.pointerEvents = i === index ? 'auto' : 'none';
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAuto(); });

  function startAuto() { intervalId = setInterval(nextSlide, AUTO_DELAY); }
  function stopAuto() { if (intervalId) { clearInterval(intervalId); intervalId = null; } }
  function resetAuto() { stopAuto(); startAuto(); }

  showSlide(currentIndex);
  startAuto();

  if (container) {
    container.addEventListener('mouseenter', stopAuto);
    container.addEventListener('mouseleave', startAuto);
  }
});

// ==============================
// Menu hamburguer robusto
// ==============================
(function () {
  function initMenuToggle() {
    const toggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav-menu');

    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        nav.classList.toggle('show');
        console.log('[menu] toggle click -> show=', nav.classList.contains('show'));
      });
    } else {
      // fallback via delegação
      document.addEventListener('click', (e) => {
        const clickedToggle = e.target.closest && e.target.closest('#menu-toggle');
        if (clickedToggle) {
          const navNow = document.getElementById('nav-menu');
          if (navNow) navNow.classList.toggle('show');
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMenuToggle);
  } else {
    initMenuToggle();
  }
})();
