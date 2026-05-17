<template>
  <div class="play-zone">
    <Transition name="badge">
      <div v-if="handInfo" class="hand-type-badge">
        {{ handInfo.name }}
      </div>
      <div v-else class="hand-type-badge hidden">　</div>
    </Transition>

    <div class="play-cards">
      <TransitionGroup name="play-card" tag="div" class="play-cards-inner">
        <template v-if="selected.length === 0">
          <div v-for="i in 5" :key="'ph-empty-' + i" class="play-placeholder">+</div>
        </template>
        <template v-else>
          <PokerCard
            v-for="(card, index) in selected"
            :key="card.id"
            :card="card"
            :in-play-zone="true"
            :style="{ '--play-delay': `${index * 50}ms` }"
          />
          <div
            v-for="i in (5 - selected.length)"
            :key="'ph-' + i"
            class="play-placeholder"
          >+</div>
        </template>
      </TransitionGroup>
    </div>

    <div class="zone-hint">
      {{ selected.length > 0 && handInfo ? `得分预览：${previewScore} 分` : '选中 1–5 张牌后点击「出牌」' }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import PokerCard from './PokerCard.vue'
import { identifyHand, calcScore } from '../useGame.js'

const props = defineProps({
  selected: { type: Array, required: true },
})

const handInfo = computed(() => identifyHand(props.selected))
const previewScore = computed(() => calcScore(props.selected))
</script>

<style scoped>
.play-zone {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,.15);
  border-bottom: 1px solid rgba(255,255,255,.06);
  gap: 12px;
}

/* Badge */
.hand-type-badge {
  background: rgba(232,104,42,.85);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  padding: 5px 18px;
  border-radius: var(--radius-btn);
  letter-spacing: .5px;
  box-shadow: 0 2px 8px rgba(232,104,42,.4);
  min-width: 80px;
  text-align: center;
}
.hand-type-badge.hidden {
  visibility: hidden;
  background: transparent;
  box-shadow: none;
}

/* Badge 弹入动画 */
.badge-enter-active {
  animation: badge-pop 280ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
.badge-leave-active {
  animation: badge-fade 150ms ease-in both;
}
@keyframes badge-pop {
  from { opacity: 0; transform: scale(0.5) translateY(8px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes badge-fade {
  to { opacity: 0; transform: scale(0.85); }
}

/* 出牌区牌列表 */
.play-cards { display: flex; justify-content: center; }
.play-cards-inner { display: flex; gap: 12px; align-items: center; }

/* 出牌飞入动画 */
.play-card-enter-active {
  animation: play-in 280ms cubic-bezier(0.34, 1.46, 0.64, 1) both;
  animation-delay: var(--play-delay, 0ms);
}
.play-card-leave-active {
  animation: play-out 180ms ease-in both;
}
.play-card-move {
  transition: transform 250ms ease;
}

@keyframes play-in {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.75) rotate(-6deg);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1) rotate(0deg);
  }
}
@keyframes play-out {
  from { opacity: 1; transform: scale(1); }
  to   { opacity: 0; transform: translateY(10px) scale(0.9); }
}

.play-placeholder {
  width: 88px;
  height: 128px;
  border-radius: var(--radius-card);
  border: 2px dashed rgba(255,255,255,.18);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,.25);
  font-size: 24px;
}
.zone-hint {
  font-size: 12px;
  color: rgba(255,255,255,.35);
  letter-spacing: .5px;
}
</style>
