/**
 * GOLD PACKS - Aplicação Principal
 * O Templo dos Colecionadores de Cartas & Abertura de Boosters
 */

// ==========================================================================
// 1. SISTEMA PROCEDURAL DE ÁUDIO (Web Audio API)
// Não necessita de arquivos externos; funciona 100% offline e com alta fidelidade.
// ==========================================================================
class SoundSystem {
  constructor() {
    this.audioCtx = null;
    this.isMuted = localStorage.getItem('goldpacks_muted') === 'true';
    this.updateToggleIcon();
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggle() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('goldpacks_muted', this.isMuted);
    this.updateToggleIcon();
    showToast(this.isMuted ? '🔇 Efeitos sonoros desativados' : '🔊 Efeitos sonoros ativados');
  }

  updateToggleIcon() {
    const btn = document.getElementById('soundToggleBtn');
    if (!btn) return;
    btn.innerHTML = this.isMuted
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
  }

  playHover() {
    if (this.isMuted) return;
    try {
      this.init();
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(620, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(780, this.audioCtx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.04, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.04);
    } catch (e) {}
  }

  playClick() {
    if (this.isMuted) return;
    try {
      this.init();
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, this.audioCtx.currentTime + 0.07);
      gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.07);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.07);
    } catch (e) {}
  }

  playTearPack() {
    if (this.isMuted) return;
    try {
      this.init();
      const bufferSize = this.audioCtx.sampleRate * 0.45;
      const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = this.audioCtx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, this.audioCtx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(350, this.audioCtx.currentTime + 0.45);
      filter.Q.setValueAtTime(3, this.audioCtx.currentTime);

      const gain = this.audioCtx.createGain();
      gain.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.45);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);

      whiteNoise.start();
      whiteNoise.stop(this.audioCtx.currentTime + 0.45);
    } catch (e) {}
  }

  playCardFlip() {
    if (this.isMuted) return;
    try {
      this.init();
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(240, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(540, this.audioCtx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.15, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.12);
    } catch (e) {}
  }

  playFanfareRare() {
    if (this.isMuted) return;
    try {
      this.init();
      const notes = [440, 554.37, 659.25, 880]; // A major
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0, this.audioCtx.currentTime + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.14, this.audioCtx.currentTime + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + idx * 0.08 + 0.35);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(this.audioCtx.currentTime + idx * 0.08);
        osc.stop(this.audioCtx.currentTime + idx * 0.08 + 0.35);
      });
    } catch (e) {}
  }

  playMythicFanfare() {
    if (this.isMuted) return;
    try {
      this.init();
      const chords = [
        [523.25, 659.25, 783.99], // C
        [587.33, 739.99, 880.00], // D
        [659.25, 830.61, 987.77], // E
        [1046.50, 1318.51, 1567.98] // C high triumphant
      ];
      chords.forEach((chord, cIdx) => {
        chord.forEach(freq => {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = 'sine';
          const startTime = this.audioCtx.currentTime + cIdx * 0.14;
          osc.frequency.setValueAtTime(freq, startTime);
          gain.gain.setValueAtTime(0, startTime);
          gain.gain.linearRampToValueAtTime(0.18, startTime + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.5);
          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          osc.start(startTime);
          osc.stop(startTime + 0.5);
        });
      });
    } catch (e) {}
  }
}

const sounds = new SoundSystem();

// ==========================================================================
// 2. DADOS INICIAIS (SEED)
// Cartas de alto valor e beleza visual utilizando as imagens locais reais da pasta img/
// ==========================================================================
const DEFAULT_CARDS = [
  {
    id: 'c1',
    nome: 'Nicol Bolas, Dragon-God',
    categoria: 'Magic: The Gathering',
    raridade: 'Mítica Dourada',
    preco: 3000,
    imagem: './img/Nicol bolas, dragon-god.jpg',
    condicao: 'Mint (PSA 10)',
    acabamento: 'Gold Foil Holográfica',
    edicao: 'War of the Spark #193',
    descricao: 'Dragão Ancião Planeswalker lendário com o poder de usurpar habilidades de todos os outros planeswalkers no campo.',
    dataRegistro: '2025-10-15'
  },
  {
    id: 'c2',
    nome: 'Umbreon EX - Moonbreon',
    categoria: 'Pokémon TCG',
    raridade: 'Épica',
    preco: 4200,
    imagem: './img/Umbreon ex.jpg',
    condicao: 'Near Mint (PSA 9)',
    acabamento: 'Foil Holográfica',
    edicao: 'Evolving Skies #215',
    descricao: 'A icônica arte secreta de Umbreon alcançando a lua. Uma das cartas mais procuradas e valorizadas da era moderna.',
    dataRegistro: '2025-10-18'
  },
  {
    id: 'c3',
    nome: 'Greninja EX - Special Illustration Rare',
    categoria: 'Pokémon TCG',
    raridade: 'Épica',
    preco: 1850,
    imagem: './img/Greninja EX 214_167 Twilight Masquerade.jpg',
    condicao: 'Mint (PSA 10)',
    acabamento: 'Texturizada Especial',
    edicao: 'Twilight Masquerade #214/167',
    descricao: 'Greninja invocando lâminas d’água brilhantes com acabamento de texturas tridimensionais.',
    dataRegistro: '2025-11-01'
  },
  {
    id: 'c4',
    nome: 'Mago do Caos das Trevas',
    categoria: 'Yu-Gi-Oh!',
    raridade: 'Lendária',
    preco: 2400,
    imagem: './img/Mago Do Caos_.jpg',
    condicao: 'Mint (PSA 10)',
    acabamento: 'Secret Rare Dourada',
    edicao: 'Invasion of Chaos 1ª Edição',
    descricao: 'O supremo invocador das magias cerimoniais ancestrais com ataque e controle místico sem igual.',
    dataRegistro: '2025-11-04'
  },
  {
    id: 'c5',
    nome: 'Sol Ring - Masterpiece Series',
    categoria: 'Magic: The Gathering',
    raridade: 'Mítica Dourada',
    preco: 1650,
    imagem: './img/Sol Ring alter.jpg',
    condicao: 'Mint (PSA 10)',
    acabamento: 'Gold Foil Masterpiece',
    edicao: 'Kaladesh Inventions #001',
    descricao: 'O anel do sol forjado em aether refinado. O artefato definitivo para qualquer comandante lendário.',
    dataRegistro: '2025-11-08'
  },
  {
    id: 'c6',
    nome: 'Charizard & Reshiram Tag Team GX',
    categoria: 'Pokémon TCG',
    raridade: 'Lendária',
    preco: 980,
    imagem: './img/Full art card 23.jpg',
    condicao: 'Near Mint',
    acabamento: 'Rainbow Hyper Rare',
    edicao: 'Unbroken Bonds #217',
    descricao: 'Dupla lendária de fogo com ataque GX colossal de 300 de dano e ilustração estendida full art.',
    dataRegistro: '2025-11-10'
  },
  {
    id: 'c7',
    nome: 'Arkanon, Lorde das Trevas',
    categoria: 'Original Gold Packs',
    raridade: 'Lendária',
    preco: 2100,
    imagem: './img/carta-arkanon.png',
    condicao: 'Mint (PSA 10)',
    acabamento: 'Foil Holográfica',
    edicao: 'Série Mestres #001',
    descricao: 'Cavaleiro corrompido que empunha a lâmina do abismo com armadura encantada de obsidiana.',
    dataRegistro: '2025-09-12'
  },
  {
    id: 'c8',
    nome: 'Lymara, Guardiã Celestial',
    categoria: 'Original Gold Packs',
    raridade: 'Épica',
    preco: 1400,
    imagem: './img/carta-lymara.png',
    condicao: 'Near Mint',
    acabamento: 'Foil Holográfica',
    edicao: 'Série Mestres #004',
    descricao: 'Arcanista das estrelas capaz de curar aliados e lançar tempestades de luz radiante.',
    dataRegistro: '2025-09-15'
  },
  {
    id: 'c9',
    nome: 'Maldrik, O Conquistador',
    categoria: 'Original Gold Packs',
    raridade: 'Rara',
    preco: 1500,
    imagem: './img/carta-maldrik.png',
    condicao: 'Excellent',
    acabamento: 'Normal',
    edicao: 'Série Mestres #007',
    descricao: 'Guerreiro de ferro que liderou as legiões das terras altas com seu machado de guerra ancestral.',
    dataRegistro: '2025-09-20'
  },
  {
    id: 'c10',
    nome: 'Kaelthar, Sentinela do Vale',
    categoria: 'Original Gold Packs',
    raridade: 'Comum',
    preco: 800,
    imagem: './img/carta-kaelthar.png',
    condicao: 'Good',
    acabamento: 'Normal',
    edicao: 'Série Mestres #012',
    descricao: 'Defensor ágil com precisão de tiro mortal através das névoas eternas.',
    dataRegistro: '2025-10-02'
  },
  {
    id: 'c11',
    nome: 'Drahven, O Forjador de Sombras',
    categoria: 'Original Gold Packs',
    raridade: 'Comum',
    preco: 600,
    imagem: './img/carta-drahven.png',
    condicao: 'Good',
    acabamento: 'Normal',
    edicao: 'Série Mestres #019',
    descricao: 'Especialista em magias arcanas de camuflagem e venenos silenciosos.',
    dataRegistro: '2025-10-05'
  },
  {
    id: 'c12',
    nome: 'Nyxsombra, Lâmina Furtiva',
    categoria: 'Original Gold Packs',
    raridade: 'Comum',
    preco: 400,
    imagem: './img/carta-nyxsombra.png',
    condicao: 'Played',
    acabamento: 'Normal',
    edicao: 'Série Mestres #022',
    descricao: 'Assassino que se dissolve nas sombras da noite atacando de surpresa.',
    dataRegistro: '2025-10-10'
  }
];

const DEFAULT_VIDEOS = [
  {
    id: 'v1',
    titulo: 'ABRINDO UM GOLD PACK LENDÁRIO E TIREI NICOL BOLAS MÍTICO DOURADO!',
    autor: 'Kaleb Collector',
    avatar: 'K',
    tipoPack: 'Booster Dourado 1ª Edição',
    pullDestaque: 'Nicol Bolas, Dragon-God (Mítica)',
    valorPull: 3000,
    youtubeId: 'W1il8jYqO_g',
    videoUrl: 'https://www.youtube.com/watch?v=W1il8jYqO_g',
    thumbUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    curtidas: 1420,
    duracao: '14:22',
    data: 'Há 2 dias',
    tag: '⭐ GOD PACK',
    comentarios: [
      { usuario: 'Pedro_TCG', texto: 'Inacreditável esse pull! A carta está impecável, nota 10 com certeza!', data: 'Há 1 dia' },
      { usuario: 'AnaPaula_Cards', texto: 'A embalagem dourada desse Gold Pack dá uma emoção absurda quando rasga!', data: 'Há 18 horas' }
    ]
  },
  {
    id: 'v2',
    titulo: 'GOD PACK REAL! TIREI O UMBREON MOONBREON NA ÚLTIMA CARTA DA BOX!',
    autor: 'BoosterHunter BR',
    avatar: 'B',
    tipoPack: 'Box Display 36 Boosters',
    pullDestaque: 'Umbreon EX Alternate Art',
    valorPull: 4200,
    youtubeId: 'e8q56f6sK6g',
    videoUrl: 'https://www.youtube.com/watch?v=e8q56f6sK6g',
    thumbUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    curtidas: 2890,
    duracao: '19:40',
    data: 'Há 4 dias',
    tag: '🔥 PULL ÉPICO',
    comentarios: [
      { usuario: 'Marcos_TCG', texto: 'Mano, eu gritei junto com você no final do vídeo! Que sorte monumental!', data: 'Há 3 dias' }
    ]
  },
  {
    id: 'v3',
    titulo: 'DESAFIO: GASTEI R$ 5.000 EM GOLD PACKS E VEJA O QUE SAIU!',
    autor: 'Mestres do Pack',
    avatar: 'M',
    tipoPack: 'Gold Pack Master Collection',
    pullDestaque: 'Sol Ring Masterpiece + Greninja EX',
    valorPull: 3500,
    youtubeId: 'w5hF5qC0iXQ',
    videoUrl: 'https://www.youtube.com/watch?v=w5hF5qC0iXQ',
    thumbUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    curtidas: 984,
    duracao: '22:15',
    data: 'Há 1 semana',
    tag: '💎 MASTER BOX',
    comentarios: [
      { usuario: 'ThiagoVip', texto: 'O valor de mercado dessas cartas vai subir muito ainda.', data: 'Há 5 dias' }
    ]
  }
];

// ==========================================================================
// 3. PERSISTÊNCIA (LocalStorage)
// ==========================================================================
class StorageManager {
  static getCards() {
    const raw = localStorage.getItem('goldpacks_cards');
    if (!raw) {
      localStorage.setItem('goldpacks_cards', JSON.stringify(DEFAULT_CARDS));
      return [...DEFAULT_CARDS];
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      return [...DEFAULT_CARDS];
    }
  }

  static saveCards(cards) {
    localStorage.setItem('goldpacks_cards', JSON.stringify(cards));
  }

  static getVideos() {
    const raw = localStorage.getItem('goldpacks_videos');
    if (!raw) {
      localStorage.setItem('goldpacks_videos', JSON.stringify(DEFAULT_VIDEOS));
      return [...DEFAULT_VIDEOS];
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      return [...DEFAULT_VIDEOS];
    }
  }

  static saveVideos(videos) {
    localStorage.setItem('goldpacks_videos', JSON.stringify(videos));
  }
}

// ==========================================================================
// 4. ESTADO GLOBAL DA APLICAÇÃO
// ==========================================================================
let cardsList = StorageManager.getCards();
let videosList = StorageManager.getVideos();
let currentFilter = {
  search: '',
  category: '',
  rarity: '',
  maxPrice: '',
  sort: 'price-desc'
};
let currentVideoFilter = 'all';

// ==========================================================================
// 5. NAVEGAÇÃO DE ABAS
// ==========================================================================
function switchTab(tabId) {
  sounds.playClick();
  const tabs = document.querySelectorAll('.view-tab');
  const navBtns = document.querySelectorAll('.nav-tab-btn');

  tabs.forEach(tab => {
    tab.classList.remove('active');
  });

  navBtns.forEach(btn => {
    if (btn.dataset.tab === tabId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const targetTab = document.getElementById(tabId);
  if (targetTab) {
    targetTab.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.location.hash = tabId;
  }
}

// ==========================================================================
// 6. UTILITÁRIOS VISUAIS E FORMATADORES
// ==========================================================================
function formatCurrency(val) {
  const num = Number(val) || 0;
  return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function getRarityBadgeClass(rarity) {
  const r = (rarity || '').toLowerCase();
  if (r.includes('mítica') || r.includes('mitica') || r.includes('ouro') || r.includes('gold')) return 'badge-mitica';
  if (r.includes('lendária') || r.includes('lendaria')) return 'badge-lendaria';
  if (r.includes('épica') || r.includes('epica')) return 'badge-epica';
  if (r.includes('super')) return 'badge-super-rara';
  if (r.includes('rara')) return 'badge-rara';
  return 'badge-comum';
}

function showToast(message, icon = '✨') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-text">${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-exit');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 350);
  }, 3200);
}

// ==========================================================================
// 7. RENDERIZAÇÃO DO COFRE & REGISTRO DE CARTAS
// ==========================================================================
function renderVaultMetrics() {
  const totalCards = cardsList.length;
  const totalValue = cardsList.reduce((acc, c) => acc + (Number(c.preco) || 0), 0);
  const highestPrice = cardsList.length > 0 ? Math.max(...cardsList.map(c => Number(c.preco) || 0)) : 0;
  const avgPrice = totalCards > 0 ? totalValue / totalCards : 0;

  const metricTotalCount = document.getElementById('metricTotalCount');
  const metricTotalValue = document.getElementById('metricTotalValue');
  const metricHighestPrice = document.getElementById('metricHighestPrice');
  const metricAvgPrice = document.getElementById('metricAvgPrice');

  if (metricTotalCount) metricTotalCount.textContent = totalCards;
  if (metricTotalValue) metricTotalValue.textContent = formatCurrency(totalValue);
  if (metricHighestPrice) metricHighestPrice.textContent = formatCurrency(highestPrice);
  if (metricAvgPrice) metricAvgPrice.textContent = formatCurrency(avgPrice);

  // Também atualiza o ticker da Landing Page
  const homeCount = document.getElementById('homeTotalCards');
  const homeVal = document.getElementById('homeTotalValue');
  if (homeCount) homeCount.textContent = totalCards + ' Cartas';
  if (homeVal) homeVal.textContent = formatCurrency(totalValue);
}

function renderCards() {
  const grid = document.getElementById('cardsGrid');
  if (!grid) return;

  // Filtragem
  let filtered = cardsList.filter(card => {
    // Busca por nome ou edição
    if (currentFilter.search) {
      const q = currentFilter.search.toLowerCase();
      const matchName = card.nome.toLowerCase().includes(q);
      const matchEd = (card.edicao || '').toLowerCase().includes(q);
      if (!matchName && !matchEd) return false;
    }
    // Categoria
    if (currentFilter.category && card.categoria.toLowerCase() !== currentFilter.category.toLowerCase()) {
      return false;
    }
    // Raridade
    if (currentFilter.rarity && card.raridade.toLowerCase() !== currentFilter.rarity.toLowerCase()) {
      return false;
    }
    // Preço Máximo
    if (currentFilter.maxPrice && Number(card.preco) > Number(currentFilter.maxPrice)) {
      return false;
    }
    return true;
  });

  // Ordenação
  filtered.sort((a, b) => {
    if (currentFilter.sort === 'price-desc') return Number(b.preco) - Number(a.preco);
    if (currentFilter.sort === 'price-asc') return Number(a.preco) - Number(b.preco);
    if (currentFilter.sort === 'name-asc') return a.nome.localeCompare(b.nome);
    if (currentFilter.sort === 'recent') return new Date(b.dataRegistro || 0) - new Date(a.dataRegistro || 0);
    return 0;
  });

  grid.innerHTML = '';

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
        <h3>Nenhuma carta encontrada</h3>
        <p>Não há cartas que correspondam aos filtros selecionados. Tente ajustar os parâmetros ou cadastre uma nova carta.</p>
        <button class="btn btn-gold" onclick="openAddCardModal()">+ Registrar Nova Carta</button>
      </div>
    `;
    return;
  }

  filtered.forEach(card => {
    const cardEl = document.createElement('div');
    cardEl.className = 'card-item';
    cardEl.setAttribute('data-rarity', card.raridade);
    cardEl.setAttribute('data-id', card.id);

    const rarityBadgeClass = getRarityBadgeClass(card.raridade);
    const whatsappMsg = encodeURIComponent(`Olá Gold Packs! Tenho interesse na carta *${card.nome}* (${card.raridade}) no valor de ${formatCurrency(card.preco)}. Ela ainda está disponível?`);

    cardEl.innerHTML = `
      <div class="card-image-box" onclick="openCardDetailModal('${card.id}')">
        <img src="${card.imagem}" alt="${card.nome}" class="card-img" loading="lazy" onerror="this.src='./img/carta-arkanon.png'">
        <div class="card-holo-glare"></div>
        <div class="card-top-badges">
          <span class="card-category-tag">${card.categoria}</span>
          <span class="badge ${rarityBadgeClass}">${card.raridade}</span>
        </div>
      </div>
      <div class="card-details-box">
        <div class="card-title-row">
          <h3 class="card-name" title="${card.nome}">${card.nome}</h3>
        </div>
        <div class="card-meta-line">
          <span class="card-condition-badge">🛡️ ${card.condicao || 'Mint'}</span>
          <span>•</span>
          <span>${card.edicao || '1ª Edição'}</span>
        </div>
        <div class="card-price-row">
          <div>
            <div class="price-label">Valor de Mercado</div>
            <div class="price-value">${formatCurrency(card.preco)}</div>
          </div>
        </div>
        <div class="card-actions-row">
          <a href="https://wa.me/5511988185893?text=${whatsappMsg}" target="_blank" class="btn btn-whatsapp" style="padding: 9px 14px; font-size: 0.85rem;" title="Negociar ou Comprar via WhatsApp">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            Negociar
          </a>
          <button class="btn-card-action btn-edit" onclick="openEditCardModal('${card.id}')" title="Editar carta">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          </button>
          <button class="btn-card-action btn-delete" onclick="deleteCard('${card.id}')" title="Excluir carta">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>
      </div>
    `;

    // Efeito 3D Holographic Tilt no mouse
    setupCardTilt(cardEl);

    grid.appendChild(cardEl);
  });
}

function setupCardTilt(card) {
  const imgBox = card.querySelector('.card-image-box');
  const glare = card.querySelector('.card-holo-glare');
  if (!imgBox || !glare) return;

  imgBox.addEventListener('mousemove', (e) => {
    const rect = imgBox.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 215, 0, 0.3) 35%, transparent 70%)`;
  });

  imgBox.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
}

// ==========================================================================
// 8. CRUD DE CARTAS (MODAIS DE CADASTRO E EDIÇÃO)
// ==========================================================================
function openAddCardModal() {
  sounds.playClick();
  const form = document.getElementById('cardForm');
  if (form) form.reset();

  document.getElementById('modalCardTitle').textContent = 'Registrar Nova Carta';
  document.getElementById('cardIdInput').value = '';
  document.getElementById('cardImgPreview').src = './img/Nicol bolas, dragon-god.jpg';
  document.getElementById('cardImgSelect').value = './img/Nicol bolas, dragon-god.jpg';

  const modal = document.getElementById('cardModal');
  if (modal) modal.classList.add('active');
}

function openEditCardModal(cardId) {
  sounds.playClick();
  const card = cardsList.find(c => c.id === cardId);
  if (!card) return;

  document.getElementById('modalCardTitle').textContent = 'Editar Carta';
  document.getElementById('cardIdInput').value = card.id;
  document.getElementById('cardNomeInput').value = card.nome;
  document.getElementById('cardCategoriaInput').value = card.categoria;
  document.getElementById('cardRaridadeInput').value = card.raridade;
  document.getElementById('cardPrecoInput').value = card.preco;
  document.getElementById('cardCondicaoInput').value = card.condicao || 'Mint (PSA 10)';
  document.getElementById('cardAcabamentoInput').value = card.acabamento || 'Foil Holográfica';
  document.getElementById('cardEdicaoInput').value = card.edicao || '';
  document.getElementById('cardDescricaoInput').value = card.descricao || '';
  document.getElementById('cardImgUrlInput').value = card.imagem.startsWith('data:') ? '' : card.imagem;
  document.getElementById('cardImgPreview').src = card.imagem;

  const modal = document.getElementById('cardModal');
  if (modal) modal.classList.add('active');
}

function closeCardModal() {
  sounds.playClick();
  const modal = document.getElementById('cardModal');
  if (modal) modal.classList.remove('active');
}

function handleCardFormSubmit(e) {
  e.preventDefault();
  sounds.playFanfareRare();

  const id = document.getElementById('cardIdInput').value;
  const nome = document.getElementById('cardNomeInput').value.trim();
  const categoria = document.getElementById('cardCategoriaInput').value;
  const raridade = document.getElementById('cardRaridadeInput').value;
  const preco = parseFloat(document.getElementById('cardPrecoInput').value) || 0;
  const condicao = document.getElementById('cardCondicaoInput').value;
  const acabamento = document.getElementById('cardAcabamentoInput').value;
  const edicao = document.getElementById('cardEdicaoInput').value.trim();
  const descricao = document.getElementById('cardDescricaoInput').value.trim();

  // Imagem: se houver imagem no preview
  const imagem = document.getElementById('cardImgPreview').src || './img/Nicol bolas, dragon-god.jpg';

  if (!nome || preco <= 0) {
    showToast('Por favor, preencha o nome e um preço válido maior que zero.', '⚠️');
    return;
  }

  if (id) {
    // Editar
    const idx = cardsList.findIndex(c => c.id === id);
    if (idx !== -1) {
      cardsList[idx] = {
        ...cardsList[idx],
        nome,
        categoria,
        raridade,
        preco,
        condicao,
        acabamento,
        edicao,
        descricao,
        imagem
      };
      showToast(`Carta "${nome}" atualizada com sucesso!`, '✨');
    }
  } else {
    // Criar novo
    const newCard = {
      id: 'c_' + Date.now(),
      nome,
      categoria,
      raridade,
      preco,
      condicao,
      acabamento,
      edicao,
      descricao,
      imagem,
      dataRegistro: new Date().toISOString().split('T')[0]
    };
    cardsList.unshift(newCard);
    showToast(`Carta "${nome}" registrada no Gold Packs!`, '🏆');
  }

  StorageManager.saveCards(cardsList);
  renderVaultMetrics();
  renderCards();
  closeCardModal();
}

function deleteCard(id) {
  sounds.playClick();
  const card = cardsList.find(c => c.id === id);
  if (!card) return;

  if (confirm(`Tem certeza que deseja remover a carta "${card.nome}" do catálogo?`)) {
    cardsList = cardsList.filter(c => c.id !== id);
    StorageManager.saveCards(cardsList);
    renderVaultMetrics();
    renderCards();
    showToast(`Carta "${card.nome}" removida.`, '🗑️');
  }
}

// Modal Detalhes 3D da Carta
function openCardDetailModal(cardId) {
  sounds.playCardFlip();
  const card = cardsList.find(c => c.id === cardId);
  if (!card) return;

  const content = document.getElementById('cardDetailBody');
  if (!content) return;

  const rarityBadgeClass = getRarityBadgeClass(card.raridade);
  const whatsappMsg = encodeURIComponent(`Olá Gold Packs! Gostaria de comprar a carta *${card.nome}* (${card.raridade}) por ${formatCurrency(card.preco)}. Aguardo retorno!`);

  content.innerHTML = `
    <div class="card-detail-layout">
      <div class="detail-img-box">
        <img src="${card.imagem}" alt="${card.nome}">
      </div>
      <div class="detail-info-pane">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <span class="card-category-tag">${card.categoria}</span>
          <span class="badge ${rarityBadgeClass}">${card.raridade}</span>
        </div>
        <h2 style="font-size: 1.8rem; margin-bottom: 8px;">${card.nome}</h2>
        <div style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 16px;">
          Edição: <strong>${card.edicao || '1ª Edição Especial'}</strong> | Condição: <strong>${card.condicao || 'Mint'}</strong>
        </div>
        <p style="font-size: 0.95rem; line-height: 1.6; color: #D1D5DB; margin-bottom: 20px;">
          ${card.descricao || 'Carta lendária guardada em cofre climatizado com autenticação verificada pela comunidade Gold Packs.'}
        </p>
        
        <div class="detail-price-box">
          <div>
            <div style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase;">Preço Avaliado</div>
            <div style="font-family:var(--font-heading); font-size:1.8rem; font-weight:800; color:#10B981;">
              ${formatCurrency(card.preco)}
            </div>
          </div>
          <a href="https://wa.me/5511988185893?text=${whatsappMsg}" target="_blank" class="btn btn-whatsapp">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            Comprar via WhatsApp
          </a>
        </div>

        <div style="margin-top:auto; display:flex; gap:10px;">
          <button class="btn btn-secondary" style="flex:1;" onclick="openEditCardModal('${card.id}'); closeCardDetailModal();">
            Editar Informações
          </button>
          <button class="btn btn-gold-outline" style="flex:1;" onclick="closeCardDetailModal();">
            Fechar
          </button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('cardDetailModal').classList.add('active');
}

function closeCardDetailModal() {
  sounds.playClick();
  const modal = document.getElementById('cardDetailModal');
  if (modal) modal.classList.remove('active');
}

// ==========================================================================
// 9. ABA: GOLD PACKS TV (FEED DE VÍDEOS DE ABERTURA)
// ==========================================================================
function renderVideos() {
  const grid = document.getElementById('videosGrid');
  if (!grid) return;

  let filtered = [...videosList];
  if (currentVideoFilter === 'gold') {
    filtered = filtered.filter(v => (v.tipoPack || '').toLowerCase().includes('dourado') || (v.tag || '').includes('GOD PACK'));
  } else if (currentVideoFilter === 'boxes') {
    filtered = filtered.filter(v => (v.tipoPack || '').toLowerCase().includes('box'));
  } else if (currentVideoFilter === 'epic') {
    filtered = filtered.filter(v => (v.tag || '').includes('ÉPICO') || (v.tag || '').includes('GOD PACK'));
  } else if (currentVideoFilter === 'most-liked') {
    filtered.sort((a, b) => (b.curtidas || 0) - (a.curtidas || 0));
  }

  grid.innerHTML = '';

  filtered.forEach(video => {
    const card = document.createElement('div');
    card.className = 'video-card';

    card.innerHTML = `
      <div class="video-thumb-box" onclick="openVideoPlayerModal('${video.id}')">
        <img src="${video.thumbUrl}" alt="${video.titulo}" class="video-thumb-img" loading="lazy">
        <div class="video-card-badge">
          <span class="badge badge-mitica">${video.tag || '🔥 ABERTURA'}</span>
        </div>
        <span class="video-duration-badge">${video.duracao || '12:00'}</span>
        <div class="video-play-overlay">
          <div class="play-circle-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </div>
        </div>
      </div>
      <div class="video-info-box">
        <div class="video-author-row">
          <div class="author-avatar">${video.avatar || 'U'}</div>
          <span class="author-name">${video.autor}</span>
          <span class="video-date">${video.data || 'Recente'}</span>
        </div>
        <h3 class="video-title" onclick="openVideoPlayerModal('${video.id}')" style="cursor:pointer;">${video.titulo}</h3>
        
        <div class="video-pull-highlights">
          <div>
            <div style="font-size:0.72rem; color:var(--text-muted); text-transform:uppercase;">Drop Principal</div>
            <div class="pull-card-name">✨ ${video.pullDestaque}</div>
          </div>
          <div class="pull-value">+ ${formatCurrency(video.valorPull)}</div>
        </div>

        <div class="video-social-row">
          <button class="social-btn like-btn ${isLiked(video.id) ? 'liked' : ''}" onclick="toggleLikeVideo('${video.id}', this)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            <span class="like-count">${video.curtidas || 0}</span>
          </button>
          
          <button class="social-btn" onclick="openVideoPlayerModal('${video.id}')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <span>${(video.comentarios && video.comentarios.length) || 0} comentários</span>
          </button>

          <button class="social-btn" onclick="shareVideo('${video.titulo}')" title="Compartilhar vídeo">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
          </button>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

function isLiked(videoId) {
  const likedList = JSON.parse(localStorage.getItem('goldpacks_liked_videos') || '[]');
  return likedList.includes(videoId);
}

function toggleLikeVideo(videoId, btnEl) {
  sounds.playClick();
  let likedList = JSON.parse(localStorage.getItem('goldpacks_liked_videos') || '[]');
  const video = videosList.find(v => v.id === videoId);
  if (!video) return;

  const countEl = btnEl.querySelector('.like-count');

  if (likedList.includes(videoId)) {
    likedList = likedList.filter(id => id !== videoId);
    video.curtidas = Math.max(0, (video.curtidas || 1) - 1);
    btnEl.classList.remove('liked');
  } else {
    likedList.push(videoId);
    video.curtidas = (video.curtidas || 0) + 1;
    btnEl.classList.add('liked');
    sounds.playFanfareRare();
  }

  if (countEl) countEl.textContent = video.curtidas;
  localStorage.setItem('goldpacks_liked_videos', JSON.stringify(likedList));
  StorageManager.saveVideos(videosList);
}

function shareVideo(title) {
  sounds.playClick();
  navigator.clipboard.writeText(window.location.href);
  showToast(`Link de "${title}" copiado para a área de transferência!`, '🔗');
}

// Postar Vídeo Modal
function openAddVideoModal() {
  sounds.playClick();
  const form = document.getElementById('videoForm');
  if (form) form.reset();
  document.getElementById('videoModal').classList.add('active');
}

function closeVideoModal() {
  sounds.playClick();
  document.getElementById('videoModal').classList.remove('active');
}

function extractYouTubeId(url) {
  if (!url) return '';
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  return match ? match[1] : '';
}

function handleVideoFormSubmit(e) {
  e.preventDefault();
  sounds.playMythicFanfare();

  const titulo = document.getElementById('videoTituloInput').value.trim();
  const autor = document.getElementById('videoAutorInput').value.trim() || 'Colecionador Anônimo';
  const url = document.getElementById('videoUrlInput').value.trim();
  const tipoPack = document.getElementById('videoPackInput').value.trim() || 'Booster Dourado 1ª Edição';
  const pullDestaque = document.getElementById('videoPullInput').value.trim() || 'Carta Secreta Desconhecida';
  const valorPull = parseFloat(document.getElementById('videoValorInput').value) || 1200;

  const ytId = extractYouTubeId(url);
  const thumbUrl = ytId
    ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
    : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80';

  const newVideo = {
    id: 'v_' + Date.now(),
    titulo,
    autor,
    avatar: autor.charAt(0).toUpperCase(),
    tipoPack,
    pullDestaque,
    valorPull,
    youtubeId: ytId || 'W1il8jYqO_g',
    videoUrl: url,
    thumbUrl,
    curtidas: 1,
    duracao: '15:00',
    data: 'Hoje',
    tag: valorPull >= 2000 ? '⭐ GOD PACK' : '🔥 PULL ÉPICO',
    comentarios: []
  };

  videosList.unshift(newVideo);
  StorageManager.saveVideos(videosList);
  renderVideos();
  closeVideoModal();
  showToast('Seu vídeo de abertura foi postado na Gold Packs TV!', '🎬');
}

// Modal Player de Vídeo
function openVideoPlayerModal(videoId) {
  sounds.playClick();
  const video = videosList.find(v => v.id === videoId);
  if (!video) return;

  const content = document.getElementById('videoPlayerBody');
  if (!content) return;

  const ytSrc = video.youtubeId
    ? `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`
    : `https://www.youtube.com/embed/W1il8jYqO_g?autoplay=1&rel=0`;

  let commentsHtml = '';
  if (video.comentarios && video.comentarios.length > 0) {
    commentsHtml = video.comentarios.map(c => `
      <div style="background: rgba(255,255,255,0.04); border-radius: 8px; padding: 12px; margin-bottom: 8px;">
        <div style="display:flex; justify-content:space-between; margin-bottom:4px; font-size:0.8rem; color:var(--gold-300);">
          <strong>@${c.usuario}</strong>
          <span style="color:var(--text-muted);">${c.data}</span>
        </div>
        <div style="font-size:0.9rem; color:#E5E7EB;">${c.texto}</div>
      </div>
    `).join('');
  } else {
    commentsHtml = '<p style="color:var(--text-muted); font-size:0.9rem;">Seja o primeiro a comentar sobre essa abertura espetacular!</p>';
  }

  content.innerHTML = `
    <div style="position:relative; width:100%; aspect-ratio:16/9; background:#000; border-radius:12px; overflow:hidden; margin-bottom:20px; border: 1px solid var(--border-gold);">
      <iframe src="${ytSrc}" style="width:100%; height:100%; border:none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    
    <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:20px; margin-bottom:16px;">
      <div>
        <h2 style="font-size:1.45rem; line-height:1.3; margin-bottom:8px;">${video.titulo}</h2>
        <div style="display:flex; align-items:center; gap:10px; font-size:0.9rem; color:var(--text-muted);">
          <span>Por <strong>${video.autor}</strong></span>
          <span>•</span>
          <span>Pack: <strong>${video.tipoPack}</strong></span>
        </div>
      </div>
      <div style="background:rgba(255,215,0,0.1); border:1px solid var(--border-gold); padding:8px 16px; border-radius:10px; text-align:right;">
        <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">Drop Principal</div>
        <div style="font-weight:800; color:#10B981; font-size:1.1rem;">${video.pullDestaque} (${formatCurrency(video.valorPull)})</div>
      </div>
    </div>

    <hr style="border:none; border-top:1px solid var(--border-glass); margin:20px 0;">

    <h4 style="font-size:1.1rem; margin-bottom:12px; color:var(--gold-300);">💬 Comentários da Comunidade (${(video.comentarios && video.comentarios.length) || 0})</h4>
    <div id="videoCommentsList" style="max-height: 220px; overflow-y:auto; margin-bottom:16px;">
      ${commentsHtml}
    </div>

    <form onsubmit="handleAddComment(event, '${video.id}')" style="display:flex; gap:10px;">
      <input type="text" id="newCommentInput" class="form-input" placeholder="Deixe um comentário sobre essa abertura..." style="flex:1;" required>
      <button type="submit" class="btn btn-gold" style="padding:10px 20px;">Comentar</button>
    </form>
  `;

  document.getElementById('videoPlayerModal').classList.add('active');
}

function closeVideoPlayerModal() {
  sounds.playClick();
  const modal = document.getElementById('videoPlayerModal');
  if (modal) {
    modal.classList.remove('active');
    // Para o som do iframe limpando conteúdo
    const content = document.getElementById('videoPlayerBody');
    if (content) content.innerHTML = '';
  }
}

function handleAddComment(e, videoId) {
  e.preventDefault();
  sounds.playClick();
  const input = document.getElementById('newCommentInput');
  if (!input) return;

  const texto = input.value.trim();
  if (!texto) return;

  const video = videosList.find(v => v.id === videoId);
  if (!video) return;

  if (!video.comentarios) video.comentarios = [];

  video.comentarios.push({
    usuario: 'ColecionadorVIP',
    texto,
    data: 'Agora'
  });

  StorageManager.saveVideos(videosList);
  openVideoPlayerModal(videoId);
  showToast('Comentário publicado!', '💬');
}

// ==========================================================================
// 10. SIMULADOR DE BOOSTER PACKS (EXPERIÊNCIA INTERATIVA DE ABERTURA)
// ==========================================================================
let currentPackType = 'gold';
let pulledCardsSession = [];

function selectPackType(type) {
  sounds.playClick();
  currentPackType = type;

  document.querySelectorAll('.pack-choice-card').forEach(card => {
    if (card.dataset.pack === type) {
      card.classList.add('selected');
    } else {
      card.classList.remove('selected');
    }
  });

  const stagePack = document.getElementById('stagePackWrapper');
  const stageFoil = document.getElementById('stageFoilWrap');
  if (!stageFoil) return;

  stageFoil.className = 'pack-foil-wrapper';
  if (type === 'silver') {
    stageFoil.classList.add('pack-silver-theme');
    document.getElementById('stagePackTitle').textContent = 'BOOSTER DE PRATA';
  } else if (type === 'sapphire') {
    stageFoil.classList.add('pack-sapphire-theme');
    document.getElementById('stagePackTitle').textContent = 'BOOSTER SAFIRA';
  } else {
    stageFoil.classList.add('pack-gold-theme');
    document.getElementById('stagePackTitle').textContent = 'GOLD PACK DOURADO';
  }

  // Reset arena
  document.getElementById('stagePackUnit').style.display = 'block';
  document.getElementById('pulledCardsGrid').classList.remove('active');
  document.getElementById('pulledCardsGrid').innerHTML = '';
  document.getElementById('packActionControls').style.display = 'none';
  document.getElementById('ripPackBtn').style.display = 'inline-flex';
}

function ripAndOpenPack() {
  sounds.playTearPack();

  const packUnit = document.getElementById('stagePackUnit');
  packUnit.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
  packUnit.style.transform = 'scale(1.15) rotate(5deg)';

  setTimeout(() => {
    packUnit.style.transform = 'scale(0.8) translateY(-40px)';
    packUnit.style.opacity = '0';

    setTimeout(() => {
      packUnit.style.display = 'none';
      packUnit.style.transform = '';
      packUnit.style.opacity = '1';

      generatePulledCards();
    }, 400);
  }, 350);
}

function generatePulledCards() {
  const grid = document.getElementById('pulledCardsGrid');
  grid.innerHTML = '';
  pulledCardsSession = [];

  // Quantidade de cartas dependendo do pack
  let count = currentPackType === 'gold' ? 5 : currentPackType === 'sapphire' ? 4 : 3;

  // Sorteio de cartas do nosso banco
  for (let i = 0; i < count; i++) {
    let pool = [...cardsList];
    if (currentPackType === 'gold' && i === count - 1) {
      // Última carta do Gold Pack é garantida Épica ou Mítica!
      pool = cardsList.filter(c => c.raridade === 'Mítica Dourada' || c.raridade === 'Lendária' || c.raridade === 'Épica');
    }
    const picked = pool[Math.floor(Math.random() * pool.length)];
    pulledCardsSession.push(picked);
  }

  pulledCardsSession.forEach((card, idx) => {
    const rarityClass = getRarityBadgeClass(card.raridade);

    const cardWrap = document.createElement('div');
    cardWrap.className = 'flip-card-wrap';
    cardWrap.innerHTML = `
      <div class="flip-card-inner">
        <!-- Verso (Virado para baixo) -->
        <div class="flip-card-back">
          <div class="card-back-ornament">
            <span>GP</span>
          </div>
          <span class="flip-instruction">👆 Clique para Virar</span>
        </div>
        <!-- Frente (Revelada) -->
        <div class="flip-card-front" data-rarity="${card.raridade}">
          <img src="${card.imagem}" alt="${card.nome}">
          <div class="flip-card-meta">
            <span class="badge ${rarityClass}" style="align-self:flex-start; margin-top:4px;">${card.raridade}</span>
            <div class="flip-card-name" title="${card.nome}">${card.nome}</div>
            <div class="flip-card-price">${formatCurrency(card.preco)}</div>
          </div>
        </div>
      </div>
    `;

    cardWrap.addEventListener('click', () => {
      if (!cardWrap.classList.contains('flipped')) {
        sounds.playCardFlip();
        cardWrap.classList.add('flipped');

        if (card.raridade === 'Mítica Dourada' || card.raridade === 'Lendária') {
          sounds.playMythicFanfare();
          triggerGoldConfetti();
          showToast(`🌟 PULL LENDÁRIO! Você tirou ${card.nome}!`, '🏆');
        } else if (card.raridade === 'Épica') {
          sounds.playFanfareRare();
          showToast(`✨ Carta Épica revelada: ${card.nome}!`, '💎');
        }
      }
    });

    grid.appendChild(cardWrap);
  });

  grid.classList.add('active');
  document.getElementById('ripPackBtn').style.display = 'none';
  document.getElementById('packActionControls').style.display = 'flex';
}

function flipAllPulledCards() {
  document.querySelectorAll('.flip-card-wrap').forEach((c, idx) => {
    setTimeout(() => {
      if (!c.classList.contains('flipped')) {
        c.click();
      }
    }, idx * 180);
  });
}

function savePulledCardsToVault() {
  sounds.playMythicFanfare();
  triggerGoldConfetti();

  pulledCardsSession.forEach(card => {
    const copy = {
      ...card,
      id: 'pull_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      dataRegistro: new Date().toISOString().split('T')[0]
    };
    cardsList.unshift(copy);
  });

  StorageManager.saveCards(cardsList);
  renderVaultMetrics();
  renderCards();

  showToast(`${pulledCardsSession.length} cartas tiradas foram guardadas com sucesso no seu Cofre!`, '🏆');
  switchTab('tabVault');
}

// ==========================================================================
// 11. SISTEMA DE CONFETES DOURADOS (HTML5 Canvas Procedural)
// ==========================================================================
function triggerGoldConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#FFE082', '#FFD54F', '#FFC107', '#FFA000', '#FFFFFF', '#F59E0B'];

  for (let i = 0; i < 120; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      w: Math.random() * 12 + 6,
      h: Math.random() * 8 + 4,
      vx: (Math.random() - 0.5) * 22,
      vy: (Math.random() - 0.7) * 22,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 15,
      gravity: 0.45,
      opacity: 1
    });
  }

  let animationFrame;
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let activeCount = 0;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.vRot;
      p.opacity -= 0.009;

      if (p.opacity > 0) {
        activeCount++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
    });

    if (activeCount > 0) {
      animationFrame = requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrame);
    }
  }

  render();
}

// ==========================================================================
// 12. INICIALIZAÇÃO GERAL E EVENT LISTENERS
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Inicialização de áudio após primeira interação
  document.body.addEventListener('click', () => sounds.init(), { once: true });

  // Sound toggle button
  const soundBtn = document.getElementById('soundToggleBtn');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => sounds.toggle());
  }

  // Navegação por Abas
  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      switchTab(tabId);
    });
  });

  // Hero Card 3D tilt
  const heroCardWrap = document.querySelector('.showcase-floating-card-wrapper');
  if (heroCardWrap) {
    heroCardWrap.addEventListener('mousemove', (e) => {
      const rect = heroCardWrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -16;
      const rotateY = ((x - centerX) / centerX) * 16;
      heroCardWrap.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    heroCardWrap.addEventListener('mouseleave', () => {
      heroCardWrap.style.transform = '';
    });
  }

  // Filtros de Cartas
  const searchInput = document.getElementById('cardSearchInput');
  const catFilter = document.getElementById('categoryFilter');
  const rarityFilter = document.getElementById('rarityFilter');
  const priceFilter = document.getElementById('priceFilter');
  const sortFilter = document.getElementById('sortFilter');
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentFilter.search = e.target.value;
      renderCards();
    });
  }
  if (catFilter) {
    catFilter.addEventListener('change', (e) => {
      currentFilter.category = e.target.value;
      renderCards();
    });
  }
  if (rarityFilter) {
    rarityFilter.addEventListener('change', (e) => {
      currentFilter.rarity = e.target.value;
      renderCards();
    });
  }
  if (priceFilter) {
    priceFilter.addEventListener('input', (e) => {
      currentFilter.maxPrice = e.target.value;
      renderCards();
    });
  }
  if (sortFilter) {
    sortFilter.addEventListener('change', (e) => {
      currentFilter.sort = e.target.value;
      renderCards();
    });
  }
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', () => {
      sounds.playClick();
      currentFilter = { search: '', category: '', rarity: '', maxPrice: '', sort: 'price-desc' };
      if (searchInput) searchInput.value = '';
      if (catFilter) catFilter.value = '';
      if (rarityFilter) rarityFilter.value = '';
      if (priceFilter) priceFilter.value = '';
      if (sortFilter) sortFilter.value = 'price-desc';
      renderCards();
      showToast('Filtros redefinidos');
    });
  }

  // Seletor de imagem do formulário
  const imgSelect = document.getElementById('cardImgSelect');
  const imgUrlInput = document.getElementById('cardImgUrlInput');
  const imgFileInput = document.getElementById('cardImgFileInput');
  const imgPreview = document.getElementById('cardImgPreview');

  if (imgSelect && imgPreview) {
    imgSelect.addEventListener('change', (e) => {
      if (e.target.value) {
        imgPreview.src = e.target.value;
        if (imgUrlInput) imgUrlInput.value = '';
      }
    });
  }

  if (imgUrlInput && imgPreview) {
    imgUrlInput.addEventListener('input', (e) => {
      if (e.target.value.trim()) {
        imgPreview.src = e.target.value.trim();
        if (imgSelect) imgSelect.value = '';
      }
    });
  }

  if (imgFileInput && imgPreview) {
    imgFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (re) => {
          imgPreview.src = re.target.result;
          if (imgSelect) imgSelect.value = '';
          if (imgUrlInput) imgUrlInput.value = '';
          showToast('Imagem carregada com sucesso!', '🖼️');
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Submissão do form de cartas
  const cardForm = document.getElementById('cardForm');
  if (cardForm) {
    cardForm.addEventListener('submit', handleCardFormSubmit);
  }

  // Submissão do form de vídeos
  const videoForm = document.getElementById('videoForm');
  if (videoForm) {
    videoForm.addEventListener('submit', handleVideoFormSubmit);
  }

  // Filtros de Vídeos
  document.querySelectorAll('.video-filter-tags .tag-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      sounds.playClick();
      document.querySelectorAll('.video-filter-tags .tag-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentVideoFilter = btn.dataset.filter;
      renderVideos();
    });
  });

  // Restaurar rota pelo Hash da URL
  const hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById(hash)) {
    switchTab(hash);
  } else {
    switchTab('tabHome');
  }

  // Render inicial
  renderVaultMetrics();
  renderCards();
  renderVideos();
});

// Funções globais expostas no window
window.switchTab = switchTab;
window.openAddCardModal = openAddCardModal;
window.openEditCardModal = openEditCardModal;
window.closeCardModal = closeCardModal;
window.openCardDetailModal = openCardDetailModal;
window.closeCardDetailModal = closeCardDetailModal;
window.deleteCard = deleteCard;
window.openAddVideoModal = openAddVideoModal;
window.closeVideoModal = closeVideoModal;
window.openVideoPlayerModal = openVideoPlayerModal;
window.closeVideoPlayerModal = closeVideoPlayerModal;
window.toggleLikeVideo = toggleLikeVideo;
window.shareVideo = shareVideo;
window.selectPackType = selectPackType;
window.ripAndOpenPack = ripAndOpenPack;
window.flipAllPulledCards = flipAllPulledCards;
window.savePulledCardsToVault = savePulledCardsToVault;
window.showToast = showToast;
