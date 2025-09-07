// Contoh script kecil untuk efek animasi sederhana
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card, i) => {
      card.style.opacity = 0;
      card.style.transform = "translateY(20px)";
      setTimeout(() => {
        card.style.transition = "all 0.6s ease";
        card.style.opacity = 1;
        card.style.transform = "translateY(0)";
      }, i * 200);
    });
  });
  document.addEventListener("DOMContentLoaded", () => {
    const skills = document.querySelectorAll(".card.skill");
  
    const animate = (el) => {
      const percent = Number(el.dataset.percent) || 0;
      const bar = el.querySelector(".progress-bar");
      const num = el.querySelector(".skill-num");
      const prog = el.querySelector(".progress");
      prog.setAttribute("aria-valuenow", String(percent));
  
      // animasi angka
      let start = 0, dur = 700, t0 = performance.now();
      function step(t){
        const p = Math.min(1, (t - t0) / dur);
        const val = Math.round(p * percent);
        num.textContent = val + "%";
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
  
      // isi bar
      requestAnimationFrame(() => { bar.style.width = percent + "%"; });
    };
  
    // supaya jalan saat terlihat di layar
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          animate(e.target);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
  
    skills.forEach(s => io.observe(s));
  });
  document.addEventListener("DOMContentLoaded", () => {
    const typingEl = document.getElementById("typing-text");
    if (typingEl) {
      const fullText = typingEl.textContent.trim();
      typingEl.textContent = ""; // kosongin dulu
  
      let i = 0;
      function type() {
        if (i < fullText.length) {
          typingEl.textContent += fullText.charAt(i);
          i++;
          setTimeout(type, 30); // kecepatan ketik (ms per karakter)
        } else {
          typingEl.style.borderRight = "none"; // hilangkan kursor setelah selesai
        }
      }
      type();
    }
  });
  document.addEventListener("DOMContentLoaded", () => {
    const root = document.documentElement;
    const key = "theme";
    const btn = document.getElementById("themeToggle");
  
    const initial = localStorage.getItem(key) ||
      (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    root.classList.toggle("light", initial === "light");
  
    if (btn) {
      const setIcon = () => { btn.textContent = root.classList.contains("light") ? "☀️" : "🌙"; };
      setIcon();
      btn.setAttribute("aria-pressed", root.classList.contains("light") ? "true" : "false");
      btn.addEventListener("click", () => {
        root.classList.toggle("light");
        const mode = root.classList.contains("light") ? "light" : "dark";
        localStorage.setItem(key, mode);
        btn.setAttribute("aria-pressed", mode === "light" ? "true" : "false");
        setIcon();
      });
    }
  });
  