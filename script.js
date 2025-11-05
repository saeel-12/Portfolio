// Smooth scroll animation observer
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, observerOptions);

document.querySelectorAll(".section-reveal").forEach((el) => {
  observer.observe(el);
});

// Card animation observer
const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0) scale(1)";
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  }
);

document.querySelectorAll(".card").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(80px) scale(0.95)";
  el.style.transition = "all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
  cardObserver.observe(el);
});

// Parallax effect on mouse move
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX / window.innerWidth - 0.5;
  mouseY = e.clientY / window.innerHeight - 0.5;
});

function animate() {
  currentX += (mouseX - currentX) * 0.1;
  currentY += (mouseY - currentY) * 0.1;

  const parallaxElements = document.querySelectorAll(".float");
  parallaxElements.forEach((el, index) => {
    const speed = (index + 1) * 20;
    const x = currentX * speed;
    const y = currentY * speed;
    el.style.transform = `translate(${x}px, ${y}px)`;
  });

  requestAnimationFrame(animate);
}
animate();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add 3D tilt effect to cards
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.03)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

// title settings
const defaultIcon = "./assets/user-round-check.svg";
console.log(defaultIcon);

// Ensure you place a file named 'sleep.ico' in your 'public' folder
const hiddenIcon = "./assets/handshake.svg";
let titleElement = document.querySelector("title");

// Function to change favicon
function changeFavicon(iconURL) {
  let link = document.querySelector("link[rel~='icon']");

  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }

  link.href = iconURL;
}

// Function to fade title
function fadeTitle(text) {
  if (titleElement) {
    titleElement.classList.remove("fade-title");
    // Trigger reflow to restart animation (hacky, but works)
    void titleElement.offsetWidth;
    titleElement.textContent = text;
    titleElement.classList.add("fade-title");
  }
}

// Detect tab visibility change and handle icon/title updates
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    changeFavicon(hiddenIcon);
    fadeTitle("👀 Come Back Soon!");
  } else {
    changeFavicon(defaultIcon);
    fadeTitle("Welcome Back! 😄");
  }
});

// Initialize with default values just in case
changeFavicon(defaultIcon);
