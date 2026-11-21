// 1. Mobile Drawer Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const isOpen = mobileMenu.classList.contains('open');
    menuIcon.classList.toggle('fa-bars', !isOpen);
    menuIcon.classList.toggle('fa-xmark', isOpen);
});

// Close mobile menu when clicking any link
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
    });
});

// 2. Scroll Progress & Active Nav Link Highlight (ScrollSpy)
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('scroll-progress').style.width = scrolled + '%';

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 160) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('nav-active');
        if (current && link.getAttribute('href').includes(current)) {
            link.classList.add('nav-active');
        }
    });
});

// 3. Experience Tab Switcher
function switchExpTab(tabKey) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(panel => panel.classList.remove('active'));

    const selectedTab = document.getElementById(`tab-${tabKey}`);
    const selectedContent = document.getElementById(`content-${tabKey}`);

    if (selectedTab && selectedContent) {
        selectedTab.classList.add('active');
        selectedContent.classList.add('active');
    }
}

// 4. Live Glossary Search Filter
function filterGlossary() {
    const input = document.getElementById('glossary-search').value.toLowerCase();
    const cards = document.querySelectorAll('.glossary-card');

    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(input) ? 'block' : 'none';
    });
}

// 5. Modal Controllers
function openImageModal(imgSrc, caption) {
    const modal = document.getElementById('image-modal');
    document.getElementById('modal-img').src = imgSrc;
    document.getElementById('modal-caption').innerText = caption;
    modal.classList.add('active');
}

function openVideoModal() {
    document.getElementById('video-modal').classList.add('active');
}

function openCanvaModal() {
    document.getElementById('canva-modal').classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// 6. Download Button Feedback
function downloadMinutesMock(btn) {
    const originalText = btn.innerHTML;
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Memuat Turun...`;
    setTimeout(() => {
        btn.innerHTML = `<i class="fa-solid fa-circle-check"></i> Diterima (PDF)`;
        setTimeout(() => {
            btn.innerHTML = originalText;
        }, 2500);
    }, 1000);
}

// 7. Drag-to-Scroll Carousel untuk Gambar Bukti Mesyuarat
const proofSlider = document.getElementById('proof-slider');

if (proofSlider) {
    let isDown = false;
    let startX = 0;
    let scrollStart = 0;
    let hasDragged = false;

    proofSlider.addEventListener('mousedown', (e) => {
        isDown = true;
        hasDragged = false;
        proofSlider.classList.add('dragging');
        startX = e.pageX - proofSlider.offsetLeft;
        scrollStart = proofSlider.scrollLeft;
    });

    proofSlider.addEventListener('mouseleave', () => {
        isDown = false;
        proofSlider.classList.remove('dragging');
    });

    proofSlider.addEventListener('mouseup', () => {
        isDown = false;
        proofSlider.classList.remove('dragging');
    });

    proofSlider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - proofSlider.offsetLeft;
        const walk = (x - startX) * 1.6;
        if (Math.abs(x - startX) > 6) {
            hasDragged = true;
        }
        proofSlider.scrollLeft = scrollStart - walk;
    });

    // Buka modal hanya jika pengguna klik (bukan selepas drag)
    proofSlider.querySelectorAll('.proof-card').forEach(card => {
        card.addEventListener('click', () => {
            if (hasDragged) {
                hasDragged = false;
                return;
            }
            const imgSrc = card.getAttribute('data-img');
            const caption = card.getAttribute('data-caption');
            openImageModal(imgSrc, caption);
        });
    });
}

// Butang anak panah kiri / kanan untuk carousel
function scrollProofSlider(direction) {
    if (!proofSlider) return;
    proofSlider.scrollBy({
        left: direction * 520,
        behavior: 'smooth'
    });
}