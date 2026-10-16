const navbar = document.getElementById('navbar');
const brandTitle = document.getElementById('brand-title');
const navLinks = document.querySelectorAll('.nav-link');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

function updateNavbarTheme() {
    const kontakSection = document.getElementById('kontak');
    let isKontakActive = false;

    if (kontakSection) {
        const rect = kontakSection.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            isKontakActive = true;
        }
    }

    if (window.scrollY <= 40 || isKontakActive) {
        navbar.classList.add('bg-transparent');
        navbar.classList.remove('bg-white', 'shadow-md', 'py-2');
        navbar.classList.add('py-4');
        if (brandTitle) {
            brandTitle.classList.add('text-white');
            brandTitle.classList.remove('text-brand-purple');
        }
        navLinks.forEach(link => {
            link.classList.add('text-white');
            link.classList.remove('text-gray-700');
        });
        if (mobileMenuBtn) {
            mobileMenuBtn.classList.add('text-white');
            mobileMenuBtn.classList.remove('text-brand-purple');
        }
        if (menuIcon) {
            menuIcon.classList.add('text-white');
            menuIcon.classList.remove('text-brand-purple');
        }
    } else {
        navbar.classList.remove('bg-transparent');
        navbar.classList.add('bg-white', 'shadow-md', 'py-2');
        navbar.classList.remove('py-4');
        if (brandTitle) {
            brandTitle.classList.remove('text-white');
            brandTitle.classList.add('text-brand-purple');
        }
        navLinks.forEach(link => {
            link.classList.remove('text-white');
            link.classList.add('text-gray-700');
        });
        if (mobileMenuBtn) {
            mobileMenuBtn.classList.remove('text-white');
            mobileMenuBtn.classList.add('text-brand-purple');
        }
        if (menuIcon) {
            menuIcon.classList.remove('text-white');
            menuIcon.classList.add('text-brand-purple');
        }
    }
}

window.addEventListener('scroll', updateNavbarTheme);
window.addEventListener('load', updateNavbarTheme);

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        if (menuIcon) {
            if (mobileMenu.classList.contains('hidden')) {
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            } else {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-xmark');
            }
        }
    });
}

mobileNavItems.forEach(item => {
    item.addEventListener('click', closeMobileMenu);
});

function closeMobileMenu() {
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        if (menuIcon) {
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        }
    }
}

function filterMenu(category) {
    const cards = document.querySelectorAll('.menu-card');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => {
        btn.classList.remove('active-filter', 'bg-brand-purple', 'text-white');
        btn.classList.add('bg-gray-100', 'text-gray-700');
    });

    if (window.event && window.event.target) {
        const clickedBtn = window.event.target.closest('.filter-btn');
        if (clickedBtn) {
            clickedBtn.classList.add('active-filter', 'bg-brand-purple', 'text-white');
            clickedBtn.classList.remove('bg-gray-100', 'text-gray-700');
        }
    }

    cards.forEach(card => {
        if (category === 'all') {
            card.style.display = 'flex';
        } else if (card.classList.contains(`category-${category}`)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

let currentSelectedItem = '';
let currentSelectedPrice = '';

function openOrderModal(itemName, itemPrice) {
    currentSelectedItem = itemName;
    currentSelectedPrice = itemPrice;

    const titleElem = document.getElementById('modal-item-title');
    const priceElem = document.getElementById('modal-item-price');
    if (titleElem) titleElem.innerText = itemName;
    if (priceElem) priceElem.innerText = itemPrice;

    const modal = document.getElementById('order-modal');
    const modalCard = document.getElementById('modal-card');

    if (modal && modalCard) {
        modal.classList.remove('hidden');
        setTimeout(() => {
            modalCard.classList.remove('scale-95', 'opacity-0');
            modalCard.classList.add('scale-100', 'opacity-100');
        }, 10);
    }
}

function closeOrderModal() {
    const modal = document.getElementById('order-modal');
    const modalCard = document.getElementById('modal-card');

    if (modal && modalCard) {
        modalCard.classList.remove('scale-100', 'opacity-100');
        modalCard.classList.add('scale-95', 'opacity-0');

        setTimeout(() => {
            modal.classList.add('hidden');
        }, 200);
    }
}

function handleModalSubmit(e) {
    e.preventDefault();
    const qty = document.getElementById('modal-qty')?.value || '1';
    const name = document.getElementById('modal-name')?.value || '-';
    const note = document.getElementById('modal-note')?.value || '-';

    const waNumber = '62881024356313';
    const text = `Halo Es Teler Sultan,%0A%0ASaya mau order:%0A- *Menu*: ${currentSelectedItem}%0A- *Harga*: ${currentSelectedPrice}%0A- *Jumlah*: ${qty} porsi%0A- *Nama*: ${name}%0A- *Catatan/Alamat*: ${note}`;

    window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
    closeOrderModal();
}

function handleQuickOrder(e) {
    e.preventDefault();
    const name = document.getElementById('order-name')?.value || '-';
    const phone = document.getElementById('order-phone')?.value || '-';
    const item = document.getElementById('order-item')?.value || '-';
    const note = document.getElementById('order-note')?.value || '-';

    const waNumber = '62881024356313';
    const text = `Halo Es Teler Sultan,%0A%0ASaya mau pesan cepat:%0A- *Nama*: ${name}%0A- *No. HP*: ${phone}%0A- *Pesanan*: ${item}%0A- *Catatan*: ${note}`;

    window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
}

tailwind.config = {
    theme: {
        extend: {
            colors: {
                brand: {
                    purple: '#4a154b',
                    lightpurple: '#6b21a8',
                    gold: '#fbc02d',
                    golddark: '#f57f17',
                    cream: '#faf5ff',
                    accent: '#e53935',
                    dark: '#2a082c'
                }
            },
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', 'sans-serif'],
                serif: ['"Playfair Display"', 'serif'],
            }
        }
    }
};