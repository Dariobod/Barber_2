const menu = document.querySelector('.menu');
const nav = document.querySelector('#nav');
function closeMenu() { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }
menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); });
nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menu.focus(); } });
document.querySelectorAll('[data-booking]').forEach(button => button.addEventListener('click', () => {
  document.querySelector('#booking-calendar').src = button.dataset.booking;
  document.querySelector('#reservar').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  document.querySelector('#booking-calendar').focus({ preventScroll: true });
}));
document.querySelector('#year').textContent = new Date().getFullYear();
const header = document.querySelector('header');
let previousScroll = window.scrollY;
window.addEventListener('scroll', () => {
  const currentScroll = Math.max(0, window.scrollY);
  const difference = currentScroll - previousScroll;
  if (currentScroll <= header.offsetHeight) {
    header.classList.remove('header-hidden');
  } else if (Math.abs(difference) >= 8) {
    const hide = difference > 0 && !header.contains(document.activeElement);
    header.classList.toggle('header-hidden', hide);
    if (hide) closeMenu();
  } else {
    return;
  }
  previousScroll = currentScroll;
}, { passive: true });
header.addEventListener('focusin', () => header.classList.remove('header-hidden'));

const videoTrack = document.querySelector('.carousel-track');
const videoCards = [...videoTrack.querySelectorAll('.video-card')];
const previousVideo = document.querySelector('.carousel-prev');
const nextVideo = document.querySelector('.carousel-next');
const videoCounter = document.querySelector('.carousel-count');
function currentVideo() {
  return videoCards.reduce((closest, card, index) =>
    Math.abs(card.offsetLeft - videoCards[0].offsetLeft - videoTrack.scrollLeft) <
    Math.abs(videoCards[closest].offsetLeft - videoCards[0].offsetLeft - videoTrack.scrollLeft) ? index : closest, 0);
}
function updateCarousel() {
  videoCounter.textContent = String(currentVideo() + 1).padStart(2, '0') + ' / 05';
  previousVideo.disabled = videoTrack.scrollLeft <= 2;
  nextVideo.disabled = videoTrack.scrollLeft >= videoTrack.scrollWidth - videoTrack.clientWidth - 2;
}
function moveVideo(direction) {
  const index = Math.max(0, Math.min(videoCards.length - 1, currentVideo() + direction));
  videoTrack.scrollTo({left: videoCards[index].offsetLeft - videoCards[0].offsetLeft,
    behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
}
previousVideo.addEventListener('click', () => moveVideo(-1));
nextVideo.addEventListener('click', () => moveVideo(1));
videoTrack.addEventListener('keydown', event => {
  if (event.target !== videoTrack || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
  event.preventDefault(); moveVideo(event.key === 'ArrowRight' ? 1 : -1);
});
videoTrack.addEventListener('scroll', updateCarousel, {passive:true});
new ResizeObserver(updateCarousel).observe(videoTrack);
const videoVisibility = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (!entry.isIntersecting) entry.target.pause(); });
}, {threshold:0.25});
videoCards.forEach(card => {
  const video = card.querySelector('video');
  videoVisibility.observe(video);
  video.addEventListener('play', () => videoCards.forEach(other => {
    if (other !== card) other.querySelector('video').pause();
  }));
});
updateCarousel();

videoCards.forEach((card, index) => {
  const video = card.querySelector('video');
  const toggle = card.querySelector('.video-toggle');
  const icon = toggle.querySelector('.video-toggle-icon');
  function updatePlayback() {
    const playing = !video.paused && !video.ended;
    toggle.setAttribute('aria-pressed', String(playing));
    toggle.setAttribute('aria-label', (playing ? 'Pausar' : 'Reproducir') + ' video ' + (index + 1));
    icon.textContent = playing ? 'Ⅱ' : '▶';
  }
  toggle.addEventListener('click', async () => {
    if (!video.paused) { video.pause(); return; }
    try { await video.play(); } catch { updatePlayback(); }
  });
  ['play', 'pause', 'ended', 'error'].forEach(event => video.addEventListener(event, updatePlayback));
  updatePlayback();
});

videoCards.forEach(card => {
  const video = card.querySelector('video');
  const frame = card.querySelector('.video-frame');
  video.addEventListener('play', () => frame.classList.add('has-started'));
  video.addEventListener('ended', () => frame.classList.remove('has-started'));
});
