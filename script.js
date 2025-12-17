document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for reveal animations
  const targets = document.querySelectorAll('[data-reveal]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  targets.forEach((el, idx) => {
    // Stagger reveal animations
    el.style.transitionDelay = `${(idx % 8) * 100}ms`;
    observer.observe(el);
  });

  // Parallax effect for background orbs
  document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.animate-morphBg, .animate-pulseSoft');
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    
    orbs.forEach((orb, i) => {
      const speed = (i + 1) * 0.5;
      orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });

  // Glitch effect on hover for glitch-text elements
  const glitchTexts = document.querySelectorAll('.glitch-text');
  glitchTexts.forEach(text => {
    text.addEventListener('mouseenter', () => {
      text.style.animation = 'glitch 0.3s infinite';
    });
    text.addEventListener('mouseleave', () => {
      text.style.animation = '';
    });
  });

  // Magnetic effect for CTA buttons
  const ctaButtons = document.querySelectorAll('.cta-primary, .cta-secondary');
  ctaButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.02)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add tilt effect to cards
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1000px) rotateX(${y * -5}deg) rotateY(${x * 5}deg) translateY(-8px) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // Typing effect for hero text
  const typingElements = document.querySelectorAll('.typing-effect');
  typingElements.forEach(el => {
    const text = el.textContent;
    el.textContent = '';
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };
    setTimeout(typeWriter, 1000);
  });

  // Counter animation for metrics
  const animateCounter = (el, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        el.textContent = target + (el.dataset.suffix || '');
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(start) + (el.dataset.suffix || '');
      }
    }, 16);
  };

  // Observe metric cards for counter animation
  const metricObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const valueEl = entry.target.querySelector('.text-3xl');
        if (valueEl && !valueEl.dataset.animated) {
          valueEl.dataset.animated = 'true';
          const text = valueEl.textContent;
          const match = text.match(/(\d+)/);
          if (match) {
            const target = parseInt(match[1]);
            const suffix = text.replace(match[1], '');
            valueEl.dataset.suffix = suffix;
            animateCounter(valueEl, target);
          }
        }
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.metric-card').forEach(card => {
    metricObserver.observe(card);
  });

  // Project modal data sourced from TextResume
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
        'Real-time “Chat with Gemini” over WebSocket plus hybrid search to boost RAG accuracy.',
        'AI caching and multi-window rate limiting (minute/hour/day) to cut API costs by ~30% and prevent abuse.',
        'AI analytics dashboard tracking token usage and operational costs.'
      ],
      stack: ['Next.js', 'Express.js', 'Google Gemini API', 'WebSocket', 'PostgreSQL', 'Vector Database', 'Redis (caching)']
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
      desc: 'Digitizes physical documents, enabling fast search and storage location visualization for compliance and efficiency.',
      highlights: [
        'Digitization pipeline with quick search across stored documents.',
        'Storage location visualization for traceability.',
        'Supports centralized document governance.'
      ],
      stack: ['Laravel', 'React Native', 'jQuery', 'JavaScript', 'Dynamsoft WebTwain', 'Bootstrap', 'Redis', 'PostgreSQL']
    },
    printcard: {
      title: 'Print Card Management System (Indonesian National Police)',
      period: 'Sep 2023 – Nov 2023',
      location: 'Jakarta, Indonesia',
      desc: 'Desktop application for printing training participant cards with fast, accurate data flows.',
      highlights: [
        'Streamlines participant card printing for training events.',
        'Ensures data accuracy and rapid issuance.',
        'Desktop flow optimized for operational teams.'
      ],
      stack: ['React Electron', 'Node.js', 'CodeIgniter4', 'React Bootstrap', 'Evolis SDK', 'PostgreSQL']
    },
    fit: {
      title: 'Fit to Work',
      period: 'Jul 2023 – Sep 2023',
      location: 'Jakarta, Indonesia',
      desc: 'Web and mobile health monitoring application for worker readiness and compliance.',
      highlights: [
        'Routine health check logging and analysis for employees.',
        'Helps prevent workplace health risks and supports safety compliance.',
        'Available on web and mobile for accessibility.'
      ],
      stack: ['CodeIgniter4', 'React Native', 'jQuery', 'JavaScript', 'Bootstrap', 'SQL Server']
    }
  };

  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalMeta = document.getElementById('modal-meta');
  const modalHighlights = document.getElementById('modal-highlights');
  const modalStack = document.getElementById('modal-stack');
  const closeBtn = document.getElementById('modal-close');

  const openModal = (key) => {
    const data = projectDetails[key];
    if (!data) return;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;

    modalMeta.innerHTML = '';
    [data.period, data.location].forEach(text => {
      const tag = document.createElement('span');
      tag.className = 'px-3 py-1 rounded-full border border-neon/30 text-neon/90';
      tag.textContent = text;
      modalMeta.appendChild(tag);
    });

    modalHighlights.innerHTML = '';
    data.highlights.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      modalHighlights.appendChild(li);
    });

    modalStack.innerHTML = '';
    data.stack.forEach(tech => {
      const chip = document.createElement('span');
      chip.className = 'chip text-xs';
      chip.textContent = tech;
      modalStack.appendChild(chip);
    });

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const key = card.dataset.project;
      openModal(key);
    });
  });

  closeBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
  });

  // AI Lab: Gemini cost calculator and rate limit planner
  const tokensInput = document.getElementById('ai-tokens');
  const rpmInput = document.getElementById('ai-rpm');
  const priceInput = document.getElementById('ai-price');
  const hitInput = document.getElementById('ai-hit');
  const costEl = document.getElementById('ai-cost');
  const savedEl = document.getElementById('ai-saved');

  const peakInput = document.getElementById('rl-peak');
  const marginInput = document.getElementById('rl-margin');
  const windowInput = document.getElementById('rl-window');
  const burstInput = document.getElementById('rl-burst');
  const steadyEl = document.getElementById('rl-steady');
  const capEl = document.getElementById('rl-cap');

  const formatMoney = (val) => `$${val.toFixed(2)}`;

  const updateCost = () => {
    if (!tokensInput || !rpmInput || !priceInput || !hitInput) return;
    const tokens = Math.max(0, Number(tokensInput.value) || 0);
    const rpm = Math.max(0, Number(rpmInput.value) || 0);
    const price = Math.max(0, Number(priceInput.value) || 0);
    const hitRate = Math.min(100, Math.max(0, Number(hitInput.value) || 0)) / 100;
    const minutesPerDay = 1440;
    const tokensPerDay = tokens * rpm * minutesPerDay;
    const tokensSaved = tokensPerDay * hitRate;
    const tokensBilled = tokensPerDay - tokensSaved;
    const cost = (tokensBilled / 1000) * price;
    const saved = (tokensSaved / 1000) * price;
    costEl.textContent = formatMoney(cost);
    savedEl.textContent = formatMoney(saved);
  };

  const updateRateLimit = () => {
    if (!peakInput || !marginInput || !windowInput || !burstInput) return;
    const peak = Math.max(1, Number(peakInput.value) || 1);
    const margin = Math.max(0, Number(marginInput.value) || 0);
    const win = Math.max(1, Number(windowInput.value) || 1);
    const burst = Math.max(1, Number(burstInput.value) || 1);
    const steady = Math.ceil(peak * (1 + margin / 100));
    const cap = Math.ceil((steady * win) / 60 * burst);
    steadyEl.textContent = `${steady}/min`;
    capEl.textContent = `${cap}/window`;
  };

  [tokensInput, rpmInput, priceInput, hitInput].forEach((el) => {
    el?.addEventListener('input', updateCost);
  });
  [peakInput, marginInput, windowInput, burstInput].forEach((el) => {
    el?.addEventListener('input', updateRateLimit);
  });

  updateCost();
  updateRateLimit();
});

// PDF Download Function
function downloadPDF() {
  // Check if html2pdf is loaded
  if (typeof html2pdf === 'undefined') {
    alert('PDF library is loading. Please wait a moment and try again.');
    return;
  }

  // Show loading indicator
  const loadingOverlay = document.createElement('div');
  loadingOverlay.id = 'pdf-loading';
  loadingOverlay.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(3, 0, 20, 0.95);
    backdrop-filter: blur(10px);
  `;
  loadingOverlay.innerHTML = `
    <div style="text-align: center;">
      <div style="
        width: 60px;
        height: 60px;
        border: 4px solid rgba(0, 245, 212, 0.3);
        border-top-color: #00f5d4;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 16px;
      "></div>
      <p style="color: #00f5d4; font-size: 18px; font-weight: 600; margin: 0;">Generating PDF...</p>
      <p style="color: #a3b8cc; font-size: 14px; margin-top: 8px;">Please wait</p>
    </div>
    <style>
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    </style>
  `;
  document.body.appendChild(loadingOverlay);

  // Create clean CV content for PDF (print-friendly, single-column emphasis)
  const cvContent = `
    <div id="cv-pdf" class="cv-shell">
      <style>
        .cv-shell { font-family:'Inter','Segoe UI',Tahoma,sans-serif; background:#f8fafc; color:#0f172a; padding:18px; max-width:720px; margin:0 auto; line-height:1.45; }
        .cv-shell * { box-sizing:border-box; }
        .cv-card { background:#ffffff; border:1px solid #e2e8f0; border-radius:10px; padding:12px 14px; box-shadow:0 1px 6px rgba(15,23,42,0.05); page-break-inside:avoid; }
        .cv-header { display:grid; grid-template-columns:1fr auto; gap:6px; align-items:flex-start; padding:12px 14px; background:#eef2ff; border:1px solid #e2e8f0; border-radius:10px; }
        .cv-h1 { margin:0; font-size:20px; font-weight:800; letter-spacing:0.15px; color:#0f172a; }
        .cv-role { margin-top:2px; font-size:11.5px; font-weight:700; color:#1d4ed8; }
        .cv-meta { margin-top:4px; display:flex; flex-wrap:wrap; gap:5px; font-size:11px; color:#475569; }
        .cv-tagline { font-size:10.5px; letter-spacing:0.7px; color:#0ea5e9; font-weight:800; text-transform:uppercase; margin-bottom:5px; }
        .cv-grid-3 { display:grid; grid-template-columns:repeat(3,1fr); gap:6px; }
        .cv-metric { text-align:center; padding:8px 6px; border:1px solid #e2e8f0; border-radius:9px; background:#fff; }
        .cv-metric .val { font-size:17px; font-weight:800; line-height:1.05; }
        .cv-metric .lbl { font-size:10px; color:#475569; }
        .cv-section { margin-top:10px; }
        .cv-job { margin-bottom:10px; page-break-inside:avoid; }
        .cv-job h3 { margin:0; font-size:12px; font-weight:700; color:#0f172a; }
        .cv-job .row { display:flex; justify-content:space-between; gap:6px; align-items:baseline; }
        .cv-job .when { font-size:10px; color:#475569; white-space:nowrap; }
        .cv-job .where { font-size:10px; color:#64748b; margin:2px 0 5px; }
        .cv-job ul { margin:0; padding-left:14px; font-size:11px; color:#1f2937; line-height:1.4; }
        .cv-job li { margin-bottom:3px; }
        .cv-proj { padding:9px 10px; border:1px solid #e2e8f0; border-radius:9px; background:#f8fafc; page-break-inside:avoid; }
        .cv-proj h4 { margin:0 0 3px 0; font-size:11.5px; font-weight:700; color:#0f172a; }
        .cv-proj p { margin:0; font-size:10.5px; color:#475569; }
        .cv-skill { padding:9px; border:1px solid #e2e8f0; border-radius:9px; background:#f8fafc; page-break-inside:avoid; }
        .cv-skill h5 { margin:0 0 3px 0; font-size:11px; font-weight:700; color:#0f172a; }
        .cv-skill p { margin:0; font-size:10.5px; color:#475569; line-height:1.35; }
        .cv-edu { display:grid; grid-template-columns:1fr auto; gap:6px; padding:6px 0; border-bottom:1px solid #e2e8f0; page-break-inside:avoid; }
        .cv-edu:last-child { border-bottom:none; }
        .cv-edu h4 { margin:0; font-size:12px; font-weight:700; color:#0f172a; }
        .cv-edu .detail { font-size:10.5px; color:#475569; }
        .cv-edu .loc { font-size:10px; color:#94a3b8; }
        .cv-edu .period { font-size:10px; color:#475569; white-space:nowrap; }
        .cv-list-tight { margin:0; padding-left:14px; font-size:11px; color:#1f2937; line-height:1.4; }
        .cv-list-tight li { margin-bottom:3px; }
        .cv-chip { display:inline-flex; align-items:center; padding:5px 9px; border:1px solid #e2e8f0; border-radius:999px; background:#f8fafc; font-size:10px; color:#0f172a; margin:4px 6px 0 0; }
        @media print { .cv-shell { box-shadow:none; } }
      </style>

      <div class="cv-header">
        <div>
          <div class="cv-h1">Muhammad Iqbal Ramadhan</div>
          <div class="cv-role">Full Stack Software Engineer</div>
          <div class="cv-meta">
            <span>Depok, Indonesia</span>
            <span>|</span>
            <span>+62 857-1011-6328</span>
            <span>|</span>
            <span>muh.iqbal6328@gmail.com</span>
            <span>|</span>
            <span>linkedin.com/in/muhiqbal6328</span>
          </div>
        </div>
        <div style="text-align:right; font-size:11px; color:#64748b;">Updated: ${new Date().toLocaleDateString('en-US')}</div>
      </div>

      <div class="cv-section cv-grid-2">
        <div class="cv-card">
          <div class="cv-tagline">Professional Summary</div>
          <p style="margin:4px 0 0; font-size:12.5px; color:#111827;">
            Full Stack Software Engineer (4+ yrs) focused on high-traffic middleware and Generative AI. Shipped API middleware handling 300K+ daily transactions, led Gemini-powered knowledge systems, and designed caching + rate-limiting that reduced AI costs by ~30%. Experienced leading teams, stabilizing systems under heavy load, and documenting operational playbooks.
          </p>
        </div>
        <div class="cv-grid-3">
          ${[{
            label: 'API tx/day', value: '300K+', color: '#0ea5e9'
          }, {
            label: 'AI cost reduction', value: '30%', color: '#6366f1'
          }, {
            label: 'Experience', value: '4+ yrs', color: '#f43f5e'
          }].map(m => `
            <div class="cv-metric">
              <div class="val" style="color:${m.color};">${m.value}</div>
              <div class="lbl">${m.label}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="cv-section cv-card">
        <div class="cv-tagline">Work Experience</div>
        ${[
          {
            title: 'Software Engineer - PT Nuon Digital Indonesia (Telkom Group)',
            period: 'Jul 2025 – Present',
            location: 'Jakarta, Indonesia',
            bullets: [
              'Build and maintain Indihome-OTT middleware handling 300K+ daily transactions.',
              'Integrate Gemini-powered knowledge system (WebSocket chat, hybrid search).',
              'Automate cron jobs for migration from legacy to new architecture.',
              'Manage mass activation events with rate limiting and real-time monitoring.',
              'Author API documentation and operational playbooks.'
            ]
          },
          {
            title: 'Fullstack Developer - PT Phiraka Sinergi Indonesia',
            period: 'Sep 2022 – Jul 2025',
            location: 'Jakarta, Indonesia',
            bullets: [
              'Built web, mobile, desktop apps (PHP/JS); optimized cross-device performance.',
              'Led 3 projects and mentored interns to improve delivery quality.',
              'Integrated mobile apps with backend APIs; tested/debugged on Android devices.',
              'Automated deployments with DevOps to minimize downtime.',
              'Top KPI 2025 (rank #1) for team performance.'
            ]
          },
          {
            title: 'Freelance Web Developer - PT QUPRO Indonesia',
            period: '2021 – 2022',
            location: 'Depok, Indonesia',
            bullets: [
              'Built donation tracking app with Laravel for event workflows.',
              'Integrated WhatsApp notifications to confirm donors.',
              'Created financial dashboards and centralized reports.'
            ]
          }
        ].map(job => `
          <div class="cv-job">
            <div class="row">
              <h3>${job.title}</h3>
              <div class="when">${job.period}</div>
            </div>
            <div class="where">${job.location}</div>
            <ul>
              ${job.bullets.map(b => `<li>${b}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>

      <div class="cv-section cv-card">
        <div class="cv-tagline">Impact Highlights</div>
        <ul class="cv-list-tight">
          <li>Stabilized Indihome-OTT middleware at 300K+ tx/day with real-time monitoring and guarded promos.</li>
          <li>Cut Generative AI spend by ~30% via caching, rate-limiting, and usage analytics for Gemini.</li>
          <li>Led delivery across 3 projects while mentoring interns; achieved top KPI 2025 (rank #1).</li>
          <li>Documented API playbooks and release notes to speed onboarding and reduce incidents.</li>
        </ul>
      </div>

      <div class="cv-section cv-card">
        <div class="cv-tagline">Key Projects</div>
        <div class="cv-grid-2" style="gap:10px; grid-template-columns:1fr 1fr;">
          ${[
            { name: 'TVV - High-Traffic API Middleware', detail: 'Indihome-OTT middleware, 300K+ tx/day, real-time monitoring', color: '#0ea5e9' },
            { name: 'Knowledge Management System (GenAI)', detail: 'Gemini chat, RAG, AI caching, ~30% cost reduction', color: '#6366f1' },
            { name: 'HRIS', detail: 'Employee, Organisation, Payroll, Recruitment, Training', color: '#f97316' },
            { name: 'Room Management System', detail: '3D Room View, randomized booking rules', color: '#10b981' }
          ].map(p => `
            <div class="cv-proj" style="border-left:3px solid ${p.color};">
              <h4>${p.name}</h4>
              <p>${p.detail}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="cv-section cv-card">
        <div class="cv-tagline">Technical Skills</div>
        <div class="cv-grid-3">
          ${[
            {
              title: 'Backend & Languages',
              items: 'JavaScript/TypeScript, PHP, Python, Node.js, Express.js, Laravel, CodeIgniter, Phalcon'
            },
            {
              title: 'Frontend',
              items: 'Next.js, React.js, React Native, TailwindCSS, Bootstrap, Redux'
            },
            {
              title: 'AI & Data',
              items: 'Gemini API, RAG, Vector DB, Redis, PostgreSQL, MySQL, SQL Server'
            }
          ].map(s => `
            <div class="cv-skill">
              <h5>${s.title}</h5>
              <p>${s.items}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="cv-section cv-card">
        <div class="cv-tagline">Tooling & Delivery Practices</div>
        <div>
          ${[
            'Git, GitLab CI/CD, GitHub Actions',
            'Docker, basic Linux ops, cron automation',
            'Postman, Swagger/OpenAPI, API playbooks',
            'Monitoring & alerts (dashboards, logs)',
            'Unit/integration testing, peer reviews',
            'Agile/Scrum rituals and release notes'
          ].map(t => `<span class="cv-chip">${t}</span>`).join('')}
        </div>
      </div>

      <div class="cv-section cv-card">
        <div class="cv-tagline">Education</div>
        ${[
          {
            school: 'Asia Cyber University',
            detail: "Bachelor's in Information System · GPA 3.84",
            period: 'Apr 2024 – Present',
            location: 'Jakarta, Indonesia'
          },
          {
            school: 'SMK Taruna Bhakti',
            detail: 'Software Engineering',
            period: 'Jul 2019 – Aug 2022',
            location: 'Depok, Indonesia'
          }
        ].map(ed => `
          <div class="cv-edu">
            <div>
              <h4>${ed.school}</h4>
              <div class="detail">${ed.detail}</div>
              <div class="loc">${ed.location}</div>
            </div>
            <div class="period">${ed.period}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Create container
  const container = document.createElement('div');
  container.innerHTML = cvContent;
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '0';
  document.body.appendChild(container);

  // PDF Options
  const opt = {
    margin: [10, 10, 12, 10],
    filename: 'Muhammad_Iqbal_Ramadhan_CV.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait'
    }
  };

  // Generate PDF
  html2pdf()
    .set(opt)
    .from(container.querySelector('#cv-pdf'))
    .save()
    .then(() => {
      container.remove();
      loadingOverlay.remove();
    })
    .catch(err => {
      console.error('PDF generation error:', err);
      container.remove();
      loadingOverlay.remove();
      alert('Error generating PDF. Please try again.');
    });
}
