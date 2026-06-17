/*
   Hasoon Logistics - Core JS Refactored
   Implements smooth-scroll layout trackers, Rive initializers, and privacy dialogs.
*/

document.addEventListener("DOMContentLoaded", () => {
  // 1. Header shrink on scroll
  const header = document.querySelector("header");
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", handleScroll);
  handleScroll();

  // 2. Mobile Menu Controller
  const mobileToggle = document.querySelector(".mobile-nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navSocials = document.querySelector(".nav-socials");
  
  if (mobileToggle) {
    const mobileMenu = document.createElement("div");
    mobileMenu.style.cssText = `
      position: fixed;
      top: 0;
      right: -100%;
      width: 80%;
      max-width: 300px;
      height: 100vh;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(25px);
      border-left: 1px solid var(--color-border-glass);
      z-index: 1050;
      padding: 6rem 2rem;
      display: flex;
      flex-direction: column;
      gap: 3rem;
      transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: -10px 0 30px rgba(31, 42, 68, 0.05);
    `;
    
    const linksCopy = navLinks.cloneNode(true);
    linksCopy.style.display = "flex";
    linksCopy.style.flexDirection = "column";
    linksCopy.style.alignItems = "stretch";
    linksCopy.style.gap = "1.5rem";
    
    // Smooth scroll for copied links
    linksCopy.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", (e) => {
        closeMenu();
      });
    });

    const socialsCopy = navSocials.cloneNode(true);
    socialsCopy.style.display = "flex";
    
    mobileMenu.appendChild(linksCopy);
    mobileMenu.appendChild(socialsCopy);
    document.body.appendChild(mobileMenu);
    
    const overlay = document.createElement("div");
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(31, 42, 68, 0.2);
      backdrop-filter: blur(4px);
      z-index: 1040;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.4s ease;
    `;
    document.body.appendChild(overlay);

    let isOpen = false;
    const openMenu = () => {
      isOpen = true;
      mobileMenu.style.right = "0";
      overlay.style.opacity = "1";
      overlay.style.pointerEvents = "all";
      document.body.style.overflow = "hidden";
      mobileToggle.children[0].style.transform = "rotate(45deg) translate(4px, 4px)";
      mobileToggle.children[1].style.opacity = "0";
      mobileToggle.children[2].style.transform = "rotate(-45deg) translate(4px, -4px)";
    };

    const closeMenu = () => {
      isOpen = false;
      mobileMenu.style.right = "-100%";
      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "none";
      document.body.style.overflow = "auto";
      mobileToggle.children[0].style.transform = "none";
      mobileToggle.children[1].style.opacity = "1";
      mobileToggle.children[2].style.transform = "none";
    };

    mobileToggle.addEventListener("click", () => isOpen ? closeMenu() : openMenu());
    overlay.addEventListener("click", closeMenu);
  }

  // 2.5. Navbar 3D Button Tilt Tracker
  const navLinksList = document.querySelectorAll(".nav-links a");
  navLinksList.forEach(link => {
    link.addEventListener("mousemove", (e) => {
      const rect = link.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      
      // Calculate rotation angles (max 15 degrees tilt)
      const rotateX = ((yc - y) / yc) * 15; 
      const rotateY = ((x - xc) / xc) * 15; 
      
      link.style.setProperty("--rx", `${rotateX}deg`);
      link.style.setProperty("--ry", `${rotateY}deg`);
    });
    
    link.addEventListener("mouseleave", () => {
      // Reset rotation smoothly
      link.style.setProperty("--rx", `0deg`);
      link.style.setProperty("--ry", `0deg`);
    });
  });

  // 3. Rive 2D Animation Initializer
  const initRive = () => {
    const canvas = document.getElementById("rive-canvas");
    if (!canvas) return;
    
    if (typeof rive !== 'undefined') {
      new rive.Rive({
        src: 'https://cdn.rive.app/animations/vehicles.riv',
        canvas: canvas,
        autoplay: true,
        layout: new rive.Layout({
          fit: rive.Fit.Contain,
          alignment: rive.Alignment.Center
        }),
        onLoad: () => {
          console.log("Rive 2D loaded successfully.");
        }
      });
    }
  };
  initRive();

  // 4. Scroll Reveal trigger
  const revealElements = document.querySelectorAll(".scroll-reveal");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("scroll-revealed");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  revealElements.forEach(el => revealObserver.observe(el));

  // 5. Active Section Nav Highlight & Smooth Scroll Offset
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-links li");
  
  const sectionTracker = () => {
    let scrollY = window.pageYOffset;
    
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute("id");
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navItems.forEach(item => {
          item.classList.remove("active");
          const link = item.querySelector("a");
          if (link && link.getAttribute("href") === `#${sectionId}`) {
            item.classList.add("active");
          }
        });
      }
    });
  };
  window.addEventListener("scroll", sectionTracker);
  sectionTracker();

  // 6. Number Counter Count-ups
  const statNumbers = document.querySelectorAll(".stat-number");
  const countUp = (element) => {
    const target = parseInt(element.getAttribute("data-target"), 10);
    const suffix = element.getAttribute("data-suffix") || "";
    let count = 0;
    const duration = 2000;
    const stepTime = Math.max(Math.floor(duration / target), 15);
    
    const timer = setInterval(() => {
      count += Math.ceil(target / (duration / stepTime));
      if (count >= target) {
        element.textContent = target.toLocaleString() + suffix;
        clearInterval(timer);
      } else {
        element.textContent = count.toLocaleString() + suffix;
      }
    }, stepTime);
  };

  const statsSection = document.querySelector(".stats-container");
  if (statsSection && statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          statNumbers.forEach(num => countUp(num));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
  }

  // 7. Floating WhatsApp Widget click helper
  const waWidget = document.querySelector(".whatsapp-widget");
  if (waWidget) {
    waWidget.addEventListener("click", () => {
      const phoneNumber = "971501234567"; // Global Dubai Corporate placeholder
      const message = encodeURIComponent("Hello Hasoon Logistics corporate desk, I am visiting your single page website and would like to request an enterprise quote.");
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
      window.open(whatsappUrl, "_blank");
    });
  }

  // 8. Contact Form submission handle
  const contactForm = document.getElementById("logistics-contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector("button[type='submit']");
      submitBtn.innerHTML = "SENDING Clearance SECURELY...";
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.7";
      
      setTimeout(() => {
        const parent = contactForm.parentElement;
        parent.style.opacity = "0";
        parent.style.transform = "translateY(15px)";
        
        setTimeout(() => {
          parent.innerHTML = `
            <div style="text-align: center; padding: 2rem 0;">
              <div style="width: 70px; height: 70px; border-radius: 50%; border: 2px solid var(--color-accent-gold); display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem auto; box-shadow: 0 0 20px rgba(198, 167, 94, 0.2);">
                <svg viewBox="0 0 24 24" width="30" height="30" fill="var(--color-accent-gold)">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <h3 style="font-size: 2rem; margin-bottom: 1rem;" class="text-gold">Clearence request received</h3>
              <p style="font-size: 1rem; color: var(--color-text-muted); margin-bottom: 2rem; max-width: 440px; margin-left: auto; margin-right: auto;">
                Your request has been routed to our corporate private support desk. A representative will contact you in under 2 hours.
              </p>
              <button onclick="window.location.reload()" class="btn-glass-3d">Send another request</button>
            </div>
          `;
          parent.style.opacity = "1";
          parent.style.transform = "translateY(0)";
        }, 300);
      }, 1500);
    });
  }

  // 9. Privacy Modal Controller
  const privacyTrigger = document.getElementById("footer-privacy");
  const privacyModal = document.getElementById("privacy-modal");
  const closeModalBtn = document.getElementById("close-modal-btn");
  
  if (privacyTrigger && privacyModal) {
    privacyTrigger.addEventListener("click", (e) => {
      e.preventDefault();
      privacyModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
    
    const closeModal = () => {
      privacyModal.classList.remove("active");
      document.body.style.overflow = "auto";
    };
    
    if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
    privacyModal.addEventListener("click", (e) => {
      if (e.target === privacyModal) closeModal();
    });
  }
});
