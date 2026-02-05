const translations = [
  'प्लॅन-ओ-मानिया',
  'Plan-O-Mania',
  'प्लान-ओ-मानिया',
  'પ્લાન-ઓ-મેનિયા'
];

let index = 0;
const labels = document.querySelectorAll('.brand-translate');

function rotateBrand() {
  if (!labels.length) {
    return;
  }

  index = (index + 1) % translations.length;
  labels.forEach((label) => {
    label.style.opacity = 0;
  });

  setTimeout(() => {
    labels.forEach((label) => {
      label.textContent = translations[index];
      label.style.opacity = 1;
    });
  }, 300);
}

setInterval(rotateBrand, 2200);

async function loadUpdates() {
  const container = document.getElementById('updates-grid');
  if (!container) {
    return;
  }

  try {
    const response = await fetch('content/updates.json');
    if (!response.ok) {
      return;
    }
    const data = await response.json();
    container.innerHTML = '';
    (data.items || []).forEach((item) => {
      const card = document.createElement('article');
      card.className = 'update-card';
      const imageMarkup = item.image
        ? `<img src="${item.image}" alt="${item.title}" />`
        : '';
      card.innerHTML = `
        ${imageMarkup}
        <div class="update-body">
          <p class="update-date">${item.date || ''}</p>
          <h3>${item.title || ''}</h3>
          <p>${item.summary || ''}</p>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    // no-op
  }
}

async function loadGallery(name) {
  const container = document.querySelector(`[data-gallery=\"${name}\"]`);
  if (!container) {
    return;
  }

  try {
    const response = await fetch(`content/galleries/${name}.json`);
    if (!response.ok) {
      return;
    }
    const data = await response.json();
    container.innerHTML = '';
    (data.images || []).forEach((image) => {
      const img = document.createElement('img');
      img.src = image.src;
      img.alt = image.alt || '';
      container.appendChild(img);
    });
  } catch (error) {
    // no-op
  }
}

loadUpdates();
['corporate', 'social', 'festive', 'vidhi'].forEach((name) => loadGallery(name));
