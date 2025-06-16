// Game loader functionality
window.GameLoader = class {
    constructor() {
        this.games = [];
        this.currentLanguage = 'en';
        this.basePath = this.getBasePath();
        this.isLoading = false;
        this.filteredGames = [];
        this.addFullscreenButtonStyles();
        this.init(); // 改用 init 方法来初始化
    }

    async init() {
        await this.loadGames(); // 等待游戏数据加载完成
        // 根据当前页面类型加载不同的内容
        if (window.location.pathname.includes('game-detail.html')) {
            this.loadGameDetail();
        } else if (window.location.pathname.includes('games.html')) {
            this.loadGamesList();
        } else {
            this.renderFeaturedGames();
        }
    }

    getBasePath() {
        const path = window.location.pathname;
        return path.includes('/pages/') ? '..' : '.';
    }

    async loadGames() {
        try {
            this.isLoading = true;
            const response = await fetch(`${this.basePath}/data/games.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.games = data.games;
            this.isLoading = false;
        } catch (error) {
            console.error('Error loading games:', error);
            this.isLoading = false;
            this.showError('Failed to load games data');
        }
    }

    loadGamesList() {
        const gamesGrid = document.getElementById('games-grid');
        if (!gamesGrid) return;

        // 显示加载指示器
        const loadingIndicator = document.getElementById('loading');
        if (loadingIndicator) {
            loadingIndicator.classList.remove('hidden');
        }

        // 初始化过滤后的游戏列表
        this.filteredGames = [...this.games];

        // 渲染游戏列表
        this.renderGamesList();

        // 隐藏加载指示器
        if (loadingIndicator) {
            loadingIndicator.classList.add('hidden');
        }

        // 添加过滤器事件监听
        this.setupFilters();
    }

    renderGamesList() {
        const gamesGrid = document.getElementById('games-grid');
        const noResults = document.getElementById('no-results');
        
        if (!gamesGrid) return;

        if (this.filteredGames.length === 0) {
            gamesGrid.innerHTML = '';
            if (noResults) {
                noResults.classList.remove('hidden');
            }
            return;
        }

        if (noResults) {
            noResults.classList.add('hidden');
        }

        gamesGrid.innerHTML = this.filteredGames.map(game => this.createGameCard(game)).join('');
    }

    setupFilters() {
        const categoryFilter = document.getElementById('category-filter');
        const difficultyFilter = document.getElementById('difficulty-filter');
        const searchInput = document.getElementById('search');

        if (categoryFilter) {
            categoryFilter.addEventListener('change', () => this.applyFilters());
        }

        if (difficultyFilter) {
            difficultyFilter.addEventListener('change', () => this.applyFilters());
        }

        if (searchInput) {
            searchInput.addEventListener('input', () => this.applyFilters());
        }
    }

    applyFilters() {
        const categoryFilter = document.getElementById('category-filter');
        const difficultyFilter = document.getElementById('difficulty-filter');
        const searchInput = document.getElementById('search');

        const selectedCategory = categoryFilter ? categoryFilter.value : '';
        const selectedDifficulty = difficultyFilter ? difficultyFilter.value : '';
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

        this.filteredGames = this.games.filter(game => {
            const matchesCategory = !selectedCategory || game.category === selectedCategory;
            const matchesDifficulty = !selectedDifficulty || game.difficulty === selectedDifficulty;
            const matchesSearch = !searchTerm || 
                game.title.toLowerCase().includes(searchTerm) ||
                game.description.toLowerCase().includes(searchTerm) ||
                game.tags.some(tag => tag.toLowerCase().includes(searchTerm));

            return matchesCategory && matchesDifficulty && matchesSearch;
        });

        this.renderGamesList();
    }

    renderFeaturedGames() {
        const featuredGamesContainer = document.getElementById('featured-games');
        if (!featuredGamesContainer) return;

        // Get first 3 games as featured
        const featuredGames = this.games.slice(0, 3);
        
        featuredGamesContainer.innerHTML = featuredGames.map(game => this.createGameCard(game)).join('');
    }

    createGameCard(game) {
        const title = this.currentLanguage === 'zh' ? game.title_zh : game.title;
        const description = this.currentLanguage === 'zh' ? game.description_zh : game.description;
        
        // 修正图片路径和游戏详情页链接
        const thumbnailPath = game.thumbnail.startsWith('/') ? game.thumbnail : `${this.basePath}/${game.thumbnail.replace(/^\.\.\//, '')}`;
        const detailPath = `${this.basePath}/pages/game-detail.html?id=${game.id}`;

        return `
            <div class="bg-white rounded-lg shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex flex-col h-full max-w-sm mx-auto">
                <div class="relative overflow-hidden rounded-t-lg group">
                    <img src="${thumbnailPath}" alt="${title}" class="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-110">
                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                </div>
                <div class="p-6 flex-1 flex flex-col">
                    <h3 class="text-xl font-semibold mb-3 text-gray-900 hover:text-primary transition-colors duration-300">${title}</h3>
                    <p class="text-gray-600 mb-4 flex-1 line-clamp-3" style="min-height: 4.5rem">${description}</p>
                    <div class="flex justify-center items-center mt-auto pt-4 border-t border-gray-100">
                        <a href="${detailPath}" 
                           class="bg-primary text-white px-8 py-2.5 rounded-full text-sm font-medium hover:bg-primary-dark hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300 w-full text-center">
                            ${this.currentLanguage === 'zh' ? '开始游戏' : 'Play Now'}
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    async loadGameDetail() {
        const urlParams = new URLSearchParams(window.location.search);
        const gameId = urlParams.get('id');
        
        if (!gameId) {
            this.showError('Game ID not found');
            return;
        }

        try {
            const game = this.games.find(g => g.id === gameId);
            
            if (!game) {
                this.showError('Game not found');
                return;
            }

            const container = document.getElementById('game-container');
            if (!container) return;

            // 创建游戏内容
            const gameContent = document.createElement('div');
            gameContent.className = 'space-y-6';
            
            // 游戏标题（居中）
            const titleSection = document.createElement('div');
            titleSection.className = 'text-center mb-6';
            
            const title = document.createElement('h1');
            title.className = 'text-4xl font-bold text-gray-900';
            title.textContent = this.currentLanguage === 'zh' ? game.title_zh : game.title;
            titleSection.appendChild(title);
            
            gameContent.appendChild(titleSection);

            // 游戏描述（标题下方）
            const description = document.createElement('div');
            description.className = 'prose max-w-none mb-6 text-center text-gray-600';
            description.innerHTML = this.currentLanguage === 'zh' ? game.description_zh : game.description;
            gameContent.appendChild(description);

            // 游戏区域
            const gameArea = document.createElement('div');
            gameArea.className = 'aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden';
            
            const iframe = document.createElement('iframe');
            iframe.src = game.iframeUrl;
            iframe.className = 'w-full h-full';
            iframe.allow = 'fullscreen';
            iframe.title = game.title;
            
            gameArea.appendChild(iframe);
            gameContent.appendChild(gameArea);

            // 添加全屏切换按钮
            const fullscreenButton = document.createElement('button');
            fullscreenButton.className = 'fullscreen-toggle mt-4 mx-auto block';
            fullscreenButton.onclick = () => this.toggleFullscreen(iframe);
            fullscreenButton.innerHTML = '<span data-translate="game.fullscreen">Fullscreen</span>';
            gameContent.appendChild(fullscreenButton);

            // 添加游戏玩法说明
            const howToPlaySection = document.createElement('div');
            howToPlaySection.className = 'mt-8 bg-blue-50 rounded-lg p-6';
            
            const howToPlayTitle = document.createElement('h2');
            howToPlayTitle.className = 'text-2xl font-bold text-gray-900 mb-4';
            howToPlayTitle.textContent = this.currentLanguage === 'zh' ? '游戏玩法' : 'How to Play';
            howToPlaySection.appendChild(howToPlayTitle);

            // 根据游戏ID添加不同的玩法说明
            const instructions = this.getGameInstructions(game.id);
            const instructionsList = document.createElement('ul');
            instructionsList.className = 'space-y-3 text-gray-700';
            
            instructions.forEach(instruction => {
                const li = document.createElement('li');
                li.className = 'flex items-start';
                li.innerHTML = `
                    <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 mr-3 mt-0.5 flex-shrink-0">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4"></path>
                        </svg>
                    </span>
                    <span>${this.currentLanguage === 'zh' ? instruction.zh : instruction.en}</span>
                `;
                instructionsList.appendChild(li);
            });
            
            howToPlaySection.appendChild(instructionsList);

            // 添加键盘控制图示
            const controlsDiv = document.createElement('div');
            controlsDiv.className = 'mt-6 p-4 bg-white rounded-lg shadow-sm flex flex-wrap gap-4 justify-center';
            
            const controls = [
                { key: '↑', desc: this.currentLanguage === 'zh' ? '向上移动' : 'Move Up' },
                { key: '↓', desc: this.currentLanguage === 'zh' ? '向下移动' : 'Move Down' },
                { key: '←', desc: this.currentLanguage === 'zh' ? '向左移动' : 'Move Left' },
                { key: '→', desc: this.currentLanguage === 'zh' ? '向右移动' : 'Move Right' },
                { key: 'Space', desc: this.currentLanguage === 'zh' ? '暂停/继续' : 'Pause/Resume' }
            ];

            controls.forEach(control => {
                const keyDiv = document.createElement('div');
                keyDiv.className = 'flex items-center space-x-2';
                keyDiv.innerHTML = `
                    <span class="inline-block px-4 py-2 bg-gray-100 rounded-lg font-mono font-bold text-gray-700">${control.key}</span>
                    <span class="text-gray-600">${control.desc}</span>
                `;
                controlsDiv.appendChild(keyDiv);
            });

            howToPlaySection.appendChild(controlsDiv);
            gameContent.appendChild(howToPlaySection);

            // 游戏标签（底部）
            const tags = document.createElement('div');
            tags.className = 'flex flex-wrap gap-2 mt-8';
            game.tags.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.className = 'px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm';
                tagElement.textContent = tag;
                tags.appendChild(tagElement);
            });
            gameContent.appendChild(tags);

            // 清空容器并添加新内容
            container.innerHTML = '';
            container.appendChild(gameContent);

            // 加载相关游戏
            this.loadRelatedGames(game.category, gameId);

        } catch (error) {
            console.error('Error loading game detail:', error);
            this.showError('Failed to load game details');
        }
    }

    getGameInstructions(gameId) {
        // 通用说明（所有贪吃蛇游戏都适用的基础操作）
        const commonInstructions = [
            {
                en: "Use arrow keys to control the snake's direction",
                zh: "使用方向键控制蛇的移动方向"
            },
            {
                en: "Eat the food to grow longer and earn points",
                zh: "吃掉食物来增长长度并获得分数"
            },
            {
                en: "Avoid hitting the walls and your own tail",
                zh: "避免撞到墙壁和自己的尾巴"
            }
        ];

        // 查找当前游戏
        const game = this.games.find(g => g.id === gameId);
        
        // 如果找到游戏且有特定说明，则合并通用说明和特定说明
        if (game && game.instructions) {
            return [...commonInstructions, ...game.instructions];
        }
        
        // 如果没有找到游戏或没有特定说明，则只返回通用说明
        return commonInstructions;
    }

    // 添加全屏切换方法
    toggleFullscreen(iframe) {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            iframe.requestFullscreen();
        }
    }

    // 添加全屏切换按钮样式
    addFullscreenButtonStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .fullscreen-toggle {
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 1rem auto;
                padding: 0.75rem 1.5rem;
                background: #007bff;
                color: white;
                border-radius: 0.5rem;
                font-size: 1rem;
                border: none;
                cursor: pointer;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                transition: background-color 0.3s, transform 0.2s;
            }
            .fullscreen-toggle:hover {
                background-color: #0056b3;
                transform: translateY(-2px);
            }
        `;
        document.head.appendChild(style);
    }

    loadRelatedGames(category, gameId) {
        const relatedGamesContainer = document.getElementById('related-games');
        if (!relatedGamesContainer) return;

        // Get games from the same category, excluding the current game
        const relatedGames = this.games
            .filter(game => game.category === category && game.id !== gameId)
            .slice(0, 3);

        // Update container content
        relatedGamesContainer.innerHTML = relatedGames.length ? relatedGames.map(game => `
            <div class="bg-white rounded-lg shadow-sm overflow-hidden">
                <img src="${game.thumbnail}" alt="${game.title}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h3 class="text-xl font-semibold mb-2">${game.title}</h3>
                    <p class="text-gray-600 mb-4">${game.description.substring(0, 100)}...</p>
                    <a href="game-detail.html?id=${game.id}" class="inline-block bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                        Play Now
                    </a>
                </div>
            </div>
        `).join('') : '<p class="text-gray-500">No related games found.</p>';
    }

    showError(message) {
        console.error(message);
        const container = document.getElementById('game-container');
        if (container) {
            container.innerHTML = `<div class="text-center text-red-600 py-8">${message}</div>`;
        }
    }
};

// Initialize game loader
const gameLoader = new GameLoader();

// 等待 DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing game loader...');
    gameLoader.init();
}); 