// 1. Loader
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    
    // Aguarda 1.5 segundos exibindo a logo antes de sumir
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500); // Tempo da transição CSS
    }, 1500);
});

// 2. Menu Mobile
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');

btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
});

// 3. Animação ao Rolar (Intersection Observer)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Anima apenas uma vez
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-section').forEach(section => {
    observer.observe(section);
});

// 4. Integração Formulário -> WhatsApp
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const guests = document.getElementById('guests').value;
    
    // Formata a data para o padrão brasileiro
    const formatDate = (dateStr) => {
        if(!dateStr) return '';
        const [year, month, day] = dateStr.split('-');
        return `${day}/${month}/${year}`;
    };

    const message = `Olá! Me chamo *${name}*.%0A%0AGostaria de fazer uma reserva na Chácara Triunfo:%0A📅 Check-in: ${formatDate(checkin)}%0A📅 Check-out: ${formatDate(checkout)}%0A👥 Pessoas: ${guests}%0A%0AAguardando confirmação!`;
    
    const whatsappNumber = "5512991489382"; // Substitua pelo número real
    
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
});

// 5. Inicialização do Swiper (Carrossel)
if (document.querySelector('.mySwiper')) {
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 1, // Ajustado para 1 no carrossel da galeria
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 1, // Ajustado para 1 no carrossel da galeria
                spaceBetween: 30,
            },
        },
    });
}

// 6. Inicialização do GLightbox
const lightbox = GLightbox({
    loop: true,
    touchNavigation: true,
    selector: '.glightbox',
    zoomable: true,
    closeButton: true, // Garante o botão X para fechar
    keyboardNavigation: true, // Permite navegar com setas do teclado
    closeOnOutsideClick: true, // Fecha ao clicar fora da imagem
    openEffect: 'zoom', // Efeito de zoom suave ao abrir
    closeEffect: 'zoom' // Efeito de zoom suave ao fechar
});

// 7. PWA Installation Prompt
let deferredPrompt;
const installPwaBtn = document.getElementById('install-pwa-btn');
const installPwaBtnMobile = document.getElementById('install-pwa-btn-mobile');

if (installPwaBtn && installPwaBtnMobile) { // Garante que os botões existem antes de adicionar listeners
    window.addEventListener('beforeinstallprompt', (e) => {
        // Previne que a mini-barra de informações apareça automaticamente em mobile
        e.preventDefault();
        // Armazena o evento para que possa ser disparado mais tarde.
        deferredPrompt = e;
        // Atualiza a UI para notificar o usuário que ele pode instalar o PWA
        installPwaBtn.classList.remove('hidden');
        installPwaBtnMobile.classList.remove('hidden');
        console.log('PWA: beforeinstallprompt fired. Button visible.');
    });

    installPwaBtn.addEventListener('click', async () => {
        if (!deferredPrompt) {
            console.log('PWA: deferredPrompt is null. Cannot show install prompt.');
            return;
        }
        // Esconde o botão de instalação do app
        installPwaBtn.classList.add('hidden');
        installPwaBtnMobile.classList.add('hidden');
        // Mostra o prompt de instalação
        deferredPrompt.prompt();
        // Espera a resposta do usuário ao prompt
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`PWA: User response to the install prompt: ${outcome}`);
        // Já usamos o prompt, não podemos usá-lo novamente, então limpamos.
        deferredPrompt = null;
    });

    installPwaBtnMobile.addEventListener('click', async () => {
        // A lógica é a mesma do botão desktop, apenas para o botão mobile
        installPwaBtn.click(); // Reutiliza a lógica do botão desktop
    });
}

// 8. Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => console.log('Service Worker registrado com sucesso:', registration.scope))
            .catch((error) => console.error('Falha no registro do Service Worker:', error));
    });
}