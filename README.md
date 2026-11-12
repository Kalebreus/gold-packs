# 👑 Gold Packs - O Templo dos Colecionadores de Cartas & Abertura de Boosters

![Gold Packs Banner](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80)

<p align="center">
  <img src="https://img.shields.io/badge/Status-Concluído-gold?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/Versão-2.0.0-amber?style=for-the-badge" alt="Versão" />
  <img src="https://img.shields.io/badge/Design-Luxury%20Gold%20Glassmorphism-yellow?style=for-the-badge" alt="Design" />
  <img src="https://img.shields.io/badge/Licença-MIT-brightgreen?style=for-the-badge" alt="Licença" />
</p>

---

## 🌟 Sobre o Projeto

O **Gold Packs** é uma plataforma web premium de alta fidelidade desenvolvida para oferecer a **melhor experiência de usuário** para colecionadores de Trading Card Games (TCG) como Pokémon TCG, Magic: The Gathering, Yu-Gi-Oh! e coleções autorais.

O projeto combina uma estética luxuosa de **Dark Gold Glassmorphism**, efeitos 3D holográficos nos cards com reflexo de luz dinâmico orientado pelo mouse, áudio procedural imersivo com Web Audio API, feed interativo de vídeos comunitários de abertura de boosters e um simulador realista de unboxing com confetes dourados.

---

## 🚀 Funcionalidades Principais

### 1. 🏠 Landing Page Profissional
- **Hero Banner Imersivo**: Título marcante, tipografia refinada (*Outfit*, *Cinzel*, *Plus Jakarta Sans*) e chamada para ação com gradientes dourados.
- **Showcase 3D com Holographic Tilt**: Carta em destaque que reage ao movimento do cursor do mouse, simulando reflexo de lâmina holográfica em tempo real.
- **Ticker de Estatísticas ao Vivo**: Monitoramento de cartas no cofre, valor total da coleção, boosters abertos e índice de autenticidade.
- **Seção de Diferenciais & Benefícios**: Destaque das garantias de autenticidade, segurança nas negociações e ferramentas exclusivas.
- **Teaser Interativo**: Convite rápido para abrir o primeiro pacote grátis.

### 2. 🎴 Registro & Gestão de Cartas (Cofre Digital)
- **Cadastro Completo de Cartas**:
  - Nome da Carta
  - Categoria / TCG (Pokémon TCG, Magic: The Gathering, Yu-Gi-Oh!, Original Gold Packs)
  - Raridade com badges iluminados (*Mítica Dourada*, *Lendária*, *Épica*, *Super Rara*, *Rara*, *Comum*)
  - Valor de mercado formatado em Reais (`R$`)
  - Condição e graduação (*Mint PSA 10*, *Near Mint*, *Excellent*, etc.)
  - Acabamento (*Gold Foil*, *Holográfica*, *Texturizada*, *Secret Rare*)
  - Imagem com suporte a upload local (Base64), galeria interna ou URL da web
  - Edição, número e lore da carta
- **Métricas do Cofre em Tempo Real**: Total de cartas, valor estimado acumulado do acervo, carta mais cara e preço médio.
- **Filtros e Busca Instantânea**: Pesquisa por texto, filtro por jogo, filtro por raridade, teto de preço máximo e ordenações variadas.
- **Ações Rápidas**: Visualização de detalhes em 3D, edição dos dados, exclusão segura e botão de **negociação direta via WhatsApp** com mensagem pré-configurada.
- **Persistência Total com LocalStorage**: Todas as alterações, novas cartas e edições ficam salvas permanentemente no navegador.

### 3. 🎬 Gold Packs TV (Vídeos de Abertura de Boosters)
- **Feed Comunitário de Unboxings**: Galeria vibrante de vídeos com abertura de caixas, boosters dourados e god packs.
- **Publicação de Novos Vídeos**: Formulário intuitivo para postar vídeos via link do YouTube, com extração automática da miniatura.
- **Player Cinemático em Modal**: Assista aos vídeos sem sair da página em alta definição.
- **Engajamento Social**:
  - Sistema de curtidas (likes) interativo com persistência.
  - Sistema de comentários em tempo real para cada vídeo.
  - Informações do criador, tipo de pack aberto e valor do drop principal.

### 4. ⚡ Simulador de Abertura de Packs (Experiência Interativa)
- **Seleção de Boosters**:
  - *Booster de Prata* (3 cartas)
  - *Booster Safira Épico* (4 cartas)
  - *Gold Pack Lendário* (5 cartas com garantia de carta Mítica ou Dourada)
- **Física de Abertura 3D**:
  - Animação cinematográfica de rasgar o lacre do pacote.
  - Efeito sonoro realista de rasgo de foil gerado via Web Audio API.
  - Feixe de luz emanando do interior do booster.
- **Revelação Carta a Carta**:
  - Cartas saem viradas para baixo (Face Down) com o verso oficial Gold Packs.
  - Clique para virar (3D Card Flip) com efeito de swoosh.
  - Cartas raras, épicas e lendárias disparam fanfarras sonoras e **chuva de confetes dourados** no Canvas.
- **Integração com o Cofre**: Botão para adicionar as cartas tiradas diretamente ao catálogo do usuário com 1 clique!

### 5. 🔊 Sistema de Efeitos Sonoros Procedurais
- Desenvolvido puramente com **Web Audio API nativa** (sem arquivos `.mp3` ou `.wav` externos pesados que possam falhar).
- Efeitos sonoros para:
  - Hover suave em botões e cards
  - Cliques de seleção
  - Rasgo do pacote de booster
  - Virada de carta (flip)
  - Fanfarra para cartas raras e épicas
  - Vitória triunfante para cartas Míticas Douradas
- Botão de controle de som (🔊 / 🔇) fixo no topo.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 Semântico**: Estruturação acessível, tags semânticas, suporte a múltiplos modais nativos.
- **CSS3 Moderno**:
  - CSS Custom Properties (Variáveis de Design System)
  - Efeitos de Vidro Fosco (*Glassmorphism* com `backdrop-filter: blur`)
  - Efeito Holográfico com `radial-gradient` dinâmico e `perspective: 1000px`
  - Grid & Flexbox responsivos para todos os dispositivos
- **JavaScript ES6+**:
  - Arquitetura orientada a módulos limpos
  - Web Audio API para sintetização sonora procedural
  - HTML5 Canvas API com física de partículas para confetes
  - FileReader API para upload local de imagens sem backend
  - LocalStorage API com dados iniciais ricos (Seed inicial)

---

## 📁 Estrutura de Arquivos

```
magick ai/
├── css/
│   ├── reset.css            # Normalização de estilos
│   └── style.css            # Design System Gold Packs, responsividade e animações
├── img/                     # Acervo de artes de cartas raras e ilustrações
│   ├── Nicol bolas, dragon-god.jpg
│   ├── Umbreon ex.jpg
│   ├── Greninja EX 214_167 Twilight Masquerade.jpg
│   ├── Mago Do Caos_.jpg
│   ├── Sol Ring alter.jpg
│   ├── Full art card 23.jpg
│   ├── carta-arkanon.png
│   ├── carta-lymara.png
│   ├── carta-maldrik.png
│   ├── carta-kaelthar.png
│   ├── carta-drahven.png
│   ├── carta-nyxsombra.png
│   └── logo.png
├── js/
│   ├── app.js               # Lógica completa da aplicação Gold Packs
│   ├── index.js             # Script legado preservado
│   └── refatorado.js        # Script de filtros anterior
├── index.html               # Aplicação principal Gold Packs
├── index.old.html           # Backup da versão anterior
└── README.md                # Documentação oficial
```

---

## 💻 Como Executar o Projeto Localmente

1. Clone ou acerte o repositório local:
   ```bash
   git clone https://github.com/Kalebreus/gold-packs.git
   cd gold-packs
   ```
2. Abra o arquivo `index.html` diretamente em seu navegador preferido (Google Chrome, Edge, Firefox, Brave, Safari).
3. Ou utilize a extensão **Live Server** no Visual Studio Code para uma experiência com recarregamento automático.

---

## 🌐 Publicação no GitHub Pages

Para publicar este site gratuitamente na internet usando o GitHub Pages:

1. Acesse o repositório no GitHub: `https://github.com/Kalebreus/gold-packs`
2. Vá em **Settings** > **Pages**
3. Em **Source**, selecione a branch `main` e a pasta `/ (root)`
4. Clique em **Save**.
5. Em poucos instantes, seu site estará online em:
   `https://kalebreus.github.io/gold-packs/`

---

## 👤 Autor

Desenvolvido com paixão por **Kaleb Santos** (`Kalebreus`).  
Fique à vontade para contribuir, abrir issues ou dar uma estrela ⭐ no projeto!
