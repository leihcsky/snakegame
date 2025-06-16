// Language management
let currentLanguage = 'en';

const translations = {
    en: {
        'nav.games': 'Games',
        'nav.about': 'About',
        'nav.contact': 'Contact',
        'hero.title': 'Play the Best Snake Games Online',
        'hero.subtitle': 'Classic snake, modern snake, multiplayer snake and more. All free to play!',
        'hero.cta': 'Start Playing Now',
        'featured.title': 'Featured Games',
        'featured.viewAll': 'View All Games',
        'categories.title': 'Game Categories',
        'categories.classic': 'Classic Snake',
        'categories.classicDesc': 'The original snake game that started it all.',
        'categories.modern': 'Modern Snake',
        'categories.modernDesc': 'Contemporary versions with modern graphics and effects.',
        'categories.multiplayer': 'Multiplayer Snake',
        'categories.multiplayerDesc': 'Compete with friends in real-time multiplayer games.',
        'categories.themed': 'Themed Snake',
        'categories.themedDesc': 'Special themed versions with unique gameplay elements.',
        'footer.description': 'The best collection of snake games online.',
        'footer.quickLinks': 'Quick Links',
        'footer.followUs': 'Follow Us',
        // Games page translations
        'games.title': 'All Games',
        'games.filters.category': 'Category',
        'games.filters.difficulty': 'Difficulty',
        'games.filters.search': 'Search',
        'games.difficulty.easy': 'Easy',
        'games.difficulty.medium': 'Medium',
        'games.difficulty.hard': 'Hard',
        'games.noResults': 'No games found matching your criteria.',
        'games.loading': 'Loading games...',
        'games.playNow': 'Play Now',
        'games.viewDetails': 'View Details',
        // Game detail page translations
        'game.relatedGames': 'Related Games',
        'game.difficulty': 'Difficulty',
        'game.category': 'Category',
        'game.tags': 'Tags',
        'game.description': 'Description',
        'game.howToPlay': 'How to Play',
        'game.controls': 'Controls',
        'game.share': 'Share Game',
        'game.embed': 'Embed Game',
        'game.report': 'Report Issue',
        // About page translations
        'about.mission.title': 'Our Mission',
        'about.mission.description': 'At Snake Games Collection, our mission is to provide the best collection of snake games online. We believe in creating an engaging and accessible gaming experience for players of all ages and skill levels.',
        'about.offer.title': 'What We Offer',
        'about.offer.classic.title': 'Classic Snake',
        'about.offer.classic.description': 'Experience the nostalgia of the original snake game with our classic collection.',
        'about.offer.modern.title': 'Modern Snake',
        'about.offer.modern.description': 'Enjoy contemporary versions with modern graphics and innovative gameplay.',
        'about.offer.multiplayer.title': 'Multiplayer Snake',
        'about.offer.multiplayer.description': 'Compete with friends and players worldwide in real-time multiplayer games.',
        'about.offer.themed.title': 'Themed Snake',
        'about.offer.themed.description': 'Discover unique themed versions with special gameplay elements and challenges.',
        'about.why.title': 'Why Choose Us',
        'about.why.curated.title': 'Curated Collection',
        'about.why.curated.description': 'We carefully select and curate the best snake games to ensure quality and enjoyment.',
        'about.why.updates.title': 'Regular Updates',
        'about.why.updates.description': 'New games and features are added regularly to keep the experience fresh and exciting.',
        'about.why.interface.title': 'User-Friendly Interface',
        'about.why.interface.description': 'Our intuitive interface makes it easy to find and play your favorite games.',
        'about.why.free.title': 'Free Access',
        'about.why.free.description': 'All games are free to play, with no hidden costs or subscriptions required.',
        'about.community.title': 'Join Our Community',
        'about.community.description': 'Be part of our growing community of snake game enthusiasts. Share your experiences, compete with others, and stay updated with the latest games and features.',
        // Contact page
        'contact.title': 'Contact Us',
        'contact.form.title': 'Send Us a Message',
        'contact.form.name': 'Name',
        'contact.form.email': 'Email',
        'contact.form.subject': 'Subject',
        'contact.form.message': 'Message',
        'contact.form.submit': 'Send Message',
        'contact.info.title': 'Contact Information',
        'contact.info.email': 'Email',
        'contact.info.location': 'Location',
        'contact.social.title': 'Follow Us'
    },
    zh: {
        'nav.games': '游戏',
        'nav.about': '关于',
        'nav.contact': '联系我们',
        'hero.title': '在线玩最好的贪吃蛇游戏',
        'hero.subtitle': '经典贪吃蛇、现代贪吃蛇、多人贪吃蛇等多种游戏，全部免费！',
        'hero.cta': '立即开始游戏',
        'featured.title': '精选游戏',
        'featured.viewAll': '查看所有游戏',
        'categories.title': '游戏分类',
        'categories.classic': '经典贪吃蛇',
        'categories.classicDesc': '开创贪吃蛇游戏先河的原版游戏。',
        'categories.modern': '现代贪吃蛇',
        'categories.modernDesc': '具有现代图形和特效的当代版本。',
        'categories.multiplayer': '多人贪吃蛇',
        'categories.multiplayerDesc': '与朋友实时对战。',
        'categories.themed': '主题贪吃蛇',
        'categories.themedDesc': '具有独特游戏元素的特别主题版本。',
        'footer.description': '最好的在线贪吃蛇游戏集合。',
        'footer.quickLinks': '快速链接',
        'footer.followUs': '关注我们',
        // Games page translations
        'games.title': '所有游戏',
        'games.filters.category': '分类',
        'games.filters.difficulty': '难度',
        'games.filters.search': '搜索',
        'games.difficulty.easy': '简单',
        'games.difficulty.medium': '中等',
        'games.difficulty.hard': '困难',
        'games.noResults': '没有找到符合条件的游戏。',
        'games.loading': '正在加载游戏...',
        'games.playNow': '立即游戏',
        'games.viewDetails': '查看详情',
        // Game detail page translations
        'game.relatedGames': '相关游戏',
        'game.difficulty': '难度',
        'game.category': '分类',
        'game.tags': '标签',
        'game.description': '游戏说明',
        'game.howToPlay': '游戏玩法',
        'game.controls': '操作说明',
        'game.share': '分享游戏',
        'game.embed': '嵌入游戏',
        'game.report': '报告问题',
        // About page translations
        'about.mission.title': '我们的使命',
        'about.mission.description': '在贪吃蛇游戏集合，我们的使命是提供最好的在线贪吃蛇游戏。我们致力于为各个年龄段和技能水平的玩家创造有趣且易于访问的游戏体验。',
        'about.offer.title': '我们提供什么',
        'about.offer.classic.title': '经典贪吃蛇',
        'about.offer.classic.description': '通过我们的经典系列体验原版贪吃蛇游戏的怀旧情怀。',
        'about.offer.modern.title': '现代贪吃蛇',
        'about.offer.modern.description': '享受具有现代图形和创新玩法的当代版本。',
        'about.offer.multiplayer.title': '多人贪吃蛇',
        'about.offer.multiplayer.description': '与全球玩家实时对战。',
        'about.offer.themed.title': '主题贪吃蛇',
        'about.offer.themed.description': '探索具有特殊游戏元素和挑战的独特主题版本。',
        'about.why.title': '为什么选择我们',
        'about.why.curated.title': '精选游戏',
        'about.why.curated.description': '我们精心挑选和策划最好的贪吃蛇游戏，确保质量和乐趣。',
        'about.why.updates.title': '定期更新',
        'about.why.updates.description': '定期添加新游戏和功能，保持体验的新鲜感和刺激性。',
        'about.why.interface.title': '用户友好界面',
        'about.why.interface.description': '我们的直观界面让您轻松找到和玩您喜欢的游戏。',
        'about.why.free.title': '免费访问',
        'about.why.free.description': '所有游戏都可以免费玩，没有隐藏费用或订阅要求。',
        'about.community.title': '加入我们的社区',
        'about.community.description': '成为我们不断壮大的贪吃蛇游戏爱好者社区的一员。分享您的经验，与他人竞争，并随时了解最新的游戏和功能。',
        // Contact page
        'contact.title': '联系我们',
        'contact.form.title': '发送消息',
        'contact.form.name': '姓名',
        'contact.form.email': '邮箱',
        'contact.form.subject': '主题',
        'contact.form.message': '消息',
        'contact.form.submit': '发送消息',
        'contact.info.title': '联系信息',
        'contact.info.email': '邮箱',
        'contact.info.location': '位置',
        'contact.social.title': '关注我们'
    }
};

// Update language
function updateLanguage() {
    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });

    // Update meta tags for SEO
    const metaTags = {
        'description': {
            en: 'Play the best collection of snake games online. Classic snake, modern snake, multiplayer snake and more. Free to play, no download required.',
            zh: '在线玩最好的贪吃蛇游戏集合。经典贪吃蛇、现代贪吃蛇、多人贪吃蛇等多种游戏，全部免费，无需下载。'
        },
        'keywords': {
            en: 'snake games, classic snake, modern snake, multiplayer snake, free online games',
            zh: '贪吃蛇游戏, 经典贪吃蛇, 现代贪吃蛇, 多人贪吃蛇, 免费在线游戏'
        }
    };

    // Update meta description and keywords
    document.querySelector('meta[name="description"]').setAttribute('content', metaTags.description[currentLanguage]);
    document.querySelector('meta[name="keywords"]').setAttribute('content', metaTags.keywords[currentLanguage]);

    // Update Open Graph tags
    document.querySelector('meta[property="og:title"]').setAttribute('content', 
        currentLanguage === 'en' ? 'Snake Games Collection - Play Free Online Snake Games' : '贪吃蛇游戏集合 - 免费在线玩贪吃蛇游戏');
    document.querySelector('meta[property="og:description"]').setAttribute('content', metaTags.description[currentLanguage]);

    // Update Twitter Card tags
    document.querySelector('meta[property="twitter:title"]').setAttribute('content',
        currentLanguage === 'en' ? 'Snake Games Collection - Play Free Online Snake Games' : '贪吃蛇游戏集合 - 免费在线玩贪吃蛇游戏');
    document.querySelector('meta[property="twitter:description"]').setAttribute('content', metaTags.description[currentLanguage]);

    // Update page title
    document.title = currentLanguage === 'en' ? 
        'Snake Games Collection - Play Free Online Snake Games' : 
        '贪吃蛇游戏集合 - 免费在线玩贪吃蛇游戏';

    // Update html lang attribute
    document.documentElement.lang = currentLanguage;

    // Update game loader language if it exists
    if (window.gameLoader) {
        window.gameLoader.setLanguage(currentLanguage);
    }
}

// Initialize language selector
document.addEventListener('DOMContentLoaded', function() {
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        // Set initial value
        languageSelect.value = currentLanguage;
        
        // Add change event listener
        languageSelect.addEventListener('change', function() {
            currentLanguage = this.value;
            updateLanguage();
        });
    }

    // Initialize language
    updateLanguage();
});

// Mobile menu functionality
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Add data-translate attributes to elements
    document.querySelectorAll('a[href="/pages/games.html"]').forEach(el => el.setAttribute('data-translate', 'games'));
    document.querySelectorAll('a[href="/pages/about.html"]').forEach(el => el.setAttribute('data-translate', 'about'));
    document.querySelectorAll('a[href="/pages/contact.html"]').forEach(el => el.setAttribute('data-translate', 'contact'));
    
    // Initial language update
    updateLanguage();
}); 