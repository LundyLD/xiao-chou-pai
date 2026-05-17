<template>
  <div id="game-wrap" ref="wrap">
    <div class="game-viewport">
      <HUD
        :score="state.score"
        :target="state.target"
        :hands-left="state.handsLeft"
        :discards-left="state.discardsLeft"
        :last-score="state.lastScore"
        :score-flash="state.scoreFlash"
      />
      <PlayZone :selected="state.selected" />
      <HandZone
        :hand="state.hand"
        :selected="state.selected"
        @toggle="toggleCard"
      />
      <ActionBar
        :can-play="canPlay"
        :can-discard="canDiscard"
        @play="playHand"
        @discard="discardHand"
        @restart="initGame"
      />
      <GameModal
        :visible="state.gameStatus === 'win' || state.gameStatus === 'lose'"
        :status="state.gameStatus"
        :score="state.score"
        @restart="initGame"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useGame } from './useGame.js'
import HUD from './components/HUD.vue'
import PlayZone from './components/PlayZone.vue'
import HandZone from './components/HandZone.vue'
import ActionBar from './components/ActionBar.vue'
import GameModal from './components/GameModal.vue'

const { state, initGame, toggleCard, playHand, discardHand } = useGame()

const canPlay = computed(() =>
  state.gameStatus === 'playing' && state.selected.length > 0 && state.handsLeft > 0
)
const canDiscard = computed(() =>
  state.gameStatus === 'playing' && state.selected.length > 0 && state.discardsLeft > 0
)

const wrap = ref(null)

function applyScale() {
  if (!wrap.value) return
  const scaleX = window.innerWidth / 1080
  const scaleY = window.innerHeight / 640
  const scale = Math.min(scaleX, scaleY, 1)
  if (scale < 1) {
    const scaledW = Math.floor(1080 * scale)
    const scaledH = Math.floor(640 * scale)
    // 水平居中：左移使游戏在视口中央
    const offsetX = Math.max(0, Math.floor((window.innerWidth - scaledW) / 2))
    const offsetY = Math.max(0, Math.floor((window.innerHeight - scaledH) / 2))
    wrap.value.style.transformOrigin = 'top left'
    wrap.value.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`
    document.body.style.overflow = 'hidden'
  } else {
    wrap.value.style.transform = ''
    document.body.style.overflow = ''
  }
}

onMounted(() => {
  applyScale()
  window.addEventListener('resize', applyScale)
})
onUnmounted(() => window.removeEventListener('resize', applyScale))
</script>

<style scoped>
#game-wrap {
  width: 1080px;
  height: 640px;
}
.game-viewport {
  width: 1080px;
  height: 640px;
  background: var(--color-table);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 12px 48px rgba(0,0,0,.45);
  position: relative;
  background-image:
    radial-gradient(ellipse at 50% 100%, rgba(0,0,0,.25) 0%, transparent 70%),
    repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,.012) 20px, rgba(255,255,255,.012) 21px);
}
</style>
