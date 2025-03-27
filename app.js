const gallery = document.querySelector('.gallery');
const track = document.querySelector('.gallery-track');
const cards = document.querySelectorAll('.card');
const easing = 0.05;
let startY = 0;
let endY = 0;
let raf = null;

const lerp = (start, end, t) => start * (1 - t) + end * t;

function updateScroll() {
  startY = lerp(startY, endY, easing);
  gallery.style.height = `${track.clientHeight}px`;
  track.style.transform = `translateY(-${startY}px)`;
  activateParallax();

  if (Math.abs(startY - window.scrollY) < 0.1) {
    cancelAnimationFrame(raf);
    raf = null;
  } else {
    raf = requestAnimationFrame(updateScroll);
  }
}

function startScroll() {
  endY = window.scrollY;
  if (!raf) raf = requestAnimationFrame(updateScroll);
}

function parallax(card) {
  const wrapper = card.querySelector('.card-image-wrapper');
  const diff = card.offsetHeight - wrapper.offsetHeight;
  const { top } = card.getBoundingClientRect();
  const progress = top / window.innerHeight;
  const yPos = diff * progress;
  wrapper.style.transform = `translateY(${yPos}px)`;
}

const activateParallax = () => cards.forEach(parallax);

function init() {
  activateParallax();
  startScroll();
}

// Улучшенные обработчики событий
window.addEventListener('load', updateScroll, false);
window.addEventListener('scroll', startScroll, false);
window.addEventListener('resize', () => {
  updateScroll();
  activateParallax();
}, false);

// Улучшенное увеличение при клике на изображения
document.querySelectorAll('.card-image-wrapper img').forEach(img => {
  img.addEventListener('mousedown', () => {
    img.style.transform = 'scale(1.2)';
  });

  img.addEventListener('mouseup', () => {
    img.style.transform = 'scale(1)';
  });

  img.addEventListener('mouseleave', () => {
    img.style.transform = 'scale(1)';
  });
});


// Запрещает перетягивать изображения

document.querySelectorAll('.card-image-wrapper img').forEach(img => {
  img.setAttribute('draggable', 'false');
});





// Открывает изображение в попапе

document.querySelectorAll('.card-image-wrapper img').forEach(img => {
  img.addEventListener('click', () => {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '1000';

    const largeImg = document.createElement('img');
    largeImg.src = img.src;
    largeImg.style.maxWidth = '78%';
    largeImg.style.maxHeight = '78%';
    largeImg.style.borderRadius = '10px';
    largeImg.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    largeImg.style.transition = 'transform 0.3s ease-in-out';
    largeImg.style.cursor = 'pointer';

    overlay.appendChild(largeImg);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', () => {
      overlay.remove();
    });
  });
});


// Плавно убирает меню

let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  let currentScroll = window.scrollY;

  if (currentScroll > lastScroll) {
    // Скроллим вниз — прячем меню
    nav.style.transform = 'translateY(-100%)';
  } else {
    // Скроллим вверх — плавно возвращаем меню
    nav.style.transform = 'translateY(0)';
  }

  lastScroll = currentScroll;
});

// Добавляем плавный переход в CSS
nav.style.transition = 'transform 0.4s ease-in-out';







document.querySelectorAll('.card-image-wrapper img').forEach(img => {
  img.addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();

    const rect = this.getBoundingClientRect(); // Получаем позицию картинки
    const zoomedImg = this.cloneNode();
    
    zoomedImg.classList.add('zoomed');
    zoomedImg.style.position = 'fixed';
    zoomedImg.style.top = `${rect.top}px`;
    zoomedImg.style.left = `${rect.left}px`;
    zoomedImg.style.width = `${rect.width}px`;
    zoomedImg.style.height = `${rect.height}px`;
    zoomedImg.style.transform = 'none';
    zoomedImg.style.transition = 'all 0.5s cubic-bezier(0.3, 1.5, 0.3, 1)';
    zoomedImg.style.zIndex = '1000';
    zoomedImg.style.objectFit = 'cover';

    document.body.appendChild(zoomedImg);

    // Плавно увеличиваем изображение в центр экрана
    setTimeout(() => {
      zoomedImg.style.top = '50%';
      zoomedImg.style.left = '50%';
      zoomedImg.style.width = '80vw';
      zoomedImg.style.height = '80vh';
      zoomedImg.style.transform = 'translate(-50%, -50%)';
    }, 10);

    // Закрытие при клике
    zoomedImg.addEventListener('click', () => {
      zoomedImg.style.top = `${rect.top}px`;
      zoomedImg.style.left = `${rect.left}px`;
      zoomedImg.style.width = `${rect.width}px`;
      zoomedImg.style.height = `${rect.height}px`;
      zoomedImg.style.transform = 'none';

      setTimeout(() => zoomedImg.remove(), 500);
    });
  });
});
