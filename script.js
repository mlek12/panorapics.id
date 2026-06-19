const themeBtn = document.querySelector('[data-theme-toggle]');
const root = document.documentElement;

let theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
root.setAttribute('data-theme', theme);
themeBtn.textContent = theme === 'dark' ? 'Light' : 'Dark';

themeBtn.addEventListener('click', () => {
  theme = theme === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', theme);
  themeBtn.textContent = theme === 'dark' ? 'Light' : 'Dark';
});

const packages = { 400000: 'Photo Only Short Time', 750000: 'Photo Only Midtime', 1300000: 'Photo Only Halftime', 1950000: 'Photo Only Fulltime',700000: 'PKG Shorttime', 1300000: 'PKG Midtime', 2200000: 'PKG Halftime', 3400000: 'PKG Fulltime' };
const serviceSelect = document.getElementById('layanan');
const dpSelect = document.getElementById('dp');
const sumPaket = document.getElementById('sumPaket');
const sumTotal = document.getElementById('sumTotal');
const sumDpPercent = document.getElementById('sumDpPercent');
const sumDpNominal = document.getElementById('sumDpNominal');
const sumSisa = document.getElementById('sumSisa');
const form = document.getElementById('simForm');
const modal = document.getElementById('waModal');
const waLink = document.getElementById('waLink');
const waSummary = document.getElementById('waSummary');
const closeModal = document.getElementById('closeModal');

const galleryData = {
  wedding: {
    title: 'Engagement, Wedding & Prewedding Story',
    images: [
      'wedding2.jpg',
      'wedding3.jpg',
      'wedding4.jpg',
      'wedding5.jpg',
      'wedding6.jpg',
      'wedding7.jpg'
    ]
  },
  corporate: {
    title: 'Graduation',
    images: [
      'grad2.jpg',
      'grad3.jpg',
      'grad4.jpg',
      'grad5.jpg',
      'grad6.jpg',
      'grad7.jpg'
    ]
  },
  product: {
    title: 'Corporate & Personal Event',
    images: [
      'e2.jpg',
      'e3.jpg',
      'e4.jpg',
      'e5.jpg',
      'e6.jpg',
      'e7.jpg'
    ]
  }
};

const galleryModal = document.getElementById('galleryModal');
const galleryGrid = document.getElementById('galleryGrid');
const galleryTitle = document.getElementById('galleryTitle');
const closeGallery = document.getElementById('closeGallery');

const formatRupiah = num =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(num);

function updateSummary() {
  const total = Number(serviceSelect.value);
  const dp = Number(dpSelect.value);
  const nominalDp = Math.round((total * dp) / 100);
  const sisa = total - nominalDp;

  sumPaket.textContent = packages[total];
  sumTotal.textContent = formatRupiah(total);
  sumDpPercent.textContent = `${dp}%`;
  sumDpNominal.textContent = formatRupiah(nominalDp);
  sumSisa.textContent = formatRupiah(sisa);

  return { total, dp, nominalDp, sisa };
}

serviceSelect.addEventListener('change', updateSummary);
dpSelect.addEventListener('change', updateSummary);
updateSummary();

form.addEventListener('submit', e => {
  e.preventDefault();
  const nama = document.getElementById('nama').value.trim();
  const tanggal = document.getElementById('tanggal').value;
  const { total, dp, nominalDp, sisa } = updateSummary();

  const message = `Halo Panorapics, saya ${nama}. Saya tertarik dengan paket ${packages[total]} dengan total ${formatRupiah(total)}. Saya memilih DP ${dp}% senilai ${formatRupiah(nominalDp)} dan sisa pelunasan ${formatRupiah(sisa)}. Tanggal acara: ${tanggal}.`;
  const url = `https://wa.me/6285121335135?text=${encodeURIComponent(message)}`;

  waLink.href = url;
  waSummary.textContent = `Paket ${packages[total]} • Total ${formatRupiah(total)} • DP ${dp}% ${formatRupiah(nominalDp)}.`;

  if (typeof modal.showModal === 'function') modal.showModal();
  else window.open(url, '_blank', 'noopener');
});

closeModal.addEventListener('click', () => modal.close());

modal.addEventListener('click', e => {
  const rect = modal.getBoundingClientRect();
  const inside = rect.top <= e.clientY && e.clientY <= rect.top + rect.height && rect.left <= e.clientX && e.clientX <= rect.left + rect.width;
  if (!inside) modal.close();
});

document.querySelectorAll('[data-gallery]').forEach(card => {
  card.addEventListener('click', () => {
    const key = card.dataset.gallery;
    const data = galleryData[key];
    galleryTitle.textContent = data.title;
    galleryGrid.innerHTML = data.images.map(src => `<img src="${src}" alt="${data.title}" loading="lazy">`).join('');
    if (typeof galleryModal.showModal === 'function') galleryModal.showModal();
    else alert(data.title);
  });
});

closeGallery.addEventListener('click', () => galleryModal.close());

galleryModal.addEventListener('click', e => {
  const rect = galleryModal.getBoundingClientRect();
  const inside = rect.top <= e.clientY && e.clientY <= rect.top + rect.height && rect.left <= e.clientX && e.clientX <= rect.left + rect.width;
  if (!inside) galleryModal.close();
});
const menuToggle = document.getElementById("menuToggle");
const menuClose = document.getElementById("menuClose");
const mobileNav = document.getElementById("mobileNav");

function openMenu() {
  mobileNav.classList.add("is-open");
  menuToggle.setAttribute("aria-expanded", "true");

}

function closeMenu() {
  mobileNav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");

}

if (menuToggle && menuClose && mobileNav) {
  menuToggle.addEventListener("click", openMenu);
  menuClose.addEventListener("click", closeMenu);

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", function (e) {
    const clickedInsideNav = mobileNav.contains(e.target);
    const clickedToggle = menuToggle.contains(e.target);

    if (mobileNav.classList.contains("is-open") && !clickedInsideNav && !clickedToggle) {
      closeMenu();
    }
  });
}

