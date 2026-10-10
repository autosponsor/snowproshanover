import './styles.css';

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

function reportError(category, context = {}) {
  // Deliberately do not accept or serialize form values, addresses, names, or phone numbers.
  if (import.meta.env.DEV) console.warn(`[Snow Pros] ${category}`, context);
}

function installGlobalErrorHandlers() {
  if (window.__snowProsErrorHandlersInstalled) return () => {};
  window.__snowProsErrorHandlersInstalled = true;
  const onError = () => reportError('uncaught_browser_error');
  const onRejection = () => reportError('unhandled_promise_rejection');
  window.addEventListener('error', onError);
  window.addEventListener('unhandledrejection', onRejection);
  return () => {
    window.removeEventListener('error', onError);
    window.removeEventListener('unhandledrejection', onRejection);
    window.__snowProsErrorHandlersInstalled = false;
  };
}

let weatherPromise;
async function getWeather() {
  if (!weatherPromise) {
    const city = encodeURIComponent('Hanover,CA');
    weatherPromise = Promise.all([
      fetch(`/.netlify/functions/weather?city=${city}`).then((response) => {
        if (!response.ok) throw new Error(`current_weather_${response.status}`);
        return response.json();
      }),
      fetch(`/.netlify/functions/weather?city=${city}&forecast=true`).then((response) => {
        if (!response.ok) throw new Error(`forecast_weather_${response.status}`);
        return response.json();
      }),
    ]).then(([current, forecast]) => ({ current, forecast })).catch((error) => {
      weatherPromise = undefined;
      throw error;
    });
  }
  return weatherPromise;
}

function formatDay(timestamp, index) {
  if (index === 0) return 'Tomorrow';
  return new Intl.DateTimeFormat('en-CA', { weekday: 'short' }).format(new Date(timestamp * 1000));
}

function initWeather() {
  const currentNode = $('[data-weather-current]');
  const conditionNode = $('[data-weather-condition]');
  const forecastNode = $('[data-weather-forecast]');
  const fallbackNode = $('[data-weather-fallback]');
  const alertNode = $('[data-weather-alert]');

  getWeather().then(({ current, forecast }) => {
    const temperature = current?.main?.temp;
    const condition = current?.weather?.[0]?.main || 'Current conditions';
    if (typeof temperature !== 'number') throw new Error('invalid_weather_payload');
    currentNode.textContent = `${Math.round(temperature)}°C`;
    conditionNode.textContent = condition;
    const entries = forecast?.list || [];
    forecastNode.innerHTML = [7, 15, 23].map((position, index) => {
      const entry = entries[position] || entries.at(-1);
      if (!entry?.main?.temp) return '';
      return `<div class="weather-day"><span>${formatDay(entry.dt, index)}</span><strong>${Math.round(entry.main.temp)}°</strong></div>`;
    }).join('');
    if (temperature <= 0) alertNode.classList.remove('hidden');
  }).catch((error) => {
    reportError('weather_unavailable', { code: error instanceof Error ? error.message : 'unknown' });
    conditionNode.textContent = 'Service information';
    fallbackNode.classList.remove('hidden');
    forecastNode.innerHTML = '';
  });
}

function initMenu() {
  const toggle = $('[data-menu-toggle]');
  const menu = $('[data-mobile-menu]');
  if (!toggle || !menu) return;
  const close = () => { toggle.setAttribute('aria-expanded', 'false'); menu.hidden = true; };
  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    menu.hidden = isOpen;
  });
  $$('a', menu).forEach((link) => link.addEventListener('click', close));
}

function initGallery() {
  const dialog = $('[data-gallery-dialog]');
  const image = $('[data-gallery-image]');
  const caption = $('[data-gallery-caption]');
  if (!dialog || !image || !caption) return;
  $$('[data-gallery]').forEach((button) => button.addEventListener('click', () => {
    image.src = button.dataset.image;
    image.alt = button.querySelector('img')?.alt || '';
    caption.textContent = button.dataset.caption || '';
    dialog.showModal();
  }));
  $('[data-gallery-close]')?.addEventListener('click', () => dialog.close());
}

function initDialogs() {
  $$('[data-dialog-open]').forEach((button) => button.addEventListener('click', () => {
    const dialog = $(`[data-dialog="${button.dataset.dialogOpen}"]`);
    dialog?.showModal();
  }));
  $$('[data-dialog-close]').forEach((button) => button.addEventListener('click', () => button.closest('dialog')?.close()));
}

function initConsent() {
  const banner = $('[data-consent]');
  if (!banner) return;
  if (!localStorage.getItem('snow-pros-consent')) banner.hidden = false;
  $$('[data-consent-choice]', banner).forEach((button) => button.addEventListener('click', () => {
    localStorage.setItem('snow-pros-consent', button.dataset.consentChoice || 'declined');
    banner.hidden = true;
  }));
}

function initContactForm() {
  const form = $('#quote-form');
  const status = $('#form-status');
  if (!form || !status) return;
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const formData = new FormData(form);
    if (String(formData.get('bot-field') || '').trim()) return;
    const submit = $('button[type="submit"]', form);
    submit.disabled = true;
    submit.textContent = 'Sending request…';
    status.className = 'mt-5 rounded-lg bg-white/10 px-4 py-3 text-sm text-white';
    status.textContent = 'Sending your request…';
    try {
      const response = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(formData).toString() });
      if (!response.ok) throw new Error(`form_status_${response.status}`);
      form.reset();
      status.className = 'mt-5 rounded-lg bg-emerald-500/20 px-4 py-3 text-sm text-emerald-100';
      status.textContent = 'Request received. The team will be in touch soon.';
    } catch (error) {
      reportError('contact_submission_failed', { status: error instanceof Error ? error.message : 'unknown' });
      status.className = 'mt-5 rounded-lg bg-red-500/20 px-4 py-3 text-sm text-red-100';
      status.textContent = 'We could not send that request. Please call (647) 450-0225 for immediate service.';
    } finally {
      submit.disabled = false;
      submit.innerHTML = 'Confirm quote request <span aria-hidden="true">→</span>';
    }
  });
}

function initScrollUI() {
  const header = $('[data-header]');
  const backToTop = $('[data-back-to-top]');
  const setHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
  window.addEventListener('scroll', setHeader, { passive: true });
  setHeader();
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

const uninstallGlobalHandlers = installGlobalErrorHandlers();
window.addEventListener('pagehide', uninstallGlobalHandlers, { once: true });
initMenu();
initGallery();
initDialogs();
initConsent();
initContactForm();
initScrollUI();
initWeather();
