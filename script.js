const giftBox = document.getElementById('giftBox');
const openGift = document.getElementById('openGift');
const surpriseBox = document.getElementById('surpriseBox');
const card = document.querySelector('.gift-card');
const message = document.querySelector('.message');
const defaultMessage = message ? message.innerHTML : '';

let pointerX = 0;
let pointerY = 0;

function revealGift() {
  const isOpen = surpriseBox.classList.toggle('show');
  giftBox.classList.toggle('opened', isOpen);
  openGift.textContent = isOpen ? 'Hide the surprise' : 'Open your surprise';

  if (isOpen) {
    burstConfetti(18);
    if (message && defaultMessage) {
      message.innerHTML = defaultMessage;
    }
  }
}

giftBox.addEventListener('click', revealGift);
openGift.addEventListener('click', revealGift);

const emojis = ['🎉', '✨', '💫', '🎂', '💖', '🌸'];

function burstConfetti(count = 14) {
  for (let i = 0; i < count; i++) {
    const spark = document.createElement('div');
    spark.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    spark.style.position = 'fixed';
    spark.style.left = `${Math.random() * window.innerWidth}px`;
    spark.style.top = `${Math.random() * window.innerHeight}px`;
    spark.style.fontSize = `${14 + Math.random() * 18}px`;
    spark.style.pointerEvents = 'none';
    spark.style.zIndex = '999';
    spark.style.animation = 'floatUp 2.8s ease-out forwards';
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 2800);
  }
}

document.addEventListener('mousemove', (event) => {
  pointerX = (event.clientX / window.innerWidth - 0.5) * 14;
  pointerY = (event.clientY / window.innerHeight - 0.5) * -14;
  card.style.transform = `rotateX(${pointerY}deg) rotateY(${pointerX}deg) translateZ(0)`;
});

document.addEventListener('mouseleave', () => {
  card.style.transform = 'rotateX(0deg) rotateY(0deg)';
});

setInterval(() => burstConfetti(6), 1200);

const style = document.createElement('style');
style.textContent = `
  @keyframes floatUp {
    from { transform: translateY(0) scale(1); opacity: 1; }
    to { transform: translateY(-170px) scale(1.45); opacity: 0; }
  }
`;
document.head.appendChild(style);
