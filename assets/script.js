'use strict';
const config = window.MEGA_CONFIG;
const waUrl = message => `https://wa.me/${config.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
document.querySelectorAll('[data-wa]').forEach(link => { link.href = waUrl(config.mensagem); link.target = '_blank'; link.rel = 'noopener'; });
document.querySelectorAll('[data-phone]').forEach(el => el.textContent = config.telefoneExibicao);
const menu = document.querySelector('.menu');
const nav = document.querySelector('#menu-principal');
if (menu && nav) {
  const setMenuOpen = open => {
    nav.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  };
  menu.addEventListener('click', event => {
    event.preventDefault();
    setMenuOpen(menu.getAttribute('aria-expanded') !== 'true');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') setMenuOpen(false);
  });
  document.addEventListener('click', event => {
    if (nav.classList.contains('open') && !nav.contains(event.target) && !menu.contains(event.target)) setMenuOpen(false);
  });
}
const form = document.querySelector('#quote');
document.querySelectorAll('[data-service]').forEach(a => a.addEventListener('click', () => { form.elements.assunto.value = a.dataset.service; }));
form.addEventListener('submit', event => { event.preventDefault(); if (!form.reportValidity()) return; const data = new FormData(form); const phone = String(data.get('telefone')).replace(/\D/g,''); if (phone.length < 10 || phone.length > 13) { form.elements.telefone.setCustomValidity('Informe um telefone com DDD válido.'); form.elements.telefone.reportValidity(); return; } const message = `Olá! Vim pelo site da Mega Vidros.\n\nNome: ${String(data.get('nome')).trim()}\nTelefone: ${data.get('telefone')}\nServiço: ${data.get('assunto')}\n\n${String(data.get('mensagem')).trim()}`; const opened = window.open(waUrl(message), '_blank', 'noopener'); });
form.elements.telefone.addEventListener('input', () => form.elements.telefone.setCustomValidity(''));
const box = document.querySelector('#lightbox'), large = document.querySelector('#large-photo');
function showPhoto(button) { large.src = button.dataset.photo; large.alt = button.querySelector('img').alt; document.querySelector('#photo-caption').textContent = large.alt + ' — imagem ilustrativa'; box.showModal(); }
document.querySelectorAll('[data-photo]').forEach(button => button.addEventListener('click', () => showPhoto(button)));

document.querySelector('#close-photo').addEventListener('click', () => box.close());
box.addEventListener('click', event => { if (event.target === box) { const rect = box.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) box.close(); } });
