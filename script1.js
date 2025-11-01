// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
    }
  });
}, observerOptions);

// Observe all animated elements
document
  .querySelectorAll(
    ".animate-fadeInUp, .animate-fadeInDown, .animate-slideInLeft, .animate-slideInRight"
  )
  .forEach((el) => {
    observer.observe(el);
  });

// Smooth scroll for navigation links
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

// Mobile menu toggle
const menuButton = document.querySelector(".md\\:hidden");
const mobileMenu = document.createElement("div");
mobileMenu.className =
  "md:hidden bg-white shadow-lg absolute top-16 left-0 right-0 hidden";
mobileMenu.innerHTML = `
            <div class="px-4 py-4 space-y-3">
                <a href="#home" class="block text-gray-700 hover:text-indigo-600 transition">Home</a>
                <a href="#about" class="block text-gray-700 hover:text-indigo-600 transition">About</a>
                <a href="#skills" class="block text-gray-700 hover:text-indigo-600 transition">Skills</a>
                <a href="#projects" class="block text-gray-700 hover:text-indigo-600 transition">Projects</a>
                <a href="#contact" class="block text-gray-700 hover:text-indigo-600 transition">Contact</a>
            </div>
        `;

menuButton.parentElement.appendChild(mobileMenu);

menuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Close mobile menu when clicking on a link
mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
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
