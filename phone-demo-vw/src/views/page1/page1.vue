<template>
  <div id="game-container">
    <h1>得分: {{ score }}</h1>
    <div
      id="letter-display"
      ref="letterDisplay"
      style="width: 100vw"
    >
      <div
        v-for="(letter) in letters"
        :key="letter.id"
        class="letter"
        :class="{ explode: letter.exploded }"
        :style="{ left: letter.left + '%', top: letter.top + 'px' }"
        @animationend="handleAnimationEnd(letter, $event)"
      >
        {{ letter.char }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const score = ref(0)
const letters = ref([])
const letterDisplay = ref(null)
let generateInterval = null

// 随机生成字母并添加唯一ID
function generateLetter() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const char = alphabet[Math.floor(Math.random() * alphabet.length)]
  const containerWidth = letterDisplay.value?.clientWidth || window.innerWidth

  // 根据容器和字母大小计算最大 left 值
  const letterSpacing = 50
  const maxLeft = (containerWidth - letterSpacing) / containerWidth * 100
  const left = Math.random() * maxLeft
  console.log(888, left)
  letters.value.push({
    id: Date.now() + Math.random(),
    char,
    left,
    top: -50,
    exploded: false
  })
}

// 监听键盘事件
function handleKeyDown(event) {
  const key = event.key.toUpperCase()
  letters.value.forEach((letter, index) => {
    if (letter.char === key && !letter.exploded) {
      score.value++
      letters.value[index].exploded = true
    }
  })
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
  generateInterval = setInterval(generateLetter, 1000)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyDown)
  clearInterval(generateInterval)
})

// 动画结束后移除元素
function handleAnimationEnd(letter, event) {
  if (event.animationName === 'explode') {
    letters.value = letters.value.filter(l => l.id !== letter.id)
  }
}
</script>

<style scoped>
#game-container {
  margin-top: 50px;
  text-align: center;
}

#letter-display {
  position: relative;
  width: 100%;
  height: 60vh;
  overflow: hidden;
  background: #f6cb83;
}

.letter {
  position: absolute;
  font-size: 40px;
  animation: fall 5s linear forwards;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: radial-gradient(#0ebbfa, #0e76a8, #0e4c7e);
  box-sizing: border-box;
  will-change: transform;
}


@keyframes fall {
  from { top: -50px; }
  to { top: 100%; }
}


.explode {
  animation: explode 0.6s forwards;
  position: relative;
}

.explode::before,
.explode::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: inherit;
  border-radius: 50%;
  opacity: 0.5;
  animation: particle 0.6s ease-out forwards;
}

.explode::before {
  top: -20%;
  left: -20%;
  transform: scale(0.5);
  animation-delay: 0.05s;
}

.explode::after {
  top: 20%;
  left: 20%;
  transform: scale(0.3);
  animation-delay: 0.1s;
}

@keyframes explode {
  0% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
    filter: brightness(100%);
  }
  50% {
    transform: scale(2.5) rotate(360deg);
    filter: brightness(150%) drop-shadow(0 0 5px rgba(255, 255, 255, 0.6));
    opacity: 0.6;
  }
  100% {
    transform: scale(3) rotate(720deg);
    filter: brightness(200%) drop-shadow(0 0 10px rgba(255, 255, 255, 0));
    opacity: 0;
  }
}

@keyframes particle {
  0% {
    opacity: 0.6;
    transform: translate(0, 0) scale(0.5);
  }
  100% {
    opacity: 0;
    transform: translate(100px, 100px) scale(0);
  }
}


</style>
