/**
 * AI-Themed Elegant Portfolio
 * Advanced animations & interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mark body as JS-enabled for CSS animations
  document.body.classList.add('js-enabled');
  
  // Initialize all modules
  initNeuralCanvas();
  initParticles();
  initRevealAnimations();
  initNavigation();
  initCounterAnimations();
  initProjectModal();
  initSmoothScroll();
  initMobileMenu();
});

/* ============================================
   NEURAL NETWORK CANVAS
   ============================================ */
function initNeuralCanvas() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let animationId;
  let nodes = [];
  let connections = [];
  
  // Set canvas size
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initNodes();
  }
  
  // Initialize nodes
  function initNodes() {
    nodes = [];
    const nodeCount = Math.floor((canvas.width * canvas.height) / 25000);
    
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02
      });
    }
  }
  
  // Update node positions
  function updateNodes() {
    nodes.forEach(node => {
      node.x += node.vx;
      node.y += node.vy;
      node.pulsePhase += node.pulseSpeed;
      
      // Bounce off edges
      if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
      if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      
      // Keep in bounds
      node.x = Math.max(0, Math.min(canvas.width, node.x));
      node.y = Math.max(0, Math.min(canvas.height, node.y));
    });
  }
  
  // Find connections between nearby nodes
  function findConnections() {
    connections = [];
    const maxDistance = 150;
    
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          connections.push({
            from: nodes[i],
            to: nodes[j],
            distance: distance,
            maxDistance: maxDistance
          });
        }
      }
    }
  }
  
  // Draw everything
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw connections
    connections.forEach(conn => {
      const opacity = (1 - conn.distance / conn.maxDistance) * 0.3;
      ctx.beginPath();
      ctx.moveTo(conn.from.x, conn.from.y);
      ctx.lineTo(conn.to.x, conn.to.y);
      ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    });
    
    // Draw nodes
    nodes.forEach(node => {
      const pulse = Math.sin(node.pulsePhase) * 0.5 + 0.5;
      const radius = node.radius * (1 + pulse * 0.3);
      const opacity = 0.4 + pulse * 0.3;
      
      // Glow
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius * 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99, 102, 241, ${opacity * 0.1})`;
      ctx.fill();
      
      // Core
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(139, 92, 246, ${opacity})`;
      ctx.fill();
    });
  }
  
  // Animation loop
  function animate() {
    updateNodes();
    findConnections();
    draw();
    animationId = requestAnimationFrame(animate);
  }
  
  // Start
  resize();
  animate();
  
  // Handle resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resize, 200);
  });
}

/* ============================================
   FLOATING PARTICLES
   ============================================ */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  
  const particleCount = 30;
  
  for (let i = 0; i < particleCount; i++) {
    createParticle(container);
  }
}

function createParticle(container) {
  const particle = document.createElement('div');
  const size = Math.random() * 4 + 2;
  const duration = Math.random() * 20 + 20;
  const delay = Math.random() * 20;
  
  particle.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    background: rgba(99, 102, 241, ${Math.random() * 0.3 + 0.1});
    border-radius: 50%;
    left: ${Math.random() * 100}%;
    top: ${Math.random() * 100}%;
    animation: particle-float ${duration}s ease-in-out ${delay}s infinite;
    pointer-events: none;
  `;
  
  container.appendChild(particle);
}

// Add particle animation styles
const particleStyles = document.createElement('style');
particleStyles.textContent = `
  @keyframes particle-float {
    0%, 100% {
      transform: translate(0, 0) scale(1);
      opacity: 0.3;
    }
    25% {
      transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.2);
      opacity: 0.6;
    }
    50% {
      transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0.8);
      opacity: 0.4;
    }
    75% {
      transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.1);
      opacity: 0.5;
    }
  }
`;
document.head.appendChild(particleStyles);

/* ============================================
   REVEAL ANIMATIONS
   ============================================ */
function initRevealAnimations() {
  const revealElements = document.querySelectorAll('[data-reveal]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger the animations
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(el => observer.observe(el));
}

/* ============================================
   NAVIGATION
   ============================================ */
function initNavigation() {
  const header = document.querySelector('.nav-header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
  
  // Active link highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ============================================
   COUNTER ANIMATIONS
   ============================================ */
function initCounterAnimations() {
  const counters = document.querySelectorAll('[data-count]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
  const target = parseInt(element.dataset.count);
  const duration = 2000;
  const start = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(target * easeOutQuart);
    
    element.textContent = current;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target;
    }
  }
  
  requestAnimationFrame(update);
}

/* ============================================
   PROJECT MODAL
   ============================================ */
const projectDetails = {
  tvv: {
    title: 'TVV · High-Traffic API Middleware',
    period: 'Jul 2025 – Present',
    location: 'Jakarta, Indonesia',
    desc: 'High-performance middleware bridging Indihome and OTT partners for content purchase and activation; handles 300K+ transactions/day with real-time monitoring and mass-promo stability.',
    highlights: [
      'Build and maintain middleware APIs for Indihome-OTT, ensuring stability at 300K+ daily transactions.',
      'Monitor real-time transactions to keep zero-downtime purchasing and activation.',
      'Manage high-concurrency promo events with enforced rate limits.'
    ],
    stack: ['CodeIgniter', 'Phalcon', 'PHP', 'MySQL']
  },
  kms: {
    title: 'Knowledge Management System (GenAI)',
    period: 'Nov 2025 – Present',
    location: 'Jakarta, Indonesia',
    desc: 'Internal GenAI platform with Gemini chat (WebSocket), hybrid search RAG, AI caching, multi-window rate limiting, and cost analytics achieving ~30% API cost reduction.',
    highlights: [
      'Real-time "Chat with Gemini" over WebSocket plus hybrid search to boost RAG accuracy.',
      'AI caching and multi-window rate limiting (minute/hour/day) to cut API costs by ~30% and prevent abuse.',
      'AI analytics dashboard tracking token usage and operational costs.'
    ],
    stack: ['Next.js', 'Express.js', 'Google Gemini API', 'WebSocket', 'PostgreSQL', 'Vector Database', 'Redis']
  },
  hris: {
    title: 'Human Resources Information System',
    period: 'Sep 2024 – Mar 2025',
    location: 'Jakarta, Indonesia',
    desc: 'HR platform covering Employee, Organisation, Payroll, Recruitment, and Training modules to improve efficiency and transparency.',
    highlights: [
      'Automates salary and tax calculations across payroll.',
      'Supports recruitment workflows from selection to onboarding.',
      'Enables training management and progress tracking.'
    ],
    stack: ['CodeIgniter4', 'Propel ORM', 'jQuery', 'JavaScript', 'Bootstrap', 'Twig', 'PostgreSQL']
  },
  room: {
    title: "Room Management System (Attorney General's Office)",
    period: 'Apr 2024 – Aug 2024',
    location: 'Jakarta, Indonesia',
    desc: 'Room booking platform with 3D Room View and randomized booking algorithm that respects gender rules and seniority.',
    highlights: [
      '3D room visualization to inspect availability visually.',
      'Random booking algorithm enforcing gender and seniority rules.',
      'Improves compliance and transparency for room assignments.'
    ],
    stack: ['CodeIgniter4', 'PropelORM', 'jQuery', 'Three.js', 'JavaScript', 'Bootstrap', 'PostgreSQL']
  },
  education: {
    title: 'Education & Training Information System',
    period: 'Feb 2024 – Apr 2024',
    location: 'Jakarta, Indonesia',
    desc: 'Web and mobile platform to streamline training administration, scheduling, participant management, and reporting.',
    highlights: [
      'Training registration, scheduling, and instructor assignment.',
      'Participant management with progress tracking.',
      'Reporting and analytics for training effectiveness.'
    ],
    stack: ['CodeIgniter4', 'React Native', 'jQuery', 'JavaScript', 'Bootstrap', 'PostgreSQL']
  },
  dms: {
    title: "Document Management System (Attorney General's Office)",
    period: 'Nov 2023 – Feb 2024',
    location: 'Jakarta, Indonesia',
    desc: 'Digitizes physical documents with fast search and storage location visualization.',
    highlights: [
      'Fast document search with full-text indexing.',
      'Storage location visualization for easy retrieval.',
      'Secure access control and audit logging.'
    ],
    stack: ['Laravel', 'React Native', 'Redis', 'PostgreSQL']
  }
};

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const modalBackdrop = modal?.querySelector('.modal-backdrop');
  const projectCards = document.querySelectorAll('[data-project]');
  
  if (!modal) return;
  
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.dataset.project;
      const project = projectDetails[projectId];
      
      if (project) {
        openModal(project);
      }
    });
  });
  
  modalClose?.addEventListener('click', closeModal);
  modalBackdrop?.addEventListener('click', closeModal);
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
  
  function openModal(project) {
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-meta').textContent = `${project.period} · ${project.location}`;
    document.getElementById('modal-desc').textContent = project.desc;
    
    const highlightsList = document.getElementById('modal-highlights');
    highlightsList.innerHTML = project.highlights.map(h => `<li>${h}</li>`).join('');
    
    const stackContainer = document.getElementById('modal-stack');
    stackContainer.innerHTML = project.stack.map(s => `<span>${s}</span>`).join('');
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        const headerHeight = document.querySelector('.nav-header')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        document.getElementById('mobile-menu')?.classList.remove('active');
        document.getElementById('mobile-menu-btn')?.classList.remove('active');
      }
    });
  });
}

/* ============================================
   MOBILE MENU
   ============================================ */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (!menuBtn || !mobileMenu) return;
  
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });
  
  // Close menu when clicking a link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* ============================================
   PDF DOWNLOAD - Clean CV Format
   ============================================ */
function downloadPDF(e) {
  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  
  const cvHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Muhammad Iqbal Ramadhan - CV</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: Arial, Helvetica, sans-serif; 
      font-size: 11px; 
      line-height: 1.5; 
      color: #333; 
      padding: 40px;
      max-width: 800px;
      margin: 0 auto;
    }
    .header { border-bottom: 3px solid #6366f1; padding-bottom: 15px; margin-bottom: 20px; }
    .header h1 { font-size: 24px; color: #1a1a2e; margin-bottom: 5px; }
    .header .title { font-size: 14px; color: #6366f1; font-weight: bold; margin-bottom: 8px; }
    .header .contact { font-size: 11px; color: #555; }
    .section { margin-bottom: 18px; }
    .section h2 { 
      font-size: 13px; 
      color: #6366f1; 
      text-transform: uppercase; 
      letter-spacing: 1px; 
      border-bottom: 1px solid #ddd; 
      padding-bottom: 5px; 
      margin-bottom: 10px; 
    }
    .job { margin-bottom: 12px; }
    .job-title { font-size: 12px; font-weight: bold; color: #1a1a2e; }
    .job-date { font-size: 10px; color: #6366f1; margin: 2px 0 5px 0; }
    .job-desc { font-size: 10px; color: #333; }
    .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5px; }
    .skill-item { font-size: 10px; }
    .skill-item strong { color: #1a1a2e; }
    @media print {
      body { padding: 20px; }
      @page { margin: 15mm; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Muhammad Iqbal Ramadhan</h1>
    <p class="title">Full Stack Software Engineer | AI Specialist</p>
    <p class="contact">
      Email: muh.iqbal6328@gmail.com | Phone: +62 857-1011-6328<br>
      Location: Depok, Indonesia | LinkedIn: linkedin.com/in/muhiqbal6328
    </p>
  </div>

  <div class="section">
    <h2>Professional Summary</h2>
    <p>Full Stack Software Engineer with 4+ years of experience. Specialized in building high-performance API middleware handling 300K+ daily transactions, implementing Generative AI with RAG, and designing caching & rate-limiting architectures that reduced costs by ~30%.</p>
  </div>

  <div class="section">
    <h2>Work Experience</h2>
    
    <div class="job">
      <p class="job-title">Software Engineer - PT Nuon Digital Indonesia (Telkom Group)</p>
      <p class="job-date">Jul 2025 – Present | Jakarta, Indonesia</p>
      <p class="job-desc">
        • Develop high-traffic middleware APIs handling 300K+ daily transactions<br>
        • Build AI-powered KMS with Gemini (WebSocket, hybrid search RAG)<br>
        • Implement AI caching and rate limiting, reducing costs by ~30%<br>
        • Manage mass promo events with real-time monitoring
      </p>
    </div>

    <div class="job">
      <p class="job-title">Fullstack Developer - PT Phiraka Sinergi Indonesia</p>
      <p class="job-date">Sep 2022 – Jul 2025 | Jakarta, Indonesia</p>
      <p class="job-desc">
        • Developed web, mobile, and desktop apps using PHP/JS frameworks<br>
        • Led 3 development teams and mentored interns<br>
        • Achieved #1 KPI ranking in 2025<br>
        • Automated deployments to reduce downtime
      </p>
    </div>

    <div class="job">
      <p class="job-title">Freelance Web Developer - PT QUPRO Indonesia</p>
      <p class="job-date">2021 – 2022 | Depok, Indonesia</p>
      <p class="job-desc">
        • Developed donation tracking app with Laravel<br>
        • Integrated WhatsApp notifications<br>
        • Created financial dashboards
      </p>
    </div>
  </div>

  <div class="section">
    <h2>Key Projects</h2>
    <p>
      <strong>TVV - High-Traffic API Middleware:</strong> 300K+ daily transactions, real-time monitoring<br>
      <strong>Knowledge Management System (GenAI):</strong> Gemini AI, RAG, 30% cost reduction<br>
      <strong>HRIS:</strong> Employee, Payroll, Recruitment, Training modules<br>
      <strong>3D Room Management:</strong> Three.js visualization, smart allocation algorithm
    </p>
  </div>

  <div class="section">
    <h2>Technical Skills</h2>
    <div class="skills-grid">
      <p class="skill-item"><strong>Backend:</strong> Node.js, Express.js, PHP, Laravel, CodeIgniter, REST API</p>
      <p class="skill-item"><strong>Frontend:</strong> Next.js, React, TypeScript, TailwindCSS, React Native</p>
      <p class="skill-item"><strong>AI & Data:</strong> Google Gemini API, RAG, Vector DB, Redis, PostgreSQL</p>
      <p class="skill-item"><strong>DevOps:</strong> Git, Docker, Linux, Nginx, WebSocket</p>
    </div>
  </div>

  <div class="section">
    <h2>Education</h2>
    <p><strong>Asia Cyber University</strong> - Bachelor in Information System (GPA 3.84) | Apr 2024 – Present</p>
    <p><strong>SMK Taruna Bhakti</strong> - Software Engineering | Jul 2019 – Aug 2022</p>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 250);
    };
  </script>
</body>
</html>`;

  printWindow.document.write(cvHTML);
  printWindow.document.close();
}

// Make downloadPDF globally available
window.downloadPDF = downloadPDF;
