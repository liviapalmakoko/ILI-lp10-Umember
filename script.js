/* =========================================================
   U MEMBERS — by Ilikia | interações
   ========================================================= */
(function () {
  'use strict';

  /* marca que o JS está ativo (habilita animações de reveal) */
  document.documentElement.classList.add('js');

  /* ---- Header muda ao rolar ---- */
  var header = document.getElementById('header');
  var hero = document.getElementById('hero');
  var formSection = document.getElementById('formulario');
  var mobileStickyCta = document.getElementById('mobileStickyCta');
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 40);

    if (mobileStickyCta && hero && formSection) {
      var passedHero = window.scrollY > hero.offsetHeight * 0.72;
      var beforeForm = formSection.getBoundingClientRect().top > window.innerHeight * 0.68;
      mobileStickyCta.classList.toggle('is-visible', passedHero && beforeForm);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Menu mobile ---- */
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('mobileMenu');
  toggle.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---- FAQ: accordion exclusivo com abertura suave ---- */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var summary = item.querySelector('summary');

    summary.addEventListener('click', function (event) {
      event.preventDefault();
      var shouldOpen = !item.open;

      if (shouldOpen) {
        faqItems.forEach(function (other) {
          if (other !== item && other.open) animateFaq(other, false);
        });
      }

      animateFaq(item, shouldOpen);
    });
  });

  function animateFaq(item, opening) {
    if (item.faqAnimation) item.faqAnimation.cancel();

    var startHeight = item.offsetHeight;
    item.classList.toggle('is-closing', !opening);

    if (opening) {
      item.open = true;
      item.classList.add('is-opening');
    }

    var summaryHeight = item.querySelector('summary').offsetHeight;
    var endHeight = opening ? item.scrollHeight : summaryHeight;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    item.style.overflow = 'hidden';
    item.faqAnimation = item.animate(
      { height: [startHeight + 'px', endHeight + 'px'] },
      { duration: reduceMotion ? 1 : (opening ? 460 : 380), easing: 'cubic-bezier(.22,.72,.24,1)' }
    );

    item.faqAnimation.onfinish = function () {
      item.open = opening;
      item.classList.remove('is-opening', 'is-closing');
      item.style.height = '';
      item.style.overflow = '';
      item.faqAnimation = null;
    };

    item.faqAnimation.oncancel = function () {
      item.classList.remove('is-opening', 'is-closing');
      item.style.height = '';
      item.style.overflow = '';
      item.faqAnimation = null;
    };
  }

  /* ---- Reveal on scroll ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -60px 0px' });
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = (i % 3) * 90 + 'ms';
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- Máscara simples de telefone (BR) ---- */
  var tel = document.getElementById('telefone');
  if (tel) {
    tel.addEventListener('input', function () {
      var v = tel.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 6) v = '(' + v.slice(0, 2) + ') ' + v.slice(2, 7) + '-' + v.slice(7);
      else if (v.length > 2) v = '(' + v.slice(0, 2) + ') ' + v.slice(2);
      else if (v.length > 0) v = '(' + v;
      tel.value = v;
    });
  }

  /* ---- Validação + envio do formulário ---- */
  var form = document.getElementById('leadForm');
  var msg = document.getElementById('formMsg');

  function setError(field, on) {
    var wrap = field.closest('.field');
    if (wrap) wrap.classList.toggle('invalid', on);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    msg.className = 'form-msg';
    msg.textContent = '';

    var required = form.querySelectorAll('[required]');
    var ok = true;
    required.forEach(function (f) {
      var valid = f.type === 'checkbox' ? f.checked : f.value.trim() !== '';
      if (f.type === 'email') valid = valid && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value);
      if (f.type !== 'checkbox') setError(f, !valid);
      if (!valid) ok = false;
    });

    if (!ok) {
      msg.classList.add('err');
      msg.textContent = 'Por favor, preencha os campos obrigatórios corretamente.';
      return;
    }

    /* TODO: integrar com backend / CRM / e-mail da Ilikia.
       Por enquanto o envio é simulado no front-end. */
    var btn = form.querySelector('button[type="submit"]');
    var original = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Enviando…';

    setTimeout(function () {
      form.reset();
      btn.disabled = false;
      btn.textContent = original;
      msg.classList.add('ok');
      msg.textContent = 'Recebemos seus dados! Em breve a equipe Ilikia entrará em contato. ✦';
    }, 900);
  });

  /* limpa erro ao digitar */
  form.querySelectorAll('input, select, textarea').forEach(function (f) {
    f.addEventListener('input', function () { setError(f, false); });
  });
})();
