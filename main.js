const characterListEl = document.querySelector('.character-list');
const mainContent = document.querySelector('.main-content');
const regionNav = document.querySelector('.side-nav');
const backgroundContainer = document.querySelector('.background-container');
const root = document.documentElement;

let activeCharacterIndex = 0;
let isScrolling = false;
let allCharacters = [];
let currentCharacters = [];

// --- THEME ENGINE --- //

function getAverageColorFromImage(imgUrl) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = imgUrl;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const width = canvas.width = img.width;
            const height = canvas.height = img.height;

            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, width, height).data;
            let r = 0, g = 0, b = 0;
            let count = 0;

            for (let i = 0; i < imageData.length; i += 4 * 10) {
                r += imageData[i];
                g += imageData[i + 1];
                b += imageData[i + 2];
                count++;
            }

            r = ~~(r / count);
            g = ~~(g / count);
            b = ~~(b / count);

            resolve({ r, g, b });
        };

        img.onerror = (err) => {
            console.error("Error loading image for color analysis:", err);
            reject(err);
        };
    });
}

function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max == min) {
        h = s = 0;
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [h, s, l];
}

async function updateTheme(imageUrl) {
    try {
        const { r, g, b } = await getAverageColorFromImage(imageUrl);
        const [h, s, l] = rgbToHsl(r, g, b);

        const accentHue = h;
        const accentSaturation = Math.min(s + 0.3, 1);
        const accentLightness = Math.max(l, 0.5);

        const accentColor = `hsl(${accentHue * 360}, ${accentSaturation * 100}%, ${accentLightness * 100}%)`;
        const brightAccentColor = `hsl(${accentHue * 360}, ${Math.min(s + 0.4, 1) * 100}%, ${Math.min(accentLightness + 0.1, 0.6) * 100}%)`;
        const panelBgColor = `hsla(${accentHue * 360}, ${s * 100}%, 10%, 0.5)`;
        const cardActiveBg = `hsla(${accentHue * 360}, ${s * 100}%, 50%, 0.2)`;
        const cardGlowColor = `hsla(${accentHue * 360}, ${Math.min(s + 0.4, 1) * 100}%, ${Math.min(accentLightness + 0.1, 0.6) * 100}%, 0.6)`;

        root.style.setProperty('--accent-color', accentColor);
        root.style.setProperty('--accent-gradient', `linear-gradient(to right, ${brightAccentColor}, transparent)`);
        root.style.setProperty('--panel-bg-color', panelBgColor);
        root.style.setProperty('--character-card-active-bg', cardActiveBg);
        root.style.setProperty('--character-card-glow-color', cardGlowColor);

    } catch (error) {
        console.error("Failed to update theme:", error);
    }
}

// --- APPLICATION LOGIC --- //

async function fetchCharacters() {
    try {
        const response = await fetch('characters.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        allCharacters = await response.json();
        const defaultRegionLink = regionNav.querySelector('a');
        defaultRegionLink.classList.add('active');
        const defaultRegion = defaultRegionLink.textContent.trim();
        initializeContent(defaultRegion);
    } catch (error) {
        console.error("Could not fetch characters:", error);
    }
}

function initializeContent(region) {
    currentCharacters = allCharacters.filter(char => char.region.toUpperCase() === region.toUpperCase());
    
    let scenesHTML = '';
    let characterListHTML = '';
    let backgroundHTML = '';

    currentCharacters.forEach((character, index) => {
        backgroundHTML += `
            <div class="background-image ${index === 0 ? 'active' : ''}" 
                 style="background-image: url('${character.image}');" 
                 data-index="${index}">
            </div>`;
        scenesHTML += `
            <div class="scene ${index === 0 ? 'active' : ''}" data-index="${index}">
                <div class="character-info">
                    <h1 class="character-name">${character.name}</h1>
                    <p class="character-description">${character.description}</p>
                </div>
            </div>
        `;
        characterListHTML += `
            <div class="character-card ${index === 0 ? 'active' : ''}" data-index="${index}">
                <img src="${character.cardImage}" alt="${character.name}">
                <div class="character-name-overlay">${character.name}</div>
            </div>
        `;
    });

    backgroundContainer.innerHTML = backgroundHTML;
    mainContent.innerHTML = scenesHTML;
    characterListEl.innerHTML = characterListHTML;
    activeCharacterIndex = 0;

    if (currentCharacters.length > 0) {
        updateTheme(currentCharacters[0].image);
    }
}

function setActiveCharacter(index) {
    if (isScrolling || index < 0 || index >= currentCharacters.length || index === activeCharacterIndex) return;

    isScrolling = true;
    activeCharacterIndex = index;

    document.querySelectorAll('.background-image').forEach(bg => bg.classList.remove('active'));
    document.querySelector(`.background-image[data-index="${index}"]`).classList.add('active');

    document.querySelectorAll('.scene').forEach(scene => scene.classList.remove('active'));
    document.querySelector(`.scene[data-index="${index}"]`).classList.add('active');

    document.querySelectorAll('.character-card').forEach(card => card.classList.remove('active'));
    const activeCard = document.querySelector(`.character-card[data-index="${index}"]`);
    activeCard.classList.add('active');
    activeCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

    if (currentCharacters[index]) {
        updateTheme(currentCharacters[index].image);
    }

    setTimeout(() => {
        isScrolling = false;
    }, 800);
}

// --- EVENT LISTENERS ---

window.addEventListener('wheel', (event) => {
    if (isScrolling) return;
    const direction = event.deltaY > 0 ? 1 : -1;
    setActiveCharacter(activeCharacterIndex + direction);
});

characterListEl.addEventListener('click', (event) => {
    const card = event.target.closest('.character-card');
    if (card && card.dataset.index) {
        const index = parseInt(card.dataset.index, 10);
        setActiveCharacter(index);
    }
});

regionNav.addEventListener('click', (event) => {
    const regionLink = event.target.closest('a');
    if (regionLink) {
        event.preventDefault();
        const selectedRegion = regionLink.textContent.trim();
        
        document.querySelectorAll('.side-nav a').forEach(link => link.classList.remove('active'));
        regionLink.classList.add('active');
        
        initializeContent(selectedRegion);
    }
});

// Initial Fetch
fetchCharacters();
