const allCharacters = [
    // Inazuma
    {
        name: 'RAIDEN SHOGUN',
        description: `Her Excellency, the Almighty Narukami Ogosho, the exalted ruler of the Inazuma Shogunate. With the might of lightning at her disposal, she commits herself to the solitary pursuit of eternity.`,
        image: 'https://genshin.honeyhunterworld.com/img/raiden_046_gacha_splash.webp',
        cardImage: 'https://i.pinimg.com/564x/c3/84/48/c3844853a84616c39a7b29a1d13b35f2.jpg',
        demoVideo: '"Raiden Shogun: Judgment of Euthymia"',
        region: 'INAZUMA'
    },
    {
        name: 'YAE MIKO',
        description: `The head shrine maiden of the Grand Narukami Shrine, she is a descendant of the Kitsune lineage. She is intelligent and cunning, and not a person to be trifled with.`,
        image: 'https://genshin.honeyhunterworld.com/img/yae_051_gacha_splash.webp',
        cardImage: 'https://i.pinimg.com/564x/01/a7/3c/01a73ce35d1f568600d8d47346338b8a.jpg',
        demoVideo: '"Yae Miko: Divine Ingenuity"',
        region: 'INAZUMA'
    },
    {
        name: 'KAMISATO AYAKA',
        description: `She is the eldest daughter of the Kamisato Clan and the sister of Kamisato Ayato. Beautiful, elegant, and graceful, the common folk of Inazuma have nothing but praise for her.`,
        image: 'https://genshin.honeyhunterworld.com/img/ayaka_002_gacha_splash.webp',
        cardImage: 'https://i.pinimg.com/564x/27/ea/87/27ea8714380a061453982829e061b400.jpg',
        demoVideo: '"Kamisato Ayaka: The Homeward Heron"',
        region: 'INAZUMA'
    },

    // Liyue
    {
        name: 'Zhongli',
        description: `A mysterious expert contracted by the Wangsheng Funeral Parlor. Extremely knowledgeable in all things.`,
        image: 'https://genshin.honeyhunterworld.com/img/zhongli_030_gacha_splash.webp',
        cardImage: 'https://i.pinimg.com/564x/0a/33/c8/0a33c8c7f39558778d8434a87a8e7e4e.jpg',
        demoVideo: '"Zhongli: The Listener"',
        region: 'LIYUE'
    },
    {
        name: 'Ganyu',
        description: `The secretary to the Liyue Qixing. The blood of both human and illuminated beast flows within her veins.`,
        image: 'https://genshin.honeyhunterworld.com/img/ganyu_037_gacha_splash.webp',
        cardImage: 'https://i.pinimg.com/564x/b8/5b/c8/b85bc8f5f6e80b439c2c62f275e7adef.jpg',
        demoVideo: '"Ganyu: A Night in Liyue"',
        region: 'LIYUE'
    },

    // Mondstadt
    {
        name: 'Jean',
        description: `The Acting Grand Master of the Knights of Favonius. She is always busy with her duties and maintains the peace in Mondstadt.`,
        image: 'https://genshin.honeyhunterworld.com/img/jean_003_gacha_splash.webp',
        cardImage: 'https://i.pinimg.com/564x/57/3e/27/573e279eb80685b882410a35b1381c8b.jpg',
        demoVideo: '"Jean: The Dandelion Knight"',
        region: 'MONSTADT'
    },
    {
        name: 'Diluc',
        description: `The tycoon of a winery empire in Mondstadt, unparalleled in every possible way.`,
        image: 'https://genshin.honeyhunterworld.com/img/diluc_016_gacha_splash.webp',
        cardImage: 'https://i.pinimg.com/564x/44/89/36/4489363a23a3d5a2d65518b2b713337a.jpg',
        demoVideo: '"Diluc: The Dark Side of Dawn"',
        region: 'MONSTADT'
    },

    // Sumeru
    {
        name: 'Nahida',
        description: 'The vessel of Buer, the current Dendro Archon. She is a gentle and kind-hearted deity who seeks to understand and protect her people.',
        image: 'https://genshin.honeyhunterworld.com/img/nahida_071_gacha_splash.webp',
        cardImage: 'https://i.pinimg.com/564x/2c/b8/7a/2cb87a1a0fde7a90b3969168f07d2c36.jpg',
        demoVideo: '"Nahida: Withering Away"',
        region: 'SUMERU'
    },
    {
        name: 'Tighnari',
        description: 'A young researcher well-versed in botany who serves as a Forest Watcher in Avidya Forest. He is a warm and helpful person with a passion for knowledge.',
        image: 'https://genshin.honeyhunterworld.com/img/tighnari_061_gacha_splash.webp',
        cardImage: 'https://i.pinimg.com/564x/4a/5b/1d/4a5b1dd66d787d559c5e31b6732a3f78.jpg',
        demoVideo: '"Tighnari: Plant Patrol"',
        region: 'SUMERU'
    },

    // Fontaine
    {
        name: 'Furina',
        description: 'The former Hydro Archon of Fontaine. She is a dramatic and flamboyant figure who loves to be the center of attention, but also carries a heavy burden.',
        image: 'https://genshin.honeyhunterworld.com/img/furina_089_gacha_splash.webp',
        cardImage: 'https://i.pinimg.com/564x/9e/7b/07/9e7b07e7b165b6f3c4c9d53c65c2b04f.jpg',
        demoVideo: '"Furina: All the World\'s a Stage"',
        region: 'FONTAINE'
    },
    {
        name: 'Neuvillette',
        description: 'The Iudex of Fontaine and the leader of the Marechaussee Phantom. He is a calm, impartial, and powerful figure who judges both humans and gods.',
        image: 'https://genshin.honeyhunterworld.com/img/neuvillette_088_gacha_splash.webp',
        cardImage: 'https://i.pinimg.com/564x/9e/d4/7b/9ed47b2e9d80d2208d1a12e2c071d7c3.jpg',
        demoVideo: '"Neuvillette: To the Risers of the Tide"',
        region: 'FONTAINE'
    }
];

const characterList = document.querySelector('.character-list');
const mainContent = document.querySelector('.main-content');
const regionNav = document.querySelector('.side-nav');

let activeSceneIndex = 0;
let isScrolling = false;
let currentCharacters = [];

function initializeContent(region) {
    currentCharacters = allCharacters.filter(char => char.region === region);
    
    let scenesHTML = '';
    let characterListHTML = '';

    currentCharacters.forEach((character, index) => {
        scenesHTML += `
            <div class="scene ${index === 0 ? 'active' : ''}" data-index="${index}">
                <div class="character-info">
                    <h1 class="character-name">${character.name}</h1>
                    <p class="character-description">${character.description}</p>
                    <a href="#" class="read-more">Read more &gt;</a>
                    <div class="character-demo">
                        <div class="play-button">
                            <svg viewBox="0 0 100 100"><polygon points="30,20 80,50 30,80"></polygon></svg>
                        </div>
                        <div class="demo-text">
                            <p>Watch Character Demo:</p><p>${character.demoVideo}</p>
                        </div>
                    </div>
                </div>
                <div class="character-image">
                    <img src="${character.image}" alt="${character.name}">
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

    mainContent.innerHTML = scenesHTML;
    characterList.innerHTML = characterListHTML;
    activeSceneIndex = 0;
}

function setActiveScene(index) {
    if (isScrolling || index < 0 || index >= currentCharacters.length) return;

    isScrolling = true;
    activeSceneIndex = index;

    document.querySelectorAll('.scene').forEach(scene => scene.classList.remove('active'));
    document.querySelector(`.scene[data-index="${index}"]`).classList.add('active');

    document.querySelectorAll('.character-card').forEach(card => card.classList.remove('active'));
    document.querySelector(`.character-card[data-index="${index}"]`).classList.add('active');

    setTimeout(() => {
        isScrolling = false;
    }, 800);
}

window.addEventListener('wheel', (event) => {
    if (isScrolling) return;

    if (event.deltaY > 0) {
        setActiveScene(activeSceneIndex + 1);
    } else {
        setActiveScene(activeSceneIndex - 1);
    }
});

characterList.addEventListener('click', (event) => {
    const card = event.target.closest('.character-card');
    if (card && card.dataset.index) {
        const index = parseInt(card.dataset.index, 10);
        setActiveScene(index);
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

// Initialize with the default active region
const defaultRegion = document.querySelector('.side-nav a.active').textContent.trim();
initializeContent(defaultRegion);
