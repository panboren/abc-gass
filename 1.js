const letterDisplay = document.getElementById('letter-display');
const scoreElement = document.getElementById('score');
let score = 0;

// 随机生成字母
function generateLetter() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    const letter = alphabet[randomIndex];

    // 创建字母元素
    const letterElement = document.createElement('div');
    letterElement.className = 'letter';
    letterElement.textContent = letter;
    letterElement.dataset.letter = letter;

    // 设置随机位置
    letterElement.style.left = `${Math.random() * 90}%`;
    letterElement.style.top = '-50px';

    // 添加到页面中
    letterDisplay.appendChild(letterElement);

    // 动画结束后移除字母
    setTimeout(() => {
        if (letterElement.parentNode) {
            letterDisplay.removeChild(letterElement);
        }
    }, 5000); // 字母下落时间为5秒
}

// 监听键盘事件
document.addEventListener('keydown', (event) => {
    const keyPressed = event.key.toUpperCase();
    const letters = document.querySelectorAll('.letter');

    letters.forEach((letterElement) => {
        console.log(letterElement.dataset.letter, keyPressed);
        if (letterElement.dataset.letter === keyPressed) {
            // 触发爆炸效果
            letterElement.classList.add('explode');

            // 移除字母并更新得分
            setTimeout(() => {
                letterDisplay.removeChild(letterElement);
                score++;
                scoreElement.textContent = score;
            }, 500); // 爆炸动画持续时间
        }
    });
});

// 定时生成新字母
setInterval(generateLetter, 1000); // 每1秒生成一个新字母
