<template>
  <div class="modal-overlay" v-if="visible">
    <div class="modal-box" :class="status">
      <div class="modal-title">{{ status === 'win' ? '胜 利！' : '失 败' }}</div>
      <div class="modal-score">最终得分：<span>{{ score }}</span></div>
      <button class="btn btn-play" style="margin-top:8px" @click="$emit('restart')">重新开始</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  visible: Boolean,
  status: String,
  score: Number,
})
defineEmits(['restart'])
</script>

<style scoped>
.modal-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  border-radius: 16px;
}
.modal-box {
  background: #0d0d0d;
  border-radius: 16px;
  padding: 40px 48px;
  text-align: center;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.modal-box.win  { border: 2px solid var(--color-gold); }
.modal-box.lose { border: 2px solid #a83232; }
.modal-title {
  font-size: 36px;
  font-weight: 700;
  letter-spacing: 2px;
}
.modal-box.win  .modal-title { color: var(--color-gold); }
.modal-box.lose .modal-title { color: #e06060; }
.modal-score {
  font-family: 'JetBrains Mono', monospace;
  font-size: 18px;
  color: rgba(255,255,255,.7);
}
.modal-score span {
  font-size: 28px;
  font-weight: 700;
  color: var(--color-score);
}
.btn {
  display: inline-flex;
  align-items: center;
  border: none;
  border-radius: var(--radius-btn);
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  padding: 10px 28px;
  transition: transform 150ms ease, box-shadow 150ms ease;
  letter-spacing: .3px;
}
.btn-play { background: var(--color-accent); color: #fff; box-shadow: 0 4px 14px rgba(232,104,42,.45); }
.btn-play:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(232,104,42,.6); }
</style>
