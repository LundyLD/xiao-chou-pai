<template>
  <div class="action-bar">
    <button
      class="btn btn-play"
      :disabled="!canPlay"
      @click="$emit('play')"
    >出牌</button>
    <button
      class="btn btn-discard"
      :disabled="!canDiscard"
      @click="$emit('discard')"
    >弃牌</button>
    <button class="btn btn-restart" @click="$emit('restart')">重新开始</button>
  </div>
</template>

<script setup>
defineProps({
  canPlay: Boolean,
  canDiscard: Boolean,
})
defineEmits(['play', 'discard', 'restart'])
</script>

<style scoped>
.action-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
  padding: 10px 24px;
  background: rgba(0,0,0,.3);
  border-top: 1px solid rgba(255,255,255,.06);
  flex-shrink: 0;
}
.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: none;
  border-radius: var(--radius-btn);
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  padding: 10px 28px;
  transition: transform 150ms ease, box-shadow 150ms ease, opacity 150ms ease;
  letter-spacing: .3px;
}
.btn:hover:not(:disabled) { transform: translateY(-2px); }
.btn:active:not(:disabled) { transform: translateY(0); }
.btn:disabled { opacity: .4; cursor: not-allowed; }
.btn-play    { background: var(--color-accent); color: #fff; box-shadow: 0 4px 14px rgba(232,104,42,.45); }
.btn-play:hover:not(:disabled) { box-shadow: 0 6px 18px rgba(232,104,42,.6); }
.btn-discard { background: var(--color-discard); color: #fff; box-shadow: 0 4px 14px rgba(168,50,50,.4); }
.btn-discard:hover:not(:disabled) { box-shadow: 0 6px 18px rgba(168,50,50,.55); }
.btn-restart { background: transparent; color: rgba(255,255,255,.7); border: 1.5px solid rgba(255,255,255,.3); }
.btn-restart:hover { border-color: rgba(255,255,255,.6); color: #fff; }
</style>
