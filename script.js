const textDisplay = document.getElementById('text-display');
const pinyinDisplay = document.getElementById('pinyin-display');
const inputField = document.getElementById('input-field');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const timeDisplay = document.getElementById('time');
const roundDisplay = document.getElementById('round');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const languageSelect = document.getElementById('language-select');
const title = document.getElementById('title');
const subtitle = document.getElementById('subtitle');
const wpmLabel = document.getElementById('wpm-label');
const accuracyLabel = document.getElementById('accuracy-label');
const timeLabel = document.getElementById('time-label');
const roundLabel = document.getElementById('round-label');
const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const closeBtn = document.getElementsByClassName('close')[0];
const showPinyinCheckbox = document.getElementById('show-pinyin');
const timeLimitInput = document.getElementById('time-limit');
const themeSelect = document.getElementById('theme-select');
const failureOverlay = document.getElementById('failure-overlay');
const failureMessage = document.getElementById('failure-message');
const successOverlay = document.getElementById('success-overlay');
const successMessage = document.getElementById('success-message');

const texts = {
  en: [
    "The quick brown fox jumps over the lazy dog.",
    "Innovation distinguishes between a leader and a follower.",
    "Design is not just what it looks like and feels like. Design is how it works.",
    "Stay hungry, stay foolish.",
    "The only way to do great work is to love what you do.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "Be the change you wish to see in the world.",
    "Life is what happens to you while you're busy making other plans.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "Strive not to be a success, but rather to be of value.",
    "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    "The way to get started is to quit talking and begin doing.",
    "Your time is limited, don't waste it living someone else's life.",
    "If life were predictable it would cease to be life, and be without flavor.",
    "If you look at what you have in life, you'll always have more.",
    "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
    "Life is what happens when you're busy making other plans.",
    "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
    "When you reach the end of your rope, tie a knot in it and hang on.",
    "Always remember that you are absolutely unique. Just like everyone else."
  ],
  zh: [
    { text: "所有的伟大的行动和思想，都有一个微不足道的开始。每个伟大的时代，都源于一个普通的时刻。", pinyin: "Suǒyǒu de wěidà de xíngdòng hé sīxiǎng, dōu yǒu yīgè wēi bù zúdào de kāishǐ. Měi gè wěidà de shídài, dōu yuányú yīgè pǔtōng de shíkè." },
    { text: "生活中真正重要的东西都是免费的：我们的呼吸、我们的梦想、我们的爱情和我们的友谊。", pinyin: "Shēnghuó zhōng zhēnzhèng zhòngyào de dōngxi dōu shì miǎnfèi de: Wǒmen de hūxī, wǒmen de mèngxiǎng, wǒmen de àiqíng hé wǒmen de yǒuyì." },
    { text: "我们读书是为了证明我们不是一个人在战斗。我们读书是为了知道我们并不孤独。", pinyin: "Wǒmen dú shū shì wèile zhèngmíng wǒmen bú shì yīgè rén zài zhàndòu. Wǒmen dú shū shì wèile zhīdào wǒmen bìng bù gūdú." },
    { text: "生活就是一个缓慢的过程，我们在这个过程中学会珍惜。我们慢慢地了解生命的意义。", pinyin: "Shēnghuó jiùshì yīgè huǎnmàn de guòchéng, wǒmen zài zhège guòchéng zhōng xuéhuì zhēnxī. Wǒmen mànmàn de liǎojiě shēngmìng de yìyì." },
    { text: "我们终此一生，就是要摆脱他人的期待，找到真正的自己。不要为了迎合他人而丢失自我。", pinyin: "Wǒmen zhōng cǐ yīshēng, jiùshì yào bǎituō tārén de qīdài, zhǎodào zhēnzhèng de zìjǐ. Bùyào wèile yínghe tārén ér diūshī zìwǒ." },
    { text: "每个人的生命中，都有最艰难的一章，当你翻过去之后，你就会发现，那正是人生最精彩的一章。", pinyin: "Měi gè rén de shēngmìng zhōng, dōu yǒu zuì jiānnán de yī zhāng, dāng nǐ fān guòqù zhīhòu, nǐ jiù huì fāxiàn, nà zhèng shì rénshēng zuì jīngcǎi de yī zhāng." },
    { text: "我们都是阴沟里的虫子，但总得有人仰望星空。即使身处逆境，也要保持对美好事物的向往。", pinyin: "Wǒmen dōu shì yīngōu lǐ de chóngzi, dàn zǒng háishì děi yǎngwàng xīngkōng. Jíshǐ shēnchǔ nìjìng, yě yào bǎochí duì měihǎo shìwù de xiàngwǎng." },
    { text: "生活中只有一种英雄主义，那就是在认清生活真相之后依然热爱生活。", pinyin: "Shēnghuó zhōng zhǐyǒu yī zhǒng yīngxióng zhǔyì, nà jiùshì zài rènqīng shēnghuó zhēnxiàng zhīhòu yīrán rè'ài shēnghuó." },
    { text: "人生就像一盒巧克力，你永远不知道下一块是什么味道。保持好奇心，勇于尝试新事物。", pinyin: "Rénshēng jiù xiàng yī hé qiǎokèlì, nǐ yǒngyuǎn bù zhīdào xià yī kuài shì shénme wèidao. Bǎochí hàoqíxīn, yǒngyú chángshì xīn shìwù." },
    { text: "世界上最宽阔的是海洋，比海洋更宽阔的是天空，比天空更宽阔的是人的胸怀。", pinyin: "Shìjiè shàng zuì kuānkuò de shì hǎiyáng, bǐ hǎiyáng gèng kuānkuò de shì tiānkōng, bǐ tiānkōng gèng kuānkuò de shì rén de xiōnghuái." },
    { text: "有些鸟儿是注定不会被关在笼子里的，它们的每一片羽毛都闪耀着自由的光辉。", pinyin: "Yǒuxiē niǎo'er shì zhùdìng bú huì bèi guān zài lóngzi lǐ de, tāmen de měi yī piàn yǔmáo dōu shǎnyào zhe zìyóu de guānghuī." },
    { text: "生命中最重要的不是我们身在何处，而是我们朝着什么方向前进。保持正确的方向，坚持不懈。", pinyin: "Shēngmìng zhōng zuì zhòngyào de bú shì wǒmen shēn zài hé chù, ér shì wǒmen cháozhe shénme fāngxiàng qiánjìn. Bǎochí zhèngquè de fāngxiàng, jiānchí bù xiè." },
    { text: "人的一生可能燃烧也可能腐朽，我不能腐朽，我愿意燃烧起来。选择积极的生活态度，绽放自己的光芒。", pinyin: "Rén de yīshēng kěnéng ránshāo yě kěnéng fǔxiǔ, wǒ bù néng fǔxiǔ, wǒ yuànyì ránshāo qǐlai. Xuǎnzé jījí de shēnghuó tàidù, zhànfàng zìjǐ de guāngmáng." },
    { text: "生命是一条长河，我们都是那河里的一滴水，终会汇入大海。珍惜当下，努力成为最好的自己。", pinyin: "Shēngmìng shì yī tiáo chánghé, wǒmen dōu shì nà hé lǐ de yī dī shuǐ, zhōng huì huìrù dàhǎi. Zhēnxī dāngxià, nǔlì chéngwéi zuì hǎo de zìjǐ." },
    { text: "人生就是一列开往坟墓的列车，路途上会有很多站，很难有人可以自始至终陪着你。", pinyin: "Rénshēng jiùshì yī liè kāi wǎng fénmù de lièchē, lùtú shàng huì yǒu hěnduō zhàn, hěn nán yǒurén kěyǐ zì shǐ zhì zhōng péizhe nǐ." },
    { text: "我们都在努力成为更好的人，但有时候，我们需要停下来，接纳并爱上现在的自己。", pinyin: "Wǒmen dōu zài nǔlì chéngwéi gèng hǎo de rén, dàn yǒu shíhou, wǒmen xūyào tíng xiàlai, jiēnà bìng àishàng xiànzài de zìjǐ." },
    { text: "生活不可能像你想象得那么好，但也不会像你想象得那么糟。要学会在现实中找寻快乐。", pinyin: "Shēnghuó bù kěnéng xiàng nǐ xiǎngxiàng de nàme hǎo, dàn yě bú huì xiàng nǐ xiǎngxiàng de nàme zāo. Yào xuéhuì zài xiànshí zhōng zhǎoxún kuàilè." },
    { text: "人生就像一场旅行，不必在乎目的地，在乎的是沿途的风景以及看风景的心情。", pinyin: "Rénshēng jiù xiàng yī chǎng lǚxíng, bùbì zàihū mùdìdì, zàihū de shì yántú de fēngjǐng yǐjí kàn fēngjǐng de xīnqíng." },
    { text: "不要等待机会，而要创造机会。人生舞台的大幕随时都可能拉开，关键是你要准备好自己。", pinyin: "Bùyào děngdài jīhuì, ér yào chuàngzào jīhuì. Rénshēng wǔtái de dàmù suíshí dōu kěnéng lā kāi, guānjiàn shì nǐ yào zhǔnbèi hǎo zìjǐ." }
  ],
  ja: [
    { text: "いろはにほへと ちりぬるを わかよたれそ つねならむ", romaji: "Iroha nihoheto chirinuruwo wakayotareso tsunenaramu" },
    { text: "人間万事塞翁が馬。", romaji: "Ningen banji saio ga uma." },
    { text: "石の上にも三年。", romaji: "Ishi no ue nimo sannen." },
    { text: "七転び八起き。", romaji: "Nanakorobi yaoki." },
    { text: "花は桜木、人は武士。", romaji: "Hana wa sakuragi, hito wa bushi." },
    { text: "温故知新。", romaji: "Onko chishin." },
    { text: "和を以て貴しと為す。", romaji: "Wa wo motte tōtoshi to nasu." },
    { text: "一期一会。", romaji: "Ichigo ichie." },
    { text: "猿も木から落ちる。", romaji: "Saru mo ki kara ochiru." },
    { text: "光陰矢の如し。", romaji: "Kōin ya no gotoshi." },
    { text: "千里の道も一歩から。", romaji: "Senri no michi mo ippo kara." },
    { text: "蓼食う虫も好き好き。", romaji: "Tade kuu mushi mo sukizuki." },
    { text: "井の中の蛙大海を知らず。", romaji: "I no naka no kawazu taikai wo shirazu." },
    { text: "出る杭は打たれる。", romaji: "Deru kui wa utareru." },
    { text: "急がば回れ。", romaji: "Isogaba maware." },
    { text: "雨降って地固まる。", romaji: "Ame futte ji katamaru." },
    { text: "塵も積もれば山となる。", romaji: "Chiri mo tsumoreba yama to naru." },
    { text: "果報は寝て待て。", romaji: "Kahō wa nete mate." },
    { text: "二兎を追う者は一兎をも得ず。", romaji: "Nito wo ou mono wa itto wo mo ezu." },
    { text: "楽あれば苦あり、苦あれば楽あり。", romaji: "Raku areba ku ari, ku areba raku ari." }
  ]
};

const uiText = {
  en: {
    title: "Typing Me",
    subtitle: "Type random text with speed and accuracy",
    start: "Start",
    pause: "Pause",
    reset: "Reset",
    resume: "Resume",
    wpm: "WPM",
    accuracy: "Accuracy",
    timeLeft: "Time Left (s)",
    placeholder: "Start typing here...",
    roundCompleted: "Round {0} Completed!\nWPM: {1}\nAccuracy: {2}%\n\nAverage WPM: {3}\nAverage Accuracy: {4}%",
    round: "Round",
    settings: "Settings",
    showPinyin: "Show Pinyin/Romaji",
    timeLimit: "Time Limit (seconds)",
    theme: "Theme",
    auto: "Auto (System Default)",
    light: "Light",
    dark: "Dark",
    timeUp: "Time's Up!",
    greatJob: "Great Job!"
  },
  zh: {
    title: "键入我境",
    subtitle: "以速度和准确度输入随机文本",
    start: "开始",
    pause: "暂停",
    reset: "重置",
    resume: "继续",
    wpm: "每分钟字数",
    accuracy: "准确率",
    timeLeft: "剩余时间 (秒)",
    placeholder: "在此开始打字...",
    roundCompleted: "第 {0} 轮完成！\n每分钟字数：{1}\n准确率：{2}%\n\n平均每分钟字数：{3}\n平均准确率：{4}%",
    round: "轮数",
    settings: "设置",
    showPinyin: "显示拼音",
    timeLimit: "时间限制（秒）",
    theme: "主题",
    auto: "自动（跟随系统）",
    light: "浅色",
    dark: "深色",
    timeUp: "时间到！",
    greatJob: "干得好！"
  },
  ja: {
    title: "タイプ道",
    subtitle: "速度と精度でランダムなテキストを入力",
    start: "スタート",
    pause: "一時停止",
    reset: "リセット",
    resume: "再開",
    wpm: "WPM",
    accuracy: "精度",
    timeLeft: "残り時間 (秒)",
    placeholder: "ここに入力してください...",
    roundCompleted: "ラウンド {0} 完了！\nWPM: {1}\n精度: {2}%\n\n平均 WPM: {3}\n平均精度: {4}%",
    round: "ラウンド",
    settings: "設定",
    showPinyin: "ローマ字を表示",
    timeLimit: "制限時間（秒）",
    theme: "テーマ",
    auto: "自動（システム設定に従う）",
    light: "ライト",
    dark: "ダーク",
    timeUp: "時間切れ！",
    greatJob: "よくできました！"
  }
};

let currentText = '';
let currentPinyin = '';
let startTime;
let endTime;
let totalTyped = 0;
let correctTyped = 0;
let timer;
let timeLeft = 60;
let isPaused = false;
let totalWPM = 0;
let totalAccuracy = 0;
let roundsCompleted = 0;
let currentLanguage = 'en';
let lastTextIndex = -1;
let subtitleAnimationInterval;
let showPinyin = true;
let currentTheme = 'auto';

// Disable copy and paste
document.addEventListener('copy', (e) => e.preventDefault());
document.addEventListener('paste', (e) => e.preventDefault());
inputField.addEventListener('contextmenu', (e) => e.preventDefault());

function startGame() {
  const textObject = getTextForRound(roundsCompleted + 1);
  currentText = textObject.text || textObject;
  currentPinyin = textObject.pinyin || textObject.romaji || '';
  textDisplay.innerHTML = currentText;
  pinyinDisplay.textContent = showPinyin ? currentPinyin : '';
  inputField.value = '';
  startTime = new Date().getTime();
  totalTyped = 0;
  correctTyped = 0;
  timeLeft = parseInt(timeLimitInput.value);
  inputField.disabled = false;
  inputField.focus();
  startTimer();
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  resetBtn.disabled = false;
  languageSelect.disabled = true;
  roundDisplay.textContent = roundsCompleted + 1;
  stopSubtitleAnimation();

  // Add smooth transition for game start
  textDisplay.style.opacity = '0';
  pinyinDisplay.style.opacity = '0';
  setTimeout(() => {
    textDisplay.style.opacity = '1';
    pinyinDisplay.style.opacity = '1';
  }, 100);
}

function getTextForRound(round) {
  let index;
  do {
    index = Math.floor(Math.random() * texts[currentLanguage].length);
  } while (index === lastTextIndex);
  lastTextIndex = index;
  return texts[currentLanguage][index];
}

function startTimer() {
  timer = setInterval(() => {
    if (!isPaused) {
      timeLeft--;
      updateTimeDisplay();
      updateWPM();

      if (timeLeft <= 0) {
        endGame(false);
      }
    }
  }, 1000);
}

function pauseGame() {
  isPaused = !isPaused;
  if (isPaused) {
    inputField.disabled = true;
    pauseBtn.textContent = uiText[currentLanguage].resume;
    pauseBtn.style.backgroundColor = 'var(--success-color)';
  } else {
    inputField.disabled = false;
    inputField.focus();
    pauseBtn.textContent = uiText[currentLanguage].pause;
    pauseBtn.style.backgroundColor = 'var(--warning-color)';
  }

  // Add pause/resume animation
  textDisplay.style.filter = isPaused ? 'blur(3px)' : 'blur(0)';
  textDisplay.style.transition = 'filter 0.3s ease';
}

function resetGame() {
  clearInterval(timer);
  timeLeft = parseInt(timeLimitInput.value);
  updateTimeDisplay();
  wpmDisplay.textContent = '0';
  wpmDisplay.style.color = 'var(--primary-color)';
  accuracyDisplay.textContent = '100%';
  accuracyDisplay.style.color = 'var(--primary-color)';
  textDisplay.innerHTML = '';
  pinyinDisplay.textContent = '';
  inputField.value = '';
  inputField.disabled = true;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = true;
  languageSelect.disabled = false;
  isPaused = false;
  pauseBtn.textContent = uiText[currentLanguage].pause;
  pauseBtn.style.backgroundColor = 'var(--warning-color)';
  totalWPM = 0;
  totalAccuracy = 0;
  roundsCompleted = 0;
  timeDisplay.classList.remove('pulse');
  roundDisplay.textContent = 1;
  lastTextIndex = -1;
  startSubtitleAnimation();

  // Add reset animation
  textDisplay.style.transform = 'scale(0.9)';
  textDisplay.style.opacity = '0';
  setTimeout(() => {
    textDisplay.style.transform = 'scale(1)';
    textDisplay.style.opacity = '1';
  }, 300);
}

function endGame(success) {
  clearInterval(timer);
  inputField.disabled = true;

  if (success) {
    showSuccessAnimation();
  } else {
    showFailureAnimation();
  }

  setTimeout(() => {
    if (success) {
      roundsCompleted++;
      const currentWPM = calculateWPM();
      const currentAccuracy = calculateAccuracy();
      totalWPM += currentWPM;
      totalAccuracy += currentAccuracy;

      const averageWPM = Math.round(totalWPM / roundsCompleted);
      const averageAccuracy = Math.round(totalAccuracy / roundsCompleted);

      alert(uiText[currentLanguage].roundCompleted
        .replace('{0}', roundsCompleted)
        .replace('{1}', currentWPM)
        .replace('{2}', currentAccuracy)
        .replace('{3}', averageWPM)
        .replace('{4}', averageAccuracy));

      startGame();
    } else {
      resetGame();
    }
  }, 3000);
}

function showSuccessAnimation() {
  successMessage.textContent = uiText[currentLanguage].greatJob;
  successOverlay.style.opacity = '1';
  successOverlay.style.pointerEvents = 'auto';

  // Create and animate confetti
  for (let i = 0; i < 100; i++) {
    createConfetti();
  }

  setTimeout(() => {
    successOverlay.style.opacity = '0';
    successOverlay.style.pointerEvents = 'none';
  }, 3000);
}

function showFailureAnimation() {
  failureMessage.textContent = uiText[currentLanguage].timeUp;
  failureOverlay.style.opacity = '1';
  failureOverlay.style.pointerEvents = 'auto';

  // Shake animation for text display
  textDisplay.style.animation = 'shake 0.5s ease-in-out';

  setTimeout(() => {
    failureOverlay.style.opacity = '0';
    failureOverlay.style.pointerEvents = 'none';
    textDisplay.style.animation = '';
  }, 3000);
}

function createConfetti() {
  const confetti = document.createElement('div');
  confetti.classList.add('confetti');
  confetti.style.left = Math.random() * 100 + 'vw';
  confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
  confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
  document.body.appendChild(confetti);

  setTimeout(() => {
    confetti.remove();
  }, 5000);
}

function updateWPM() {
  const currentWPM = calculateWPM();
  updateWPMDisplay(currentWPM);
}

function calculateWPM() {
  const currentTime = new Date().getTime();
  const timeElapsed = (currentTime - startTime) / 1000 / 60; // in minutes
  const wordsTyped = totalTyped / 5; // Assuming average word length is 5 characters
  return Math.round(wordsTyped / timeElapsed);
}

function updateWPMDisplay(wpm) {
  animateStat(wpmDisplay, parseInt(wpmDisplay.textContent), wpm, 500);
  if (wpm < 20) {
    wpmDisplay.style.color = 'var(--error-color)';
  } else if (wpm < 40) {
    wpmDisplay.style.color = 'var(--warning-color)';
  } else {
    wpmDisplay.style.color = 'var(--success-color)';
  }
  // Add WPM update animation
  wpmDisplay.style.transform = 'scale(1.2)';
  setTimeout(() => {
    wpmDisplay.style.transform = 'scale(1)';
  }, 200);
}

function updateAccuracy() {
  const accuracy = calculateAccuracy();
  updateAccuracyDisplay(accuracy);
}

function calculateAccuracy() {
  return Math.round((correctTyped / Math.max(totalTyped, 1)) * 100);
}

function updateAccuracyDisplay(accuracy) {
  animateStat(accuracyDisplay, parseInt(accuracyDisplay.textContent), accuracy, 500);
  if (accuracy < 80) {
    accuracyDisplay.style.color = 'var(--error-color)';
  } else if (accuracy < 95) {
    accuracyDisplay.style.color = 'var(--warning-color)';
  } else {
    accuracyDisplay.style.color = 'var(--success-color)';
  }
  // Add accuracy update animation
  accuracyDisplay.style.transform = 'scale(1.2)';
  setTimeout(() => {
    accuracyDisplay.style.transform = 'scale(1)';
  }, 200);
}

function updateTimeDisplay() {
  timeDisplay.textContent = timeLeft;
  if (timeLeft <= 10) {
    timeDisplay.style.color = 'var(--error-color)';
    timeDisplay.classList.add('pulse');
  } else if (timeLeft <= 40) {
    timeDisplay.style.color = 'var(--warning-color)';
    timeDisplay.classList.remove('pulse');
  } else {
    timeDisplay.style.color = 'var(--success-color)';
    timeDisplay.classList.remove('pulse');
  }
  // Add time update animation
  timeDisplay.style.transform = 'scale(1.1)';
  setTimeout(() => {
    timeDisplay.style.transform = 'scale(1)';
  }, 100);
}

function startSubtitleAnimation() {
  stopSubtitleAnimation();
  const subtitles = texts[currentLanguage].map(item => typeof item === 'string' ? item : item.text);
  let currentSubtitleIndex = 0;
  let isTyping = true;
  let charIndex = 0;

  const animationSpeed = currentLanguage === 'en' ? 50 : 100; // Slower speed for Chinese and Japanese

  subtitleAnimationInterval = setInterval(() => {
    const currentSubtitle = subtitles[currentSubtitleIndex];
    if (isTyping) {
      if (charIndex < currentSubtitle.length) {
        subtitle.textContent += currentSubtitle[charIndex];
        charIndex++;
      } else {
        isTyping = false;
        setTimeout(() => {
          isTyping = false;
        }, 1000);
      }
    } else {
      if (charIndex > 0) {
        subtitle.textContent = currentSubtitle.substring(0, charIndex - 1);
        charIndex--;
      } else {
        isTyping = true;
        currentSubtitleIndex = (currentSubtitleIndex + 1) % subtitles.length;
      }
    }
  }, animationSpeed);
}

function stopSubtitleAnimation() {
  clearInterval(subtitleAnimationInterval);
  subtitle.textContent = '';
}

inputField.addEventListener('input', () => {
  if (!isPaused) {
    const inputText = inputField.value;
    totalTyped = inputText.length;
    correctTyped = 0;

    let displayText = '';
    for (let i = 0; i < currentText.length; i++) {
      if (i < inputText.length) {
        if (inputText[i] === currentText[i]) {
          displayText += `<span class="typed">${currentText[i]}</span>`;
          correctTyped++;
        } else {
          displayText += `<span class="error">${currentText[i]}</span>`;
        }
      } else {
        displayText += currentText[i];
      }
    }

    textDisplay.innerHTML = displayText;

    updateWPM();
    updateAccuracy();

    if (inputText === currentText) {
      endGame(true);
    }
  }
});

function updateUILanguage() {
  title.textContent = uiText[currentLanguage].title;
  startBtn.textContent = uiText[currentLanguage].start;
  pauseBtn.textContent = uiText[currentLanguage].pause;
  resetBtn.textContent = uiText[currentLanguage].reset;
  wpmLabel.textContent = uiText[currentLanguage].wpm;
  accuracyLabel.textContent = uiText[currentLanguage].accuracy;
  timeLabel.textContent = uiText[currentLanguage].timeLeft;
  roundLabel.textContent = uiText[currentLanguage].round;
  inputField.placeholder = uiText[currentLanguage].placeholder;
  settingsBtn.textContent = uiText[currentLanguage].settings;
  document.querySelector('label[for="show-pinyin"]').textContent = uiText[currentLanguage].showPinyin;
  document.querySelector('label[for="time-limit"]').textContent = uiText[currentLanguage].timeLimit;
  document.querySelector('label[for="theme-select"]').textContent = uiText[currentLanguage].theme;
  themeSelect.options[0].textContent = uiText[currentLanguage].auto;
  themeSelect.options[1].textContent = uiText[currentLanguage].light;
  themeSelect.options[2].textContent = uiText[currentLanguage].dark;
  startSubtitleAnimation();
}

languageSelect.addEventListener('change', (e) => {
  currentLanguage = e.target.value;
  updateUILanguage();
  resetGame();
});

startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', pauseGame);
resetBtn.addEventListener('click', resetGame);

settingsBtn.onclick = function () {
  settingsModal.style.display = "block";
  settingsModal.classList.add('show');
}

closeBtn.onclick = function () {
  settingsModal.classList.remove('show');
  setTimeout(() => {
    settingsModal.style.display = "none";
  }, 300);
}

window.onclick = function (event) {
  if (event.target == settingsModal) {
    settingsModal.classList.remove('show');
    setTimeout(() => {
      settingsModal.style.display = "none";
    }, 300);
  }
}

showPinyinCheckbox.addEventListener('change', function () {
  showPinyin = this.checked;
  if (currentPinyin) {
    pinyinDisplay.textContent = showPinyin ? currentPinyin : '';
    pinyinDisplay.style.transform = 'translateY(-10px)';
    pinyinDisplay.style.opacity = '0';
    setTimeout(() => {
      pinyinDisplay.style.transform = 'translateY(0)';
      pinyinDisplay.style.opacity = '1';
    }, 300);
  }
});

timeLimitInput.addEventListener('change', function () {
  timeLeft = parseInt(this.value);
  updateTimeDisplay();
});

themeSelect.addEventListener('change', function () {
  currentTheme = this.value;
  applyTheme();
});

function applyTheme() {
  document.body.classList.remove('dark-mode', 'auto-mode');
  if (currentTheme === 'auto') {
    document.body.classList.add('auto-mode');
  } else if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }
  // Add theme change animation
  document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
}

// Initialize the game
updateUILanguage();
applyTheme();
resetGame();

// Add smooth scrolling for better user experience
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Add keyboard shortcuts
document.addEventListener('keydown', function (event) {
  if (event.ctrlKey || event.metaKey) {
    switch (event.key) {
      case 's':
        event.preventDefault();
        startBtn.click();
        break;
      case 'p':
        event.preventDefault();
        pauseBtn.click();
        break;
      case 'r':
        event.preventDefault();
        resetBtn.click();
        break;
    }
  }
});

function animateStat(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    element.textContent = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}