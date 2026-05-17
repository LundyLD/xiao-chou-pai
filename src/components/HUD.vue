<template>
  <div class="hud">
    <div class="hud-item">
      <div class="hud-label">目标分</div>
      <div class="hud-value target">{{ target }}</div>
    </div>
    <div class="hud-item score-item">
      <div class="hud-label">当前分</div>
      <div class="hud-value score" :class="{ 'score-flash': flashing }">{{ score }}</div>
      <!-- 浮动得分文字 -->
      <Transition name="float-score">
        <div v-if="floatVisible" class="float-score">+{{ lastScore }}</div>
      </Transition>
    </div>
    <div class="hud-item">
      <div class="hud-label">剩余出牌</div>
      <div class="hud-value plays">{{ handsLeft }}</div>
    </div>
    <div class="hud-item">
      <div class="hud-label">剩余弃牌</div>
      <div class="hud-value discards">{{ discardsLeft }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  score: Number,
  target: Number,
  handsLeft: Number,
  discardsLeft: Number,
  lastScore: { type: Number, default: 0 },
  scoreFlash: { type: Number, default: 0 },
})

const flashing = ref(false)
const floatVisible = ref(false)

watch(() => props.scoreFlash, (val) => {
  if (val === 0) return
  // 触发弹跳
  flashing.value = false
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      flashing.value = true
      setTimeout(() => { flashing.value = false }, 500)
    })
  })
  // 浮动 +分
  floatVisible.value = false
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      floatVisible.value = true
      setTimeout(() => { floatVisible.value = false }, 900)
    })
  })
})
</script>

<style scoped>
.hud {
  display: flex;
  align-items: center;
  height: 64px;
  background: rgba(0,0,0,.35);
  backdrop-filter: blur(4px);
  border-bottom: 1px solid rgba(255,255,255,.08);
  flex-shrink: 0;
}
.hud-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-right: 1px solid rgba(255,255,255,.1);
  padding: 0 8px;
  position: relative;
}
.hud-item:last-child { border-right: none; }
.hud-label {
  font-size: 10px;
  color: rgba(255,255,255,.55);
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 600;
}
.hud-value {
  font-family: 'JetBrains Mono', monospace;
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
  font-variant-numeric: tabular-nums;
}
.hud-value.target   { color: var(--color-gold); }
.hud-value.score    { color: var(--color-score); }
.hud-value.plays    { color: var(--color-accent); }
.hud-value.discards { color: #e06060; }

/* 分数弹跳 */
.score-flash {
  animation: score-bounce 500ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
@keyframes score-bounce {
  0%   { transform: scale(1); }
  30%  { transform: scale(1.45); color: #fff; }
  60%  { transform: scale(0.95); }
  100% { transform: scale(1); color: var(--color-score); }
}

/* 浮动得分 */
.float-score {
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'JetBrains Mono', monospace;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
  pointer-events: none;
  text-shadow: 0 0 8px rgba(93,214,122,.8);
}
.float-score-enter-active {
  animation: float-up 900ms ease-out both;
}
@keyframes float-up {
  0%   { opacity: 0; transform: translateX(-50%) translateY(0) scale(0.6); }
  15%  { opacity: 1; transform: translateX(-50%) translateY(-4px) scale(1.1); }
  70%  { opacity: 1; transform: translateX(-50%) translateY(-28px) scale(1); }
  100% { opacity: 0; transform: translateX(-50%) translateY(-44px) scale(0.9); }
}
</style>
