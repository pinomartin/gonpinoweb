window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.display = 'none';
});

// Función para obtener el idioma preferido del usuario
function getPreferredLanguage() {
    const languages = navigator.languages || [navigator.language || navigator.userLanguage];
    for (let lang of languages) {
        lang = lang.substr(0, 2).toLowerCase();
        if (['es', 'en', 'it'].includes(lang)) {
            return lang;
        }
    }
    return 'es'; // Español por defecto si no se encuentra ninguno de los idiomas soportados
}

// Inicialización de i18next
i18next
    .use(i18nextHttpBackend)
    .init({
        lng: getPreferredLanguage(),
        fallbackLng: 'es',
        backend: {
            loadPath: './locales/{{lng}}.json'
        }
    }, function(err, t) {
        updateContent();
        updateLanguageSelect();
    });

// Función para cambiar el idioma
function changeLanguage(lng) {
    i18next.changeLanguage(lng, (err, t) => {
        if (err) return console.log('Error al cambiar el idioma', err);
        updateContent();
        updateLanguageSelect();
    });
}

// Función para actualizar el contenido
function updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = i18next.t(key);
    });
}

// Función para actualizar el select de idiomas
function updateLanguageSelect() {
    const select = document.getElementById('languageSelect');
    select.value = i18next.language;
}

// Evento para cambiar el idioma
document.getElementById('languageSelect').addEventListener('change', (e) => {
    changeLanguage(e.target.value);
});

// Modo oscuro
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Animación de fade-in al scroll
function handleScroll() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top <= windowHeight * 0.75) {
            el.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);

// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.display = 'none';
});

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    updateContent();
    updateLanguageSelect();
    
    // Aplicar el modo guardado o el preferido del usuario
    const savedScheme = localStorage.getItem('colorScheme');
    if (savedScheme) {
        applyColorScheme(savedScheme);
    } else {
        const preferredScheme = getPreferredColorScheme();
        applyColorScheme(preferredScheme);
    }
});

// Función para detectar el modo preferido del usuario
function getPreferredColorScheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

// Función para aplicar el modo oscuro o claro
function applyColorScheme(scheme) {
    if (scheme === 'dark') {
        document.body.classList.add('dark-mode');
        localStorage.setItem('colorScheme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('colorScheme', 'light');
    }
}

// Función para cambiar entre modo claro y oscuro
function toggleDarkMode() {
    if (document.body.classList.contains('dark-mode')) {
        applyColorScheme('light');
    } else {
        applyColorScheme('dark');
    }
}

// Escuchar cambios en la preferencia de color del sistema
window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
    const newColorScheme = e.matches ? 'dark' : 'light';
    applyColorScheme(newColorScheme);
});