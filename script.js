// Resalta el enlace activo al hacer scroll
document.addEventListener("scroll", () => {
  const links = document.querySelectorAll("nav a");
  const scrollPos = window.scrollY + 200;

  links.forEach(link => {
    const section = document.querySelector(link.getAttribute("href"));
    if (section.offsetTop <= scrollPos && (section.offsetTop + section.offsetHeight) > scrollPos) {
      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    }
  });
});
