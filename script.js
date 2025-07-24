// Resalta el enlace activo al hacer scroll
document.addEventListener("scroll", () => {
  const links = document.querySelectorAll("nav a")
  const scrollPos = window.scrollY + 200

  links.forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"))
    if (section && section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
      links.forEach((l) => l.classList.remove("active"))
      link.classList.add("active")
    }
  })

  // Navbar background on scroll
  const navbar = document.querySelector(".navbar")
  if (navbar) {
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)"
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)"
      navbar.style.boxShadow = "none"
    }
  }
})

// Smooth scroll para los enlaces de navegación
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("nav a[href^='#']")

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((n) =>
    n.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    }),
  )
})

// Custom cursor
const cursor = document.querySelector(".cursor")
let mouseX = 0
let mouseY = 0

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
  cursor.style.opacity = "1"
})

function animateCursor() {
  const x = mouseX - cursor.offsetWidth / 2
  const y = mouseY - cursor.offsetHeight / 2

  cursor.style.left = x + "px"
  cursor.style.top = y + "px"

  requestAnimationFrame(animateCursor)
}
animateCursor()

// Hide cursor when leaving window
document.addEventListener("mouseleave", () => {
  cursor.style.opacity = "0"
})

// Active navigation link highlighting
const sections = document.querySelectorAll("section")
const navLinks = document.querySelectorAll(".nav-link")

function updateActiveLink() {
  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
}

window.addEventListener("scroll", updateActiveLink)

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".skill-card, .project-card, .contact-item, .stat-item").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "all 0.6s ease"
  observer.observe(el)
})

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }
  type()
}

// Initialize typing effect when page loads
window.addEventListener("load", () => {
  const heroName = document.querySelector(".hero-name")
  if (heroName) {
    const originalText = heroName.textContent
    typeWriter(heroName, originalText, 80)
  }

  // Add loading animation
  document.body.classList.add("loaded")
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  const rate = scrolled * -0.5

  if (hero) {
    hero.style.transform = `translateY(${rate}px)`
  }
})

// Skill cards hover effect
document.querySelectorAll(".skill-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)"
  })
})

// Project cards tilt effect
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)"
  })
})

// Contact form handling
const contactForm = document.querySelector(".contact-form form")

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(contactForm)
    const name = formData.get("name") || contactForm.querySelector('input[type="text"]').value
    const email = formData.get("email") || contactForm.querySelector('input[type="email"]').value
    const message = formData.get("message") || contactForm.querySelector("textarea").value

    // Simple validation
    if (!name || !email || !message) {
      alert("Por favor, completa todos los campos.")
      return
    }

    // Simulate form submission
    const submitBtn = contactForm.querySelector(".btn-primary")
    const originalText = submitBtn.textContent

    submitBtn.textContent = "Enviando..."
    submitBtn.disabled = true

    setTimeout(() => {
      alert("¡Mensaje enviado correctamente! Te contactaré pronto.")
      contactForm.reset()
      submitBtn.textContent = originalText
      submitBtn.disabled = false
    }, 2000)
  })
}
