/* Alves Cunha Advocacia — comportamento e rastreamento */
window.dataLayer = window.dataLayer || [];
(function () {
  var GADS = { id: 'AW-17938110769', label: 'qHL2CIr2u58cELGyx-lC' };
  window.acTrack = function (origem) {
    var w = window;
    if (typeof w.gtag === 'function') {
      w.gtag('event', 'clique_whatsapp', {
        event_category: 'contato', event_label: origem, origem: origem, transport_type: 'beacon'
      });
      w.gtag('event', 'conversion', { send_to: GADS.id + '/' + GADS.label, event_callback: function () {} });
    }
    w.dataLayer.push({ event: 'clique_whatsapp', origem: origem });
    if (typeof w.fbq === 'function') w.fbq('track', 'Contact', { source: origem });
    return true;
  };
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function () {
    var btn = document.getElementById('areasBtn');
    var menu = document.getElementById('areasMenu');
    if (btn && menu) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = menu.style.display === 'block';
        menu.style.display = open ? 'none' : 'block';
        btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      });
      document.addEventListener('click', function () {
        menu.style.display = 'none';
        btn.setAttribute('aria-expanded', 'false');
      });
    }
    var track = document.getElementById('pubTrack');
    if (track) {
      var dots = [].slice.call(document.querySelectorAll('#pubDots button'));
      var max = dots.length - 1, i = 0;
      function step() {
        var cards = track.children;
        if (cards.length < 2) return 364;
        return cards[1].getBoundingClientRect().left - cards[0].getBoundingClientRect().left;
      }
      function paint() {
        track.style.transform = 'translateX(' + (-i * step()) + 'px)';
        dots.forEach(function (d, n) {
          d.style.background = n === i ? '#F7F5F1' : 'rgba(247,245,241,.3)';
        });
      }
      dots.forEach(function (d) {
        d.addEventListener('click', function () { i = +d.getAttribute('data-i'); paint(); });
      });
      var prev = document.getElementById('pubPrev'), next = document.getElementById('pubNext');
      if (prev) prev.addEventListener('click', function () { i = i <= 0 ? max : i - 1; paint(); });
      if (next) next.addEventListener('click', function () { i = i >= max ? 0 : i + 1; paint(); });
      window.addEventListener('resize', paint);
      paint();
    }
  });
})();
