document.addEventListener('DOMContentLoaded', () => {

    // --- DOM ELEMENTS ---
    const topNav = document.querySelector('.top-nav');
    const startBrowsingBtn = document.getElementById('start-browsing-btn');
    const pages = document.querySelectorAll('.page');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    const characterListEl = document.querySelector('#characters-page .character-list');
    const mainContent = document.querySelector('#characters-page .main-content');
    const regionNav = document.querySelector('#characters-page .side-nav');
    const backgroundContainer = document.querySelector('#characters-page .background-container');
    const root = document.documentElement;

    // --- STATE VARIABLES ---
    let activeCharacterIndex = 0;
    let isScrolling = false;
    let allCharacters = [];
    let currentCharacters = [];
    let isCharactersInitialized = false;

    // --- CORE PAGE NAVIGATION ---
    function switchPage(targetPageId) {
        pages.forEach(page => page.classList.remove('active'));
        const targetPage = document.getElementById(targetPageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        document.querySelectorAll('.top-nav a').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.target === targetPageId.replace('-page', '')) {
                link.classList.add('active');
            }
        });
        
        const isCharactersActive = targetPageId === 'characters-page';
        scrollIndicator.style.display = isCharactersActive ? 'block' : 'none';

        if (isCharactersActive && !isCharactersInitialized) {
            initializeCharactersPage();
        }
    }

    // --- THEME ENGINE (for Characters page) --- //

    function getAverageColorFromImage(imgUrl) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = imgUrl;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width; canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const data = ctx.getImageData(0, 0, img.width, img.height).data;
                let r = 0, g = 0, b = 0, count = 0;
                for (let i = 0; i < data.length; i += 20) { // Sample pixels
                    r += data[i]; g += data[i+1]; b += data[i+2];
                    count++;
                }
                resolve({ r: ~~(r/count), g: ~~(g/count), b: ~~(b/count) });
            };
            img.onerror = reject;
        });
    }

    function rgbToHsl(r, g, b) {
        r /= 255, g /= 255, b /= 255;
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        if (max == min) { h = s = 0; } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max){ case r: h = (g - b) / d + (g < b ? 6 : 0); break; case g: h = (b - r) / d + 2; break; case b: h = (r - g) / d + 4; break; }
            h /= 6;
        }
        return [h, s, l];
    }

    async function updateTheme(imageUrl) {
        try {
            const { r, g, b } = await getAverageColorFromImage(imageUrl);
            const [h, s, l] = rgbToHsl(r, g, b);

            const accentColor = `hsl(${h * 360}, ${Math.min(s + 0.3, 1) * 100}%, ${Math.max(l, 0.5) * 100}%)`;
            const brightAccent = `hsl(${h * 360}, ${Math.min(s + 0.4, 1) * 100}%, ${Math.min(l + 0.1, 0.6) * 100}%)`;
            
            const activeCardBg = `hsla(${h * 360}, ${Math.min(s + 0.3, 1) * 100}%, ${Math.max(l, 0.5) * 100}%, 0.2)`;
            const glowColor = `hsla(${h * 360}, ${Math.min(s + 0.3, 1) * 100}%, ${Math.max(l, 0.5) * 100}%, 0.6)`;
            const dynamicBorderColor = `hsla(${h * 360}, ${Math.min(s + 0.2, 1) * 100}%, ${Math.max(l, 0.4) * 100}%, 0.5)`;

            root.style.setProperty('--accent-color', accentColor);
            root.style.setProperty('--accent-gradient', `linear-gradient(to right, ${brightAccent}, transparent)`);
            root.style.setProperty('--character-card-active-bg', activeCardBg);
            root.style.setProperty('--character-card-glow-color', glowColor);
            root.style.setProperty('--dynamic-border-color', dynamicBorderColor);

        } catch (error) {
            console.error("Failed to update theme:", error);
            // Fallback to default static colors if image processing fails
            root.style.setProperty('--accent-color', '#bf7bf1');
            root.style.setProperty('--accent-gradient', 'linear-gradient(to right, #d900ff, transparent)');
            root.style.setProperty('--character-card-active-bg', 'rgba(191, 123, 241, 0.2)');
            root.style.setProperty('--character-card-glow-color', 'rgba(191, 123, 241, 0.6)');
            root.style.setProperty('--dynamic-border-color', 'rgba(255, 255, 255, 0.1)');
        }
    }

    // --- CHARACTERS PAGE LOGIC --- //

    async function initializeCharactersPage() {
        try {
            const response = await fetch('./characters.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            allCharacters = await response.json();
            const defaultRegionLink = regionNav.querySelector('a');
            if (defaultRegionLink) {
                defaultRegionLink.classList.add('active');
                renderCharacterContent(defaultRegionLink.textContent.trim());
            }
            isCharactersInitialized = true;
        } catch (error) {
            console.error("Could not initialize characters page:", error);
        }
    }

    function renderCharacterContent(region) {
        currentCharacters = allCharacters.filter(char => char.region.toUpperCase() === region.toUpperCase());
        let scenesHTML = '', listHTML = '', bgHTML = '';

        currentCharacters.forEach((char, index) => {
            const isActive = index === 0;
            bgHTML += `<div class="background-image ${isActive ? 'active' : ''}" style="background-image: url('${char.image}');" data-index="${index}"></div>`;
            scenesHTML += `<div class="scene ${isActive ? 'active' : ''}" data-index="${index}"><div class="character-info"><h1 class="character-name">${char.name}</h1><p class="character-description">${char.description}</p></div></div>`;
            listHTML += `<div class="character-card ${isActive ? 'active' : ''}" data-index="${index}"><img src="${char.cardImage}" alt="${char.name}"><div class="character-name-overlay">${char.name}</div></div>`;
        });

        backgroundContainer.innerHTML = bgHTML;
        mainContent.innerHTML = scenesHTML;
        characterListEl.innerHTML = listHTML;
        activeCharacterIndex = 0;

        if (currentCharacters.length > 0) {
            updateTheme(currentCharacters[0].image);
        }
    }

    function setActiveCharacter(index) {
        if (isScrolling || index < 0 || index >= currentCharacters.length || index === activeCharacterIndex) return;
        isScrolling = true;
        activeCharacterIndex = index;

        document.querySelectorAll('#characters-page .background-image, #characters-page .scene, #characters-page .character-card').forEach(el => el.classList.remove('active'));
        document.querySelector(`#characters-page .background-image[data-index="${index}"]`).classList.add('active');
        document.querySelector(`#characters-page .scene[data-index="${index}"]`).classList.add('active');
        const activeCard = document.querySelector(`#characters-page .character-card[data-index="${index}"]`);
        activeCard.classList.add('active');
        activeCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

        if (currentCharacters[index]) {
            updateTheme(currentCharacters[index].image);
        }
        setTimeout(() => { isScrolling = false; }, 800);
    }

    // --- EVENT LISTENERS ---

    topNav.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.dataset.target) {
            e.preventDefault();
            switchPage(link.dataset.target + '-page');
        }
    });

    startBrowsingBtn.addEventListener('click', () => switchPage('characters-page'));

    window.addEventListener('wheel', (e) => {
        if (!document.getElementById('characters-page').classList.contains('active') || isScrolling) return;
        setActiveCharacter(activeCharacterIndex + (e.deltaY > 0 ? 1 : -1));
    });

    characterListEl.addEventListener('click', (e) => {
        const card = e.target.closest('.character-card');
        if (card) setActiveCharacter(parseInt(card.dataset.index));
    });

    regionNav.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link) {
            e.preventDefault();
            document.querySelectorAll('#characters-page .side-nav a').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            renderCharacterContent(link.textContent.trim());
        }
    });
    
    // Initial setup
    switchPage('home-page');
});