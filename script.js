/* Mareazul 434 Sur — script.js */
(function () {
  var root = document.documentElement;
  var desc = document.querySelector('meta[name="description"]');

  var TITLES = {
    en: 'Mareazul 434 Sur | Ocean-view penthouse in Playa del Carmen',
    es: 'Mareazul 434 Sur | Penthouse con vista al mar en Playa del Carmen'
  };
  var DESCS = {
    en: 'Mareazul 434 Sur: a high-end penthouse with ocean views, beachfront access and a private rooftop jacuzzi, in a gated resort community in Playa del Carmen, Riviera Maya.',
    es: 'Mareazul 434 Sur: penthouse de alto nivel con vista al mar, acceso a la playa y jacuzzi privado en la azotea, en una comunidad cerrada tipo resort en Playa del Carmen, Riviera Maya.'
  };

  function setLang(lang) {
    if (lang !== 'en' && lang !== 'es') lang = 'en';
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang);
    document.title = TITLES[lang];
    if (desc) desc.setAttribute('content', DESCS[lang]);
    var buttons = document.querySelectorAll('[data-set-lang]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-pressed', String(buttons[i].getAttribute('data-set-lang') === lang));
    }
    var imgs = document.querySelectorAll('img[data-alt-en]');
    for (var j = 0; j < imgs.length; j++) {
      imgs[j].setAttribute('alt', imgs[j].getAttribute('data-alt-' + lang) || '');
    }
    try { localStorage.setItem('mz-lang', lang); } catch (e) {}
  }

  // English is the main language. ?lang=es opens the Spanish version directly.
  var initial = 'en';
  try {
    var q = new URLSearchParams(window.location.search).get('lang');
    if (q === 'es' || q === 'en') initial = q;
    else initial = localStorage.getItem('mz-lang') || 'en';
  } catch (e) {}
  setLang(initial);

  document.addEventListener('click', function (ev) {
    var btn = ev.target.closest && ev.target.closest('[data-set-lang]');
    if (btn) setLang(btn.getAttribute('data-set-lang'));
  });

  // Header turns solid after the hero
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-solid', window.scrollY > 60);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
