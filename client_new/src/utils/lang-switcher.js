class LanguageSwitcherUI {
    constructor() {
        this.languages = [
            { code: 'en', native: 'English', name: 'English' },
            { code: 'hi', native: 'हिन्दी', name: 'Hindi' },
            { code: 'bn', native: 'বাংলা', name: 'Bengali' },
            { code: 'mr', native: 'मराठी', name: 'Marathi' },
            { code: 'te', native: 'తెలుగు', name: 'Telugu' },
            { code: 'ta', native: 'தமிழ்', name: 'Tamil' },
            { code: 'gu', native: 'ગુજરાતી', name: 'Gujarati' },
            { code: 'ur', native: 'اردو', name: 'Urdu' },
            { code: 'kn', native: 'ಕನ್ನಡ', name: 'Kannada' },
            { code: 'or', native: 'ଓଡ଼ିଆ', name: 'Odia' },
            { code: 'ml', native: 'മലയാളം', name: 'Malayalam' },
            { code: 'pa', native: 'ਪੰਜਾਬੀ', name: 'Punjabi' },
            { code: 'as', native: 'অসমীয়া', name: 'Assamese' },
            { code: 'mai', native: 'मैथिली', name: 'Maithili' },
            { code: 'sat', native: 'संताली', name: 'Santali' },
            { code: 'ks', native: 'कश्मीरी', name: 'Kashmiri' },
            { code: 'ne', native: 'नेपाली', name: 'Nepali' },
            { code: 'gom', native: 'कोंकणी', name: 'Konkani' },
            { code: 'sd', native: 'सिंधी', name: 'Sindhi' },
            { code: 'doi', native: 'डोगरी', name: 'Dogri' },
            { code: 'mni', native: 'মণিপুরী', name: 'Manipuri' },
            { code: 'brx', native: 'बर’', name: 'Bodo' },
            { code: 'sa', native: 'संस्कृतम्', name: 'Sanskrit' },
            { code: 'bho', native: 'भोजपुरी', name: 'Bhojpuri' },
            { code: 'raj', native: 'राजस्थानी', name: 'Rajasthani' },
            { code: 'mwr', native: 'मारवाड़ी', name: 'Marwari' },
            { code: 'hne', native: 'छत्तीसगढ़ी', name: 'Chhattisgarhi' },
            { code: 'bgc', native: 'हरियाणवी', name: 'Haryanvi' },
            { code: 'mag', native: 'मगही', name: 'Magahi' },
            { code: 'bhb', native: 'भीली', name: 'Bhili' },
            { code: 'tcy', native: 'तुलु', name: 'Tulu' },
            { code: 'gon', native: 'गोंडी', name: 'Gondi' },
            { code: 'lus', native: 'Mizo', name: 'Mizo' },
            { code: 'kha', native: 'Khasi', name: 'Khasi' },
            { code: 'trp', native: 'Kokborok', name: 'Kokborok' }
        ];

        this.currentLang = localStorage.getItem('crisisMitraLang') || 'en';
        this.init();
    }

    init() {
        this.injectGoogleTranslate();
        this.createDOM();
        this.bindEvents();
        this.updateActiveState();
    }

    injectGoogleTranslate() {
        if (!document.querySelector('#google-translate-script')) {
            const script = document.createElement('script');
            script.id = 'google-translate-script';
            script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            document.body.appendChild(script);

            // Initialize function expected by Google
            window.googleTranslateElementInit = () => {
                new window.google.translate.TranslateElement({
                    pageLanguage: 'en',
                    includedLanguages: this.languages.map(l => l.code).join(','),
                    layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                    autoDisplay: false
                }, 'google_translate_element');
            };
        }

        // Create hidden container for Google's widget
        if (!document.getElementById('google_translate_element')) {
            const div = document.createElement('div');
            div.id = 'google_translate_element';
            div.style.display = 'none';
            document.body.appendChild(div);
        }
    }

    createDOM() {
        // Create FAB
        const fab = document.createElement('button');
        fab.className = 'lang-fab notranslate'; // Prevent FAB translation
        fab.innerHTML = `
            <svg viewBox="0 0 24 24">
                <path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
            </svg>
        `;
        document.body.appendChild(fab);
        this.fab = fab;

        // Create Modal
        const overlay = document.createElement('div');
        overlay.className = 'lang-modal-overlay notranslate'; // Prevent Modal translation
        overlay.innerHTML = `
            <div class="lang-modal">
                <div class="lang-modal-header">
                    <h2 class="lang-modal-title">Select Language</h2>
                    <button class="lang-modal-close">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 6L6 18M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div class="lang-grid">
                    ${this.languages.map(lang => `
                        <div class="lang-card" data-lang="${lang.code}">
                            <span class="lang-native-name">${lang.native}</span>
                            <span class="lang-english-name">${lang.name}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
        this.overlay = overlay;
        this.modal = overlay.querySelector('.lang-modal');
    }

    bindEvents() {
        // FAB Click
        this.fab.addEventListener('click', () => this.open());

        // Close Button
        this.overlay.querySelector('.lang-modal-close').addEventListener('click', () => this.close());

        // Overlay Click
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.close();
        });

        // Language Selection
        this.modal.querySelectorAll('.lang-card').forEach(card => {
            card.addEventListener('click', () => {
                const langCode = card.dataset.lang;
                this.setLanguage(langCode);
            });
        });

        // Escape Key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.overlay.classList.contains('open')) {
                this.close();
            }
        });

        // Sync across tabs
        window.addEventListener('storage', (e) => {
            if (e.key === 'crisisMitraLang' && e.newValue && e.newValue !== this.currentLang) {
                console.log('Language changed in another tab:', e.newValue);
                this.setLanguage(e.newValue, false); // false to suppress reload if already same, but setLanguage reloads anyway.
            }
        });
    }

    open() {
        this.overlay.classList.add('open');
        this.updateActiveState();
    }

    close() {
        this.overlay.classList.remove('open');
    }

    updateActiveState() {
        this.modal.querySelectorAll('.lang-card').forEach(card => {
            if (card.dataset.lang === this.currentLang) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }

    setLanguage(langCode, shouldReload = true) {
        // Set Google Translate Cookie
        document.cookie = `googtrans=/en/${langCode}; path=/; domain=${window.location.hostname}`;
        document.cookie = `googtrans=/en/${langCode}; path=/`;

        // Save preference
        localStorage.setItem('crisisMitraLang', langCode);
        this.currentLang = langCode;

        this.updateActiveState();

        if (shouldReload) {
            window.location.reload();
        }
    }
}

// Export for usage in React
export default new LanguageSwitcherUI();
