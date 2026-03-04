// script.js
const i18n = {
    zh: {
        langCode: 'zh-TW', // 用於語音合成的語言代碼
        morning: "早安，凡人...",
        afternoon: "午安，祭品...",
        evening: "晚安，獵物...",
        sub: "黑暗已至，恐懼將伴隨你左右。"
    },
    en: {
        langCode: 'en-US',
        morning: "Good Morning, Mortal...",
        afternoon: "Good Afternoon, Sacrifice...",
        evening: "Good Evening, Prey...",
        sub: "Darkness has arrived, fear will accompany you."
    },
    ja: {
        langCode: 'ja-JP',
        morning: "おはよう、人間よ...",
        afternoon: "こんにちは、贄よ...",
        evening: "こんばんは、獲物よ...",
        sub: "闇が訪れた。恐怖がそなたと共に。"
    },
    fr: {
        langCode: 'fr-FR',
        morning: "Bonjour, Mortel...",
        afternoon: "Bon après-midi, Sacrifice...",
        evening: "Bonsoir, Proie...",
        sub: "Les ténèbres sont arrivées, la peur vous accompagnera."
    }
};

const greetingEl = document.getElementById('greeting');
const messageEl = document.getElementById('message');
const langSelect = document.getElementById('lang-select');
const speakBtn = document.getElementById('speak-btn');

let currentLangData = null; // 儲存當前語系資料供語音使用

function updateContent() {
    const hour = new Date().getHours();
    let selectedLang = langSelect.value;

    if (selectedLang === 'auto') {
        const browserLang = navigator.language.split('-')[0];
        selectedLang = i18n[browserLang] ? browserLang : 'en';
    }

    currentLangData = i18n[selectedLang];
    
    let timeKey = 'morning';
    if (hour >= 12 && hour < 18) timeKey = 'afternoon';
    else if (hour >= 18 || hour < 5) timeKey = 'evening';

    greetingEl.textContent = currentLangData[timeKey];
    messageEl.textContent = currentLangData.sub;
}

// --- 新增語音功能 ---
function speak() {
    // 如果瀏覽器不支援或沒有資料，則返回
    if (!window.speechSynthesis || !currentLangData) return;

    // 取消當前任何正在播放的語音
    window.speechSynthesis.cancel();

    const textToSpeak = `${greetingEl.textContent} ${messageEl.textContent}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    // 設定語言
    utterance.lang = currentLangData.langCode;
    
    // 嘗試調整語音參數以符合恐怖風格 (效果因瀏覽器和作業系統而異)
    utterance.pitch = 0.7; // 音調降低
    utterance.rate = 0.8;  // 語速放慢
    utterance.volume = 1;  // 音量最大

    window.speechSynthesis.speak(utterance);
}

langSelect.addEventListener('change', updateContent);
speakBtn.addEventListener('click', speak);

updateContent();