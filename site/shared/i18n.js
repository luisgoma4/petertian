/* i18n.js — conmutador PL/EN sin dependencias.
 *
 * Contrato: cualquier elemento con `data-pl` y `data-en` cambia su innerHTML.
 * Para atributos, usa `data-pl-<attr>` / `data-en-<attr>`, p. ej.:
 *
 *   <a data-pl-href="..." data-en-href="...">
 *   <img data-pl-alt="..." data-en-alt="...">
 *
 * Nota: el contenido inyectado con innerHTML procede solo de atributos escritos
 * a mano en el HTML de este repo (nunca de entrada de usuario ni de la red), y se
 * permite HTML para admitir <br> y <span> en los titulares.
 *
 * Regla del proyecto: si un nodo tiene la variante de un idioma, DEBE tener la
 * del otro. `verificar()` lo comprueba en consola durante el desarrollo.
 */
(function () {
  'use strict';

  var CLAVE = 'petertian-lang';
  var IDIOMAS = ['pl', 'en'];
  var patron = /^data-(pl|en)-(.+)$/;

  function idiomaInicial() {
    try {
      var guardado = localStorage.getItem(CLAVE);
      if (IDIOMAS.indexOf(guardado) !== -1) return guardado;
    } catch (e) { /* Safari privado: seguimos con la deteccion */ }

    var navegador = (navigator.languages || [navigator.language || 'en'])[0] || 'en';
    return navegador.toLowerCase().indexOf('pl') === 0 ? 'pl' : 'en';
  }

  function aplicar(lang) {
    var otro = lang === 'pl' ? 'en' : 'pl';

    document.documentElement.lang = lang;
    document.documentElement.setAttribute('data-lang', lang);

    // Texto
    var nodos = document.querySelectorAll('[data-' + lang + ']');
    for (var i = 0; i < nodos.length; i++) {
      nodos[i].innerHTML = nodos[i].getAttribute('data-' + lang);
    }

    // Atributos (href, alt, aria-label, content...)
    var todos = document.querySelectorAll('*');
    for (var j = 0; j < todos.length; j++) {
      var el = todos[j];
      for (var k = 0; k < el.attributes.length; k++) {
        var m = patron.exec(el.attributes[k].name);
        if (m && m[1] === lang) el.setAttribute(m[2], el.attributes[k].value);
      }
    }

    // Botones del selector
    var botones = document.querySelectorAll('[data-lang-set]');
    for (var n = 0; n < botones.length; n++) {
      botones[n].setAttribute(
        'aria-pressed',
        botones[n].getAttribute('data-lang-set') === lang ? 'true' : 'false'
      );
    }

    try { localStorage.setItem(CLAVE, lang); } catch (e) { /* sin persistencia */ }

    return otro;
  }

  function verificar() {
    var huerfanos = [];
    var todos = document.querySelectorAll('*');
    for (var i = 0; i < todos.length; i++) {
      var el = todos[i];
      var vistos = {};
      for (var k = 0; k < el.attributes.length; k++) {
        var nombre = el.attributes[k].name;
        if (nombre === 'data-pl' || nombre === 'data-en') {
          vistos[nombre.slice(5)] = true;
        } else {
          var m = patron.exec(nombre);
          if (m) vistos[m[1] + ':' + m[2]] = true;
        }
      }
      var claves = Object.keys(vistos);
      for (var c = 0; c < claves.length; c++) {
        var par = claves[c].indexOf(':') === -1
          ? (claves[c] === 'pl' ? 'en' : 'pl')
          : (claves[c].slice(0, 2) === 'pl' ? 'en' : 'pl') + claves[c].slice(2);
        if (!vistos[par]) huerfanos.push({ el: el, falta: par });
      }
    }
    if (huerfanos.length) {
      console.warn('[i18n] ' + huerfanos.length + ' nodo(s) sin par de idioma:', huerfanos);
    }
    return huerfanos;
  }

  function iniciar() {
    aplicar(idiomaInicial());

    var botones = document.querySelectorAll('[data-lang-set]');
    for (var i = 0; i < botones.length; i++) {
      botones[i].addEventListener('click', function () {
        aplicar(this.getAttribute('data-lang-set'));
      });
    }

    if (location.hostname === 'localhost' || location.protocol === 'file:') verificar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }

  window.PTi18n = { aplicar: aplicar, verificar: verificar };
})();
