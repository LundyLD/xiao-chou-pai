import { reactive } from 'vue'

const SUITS = ['♥', '♦', '♣', '♠']
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
const RANK_ORDER = { A: 0, '2': 1, '3': 2, '4': 3, '5': 4, '6': 5, '7': 6, '8': 7, '9': 8, '10': 9, J: 10, Q: 11, K: 12 }

function rankValue(r) {
  if (r === 'A') return 11
  if (['K', 'Q', 'J'].includes(r)) return 10
  return parseInt(r)
}

function buildDeck() {
  const deck = []
  for (const suit of SUITS)
    for (const rank of RANKS)
      deck.push({ suit, rank, value: rankValue(rank), id: suit + rank })
  return deck
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function identifyHand(cards) {
  if (!cards || cards.length === 0) return null
  const n = cards.length
  const suits = cards.map(c => c.suit)
  const rankSet = new Set(cards.map(c => c.rank))

  const isFlush = n === 5 && suits.every(s => s === suits[0])
  const isRoyalFlush = isFlush && ['A', 'K', 'Q', 'J', '10'].every(r => rankSet.has(r))
  const isStraight = n === 5 && (() => {
    const idxs = cards.map(c => RANK_ORDER[c.rank]).sort((a, b) => a - b)
    const normal = idxs.every((v, i) => i === 0 || v === idxs[i - 1] + 1)
    const aceLow = JSON.stringify(idxs) === JSON.stringify([0, 1, 2, 3, 4])
    const aceHigh = JSON.stringify(idxs) === JSON.stringify([0, 9, 10, 11, 12])
    return normal || aceLow || aceHigh
  })()

  const freq = {}
  for (const c of cards) freq[c.rank] = (freq[c.rank] || 0) + 1
  const counts = Object.values(freq).sort((a, b) => b - a)

  if (isRoyalFlush)               return { name: '皇家同花顺', base: 100, mult: 8 }
  if (isFlush && isStraight)      return { name: '同花顺',     base: 100, mult: 8 }
  if (counts[0] === 4)            return { name: '四条',       base: 60,  mult: 7 }
  if (counts[0] === 3 && counts[1] === 2) return { name: '葫芦', base: 40, mult: 4 }
  if (isFlush)                    return { name: '同花',       base: 35,  mult: 4 }
  if (isStraight)                 return { name: '顺子',       base: 30,  mult: 4 }
  if (counts[0] === 3)            return { name: '三条',       base: 30,  mult: 3 }
  if (counts[0] === 2 && counts[1] === 2) return { name: '两对', base: 20, mult: 2 }
  if (counts[0] === 2)            return { name: '对子',       base: 10,  mult: 2 }
  return                                 { name: '高牌',       base: 5,   mult: 1 }
}

export function calcScore(cards) {
  const hand = identifyHand(cards)
  if (!hand) return 0
  const pointSum = cards.reduce((s, c) => s + c.value, 0)
  return (hand.base + pointSum) * hand.mult
}

export function useGame() {
  const state = reactive({
    deck: [],
    hand: [],
    selected: [],
    score: 0,
    target: 300,
    handsLeft: 4,
    discardsLeft: 3,
    gameStatus: 'playing',
    lastScore: 0,      // 本次出牌得分，用于触发得分特效
    scoreFlash: 0,     // 每次出牌自增，用于 watch 触发动画
  })

  function initGame() {
    const deck = shuffle(buildDeck())
    state.deck = deck.slice(8)
    state.hand = deck.slice(0, 8)
    state.selected = []
    state.score = 0
    state.target = 300
    state.handsLeft = 4
    state.discardsLeft = 3
    state.gameStatus = 'playing'
    state.lastScore = 0
    state.scoreFlash = 0
  }

  function toggleCard(card) {
    if (state.gameStatus !== 'playing') return
    const idx = state.selected.findIndex(s => s.id === card.id)
    if (idx !== -1) {
      state.selected.splice(idx, 1)
    } else {
      if (state.selected.length >= 5) return
      state.selected.push(card)
    }
  }

  function refillHand() {
    const need = 8 - state.hand.length
    if (need > 0 && state.deck.length > 0) {
      const drawn = state.deck.splice(0, Math.min(need, state.deck.length))
      state.hand.push(...drawn)
    }
  }

  function playHand() {
    if (state.selected.length === 0 || state.handsLeft <= 0) return
    const pts = calcScore(state.selected)
    state.lastScore = pts
    state.scoreFlash++
    state.score += pts
    state.handsLeft -= 1
    const playedIds = new Set(state.selected.map(c => c.id))
    state.hand = state.hand.filter(c => !playedIds.has(c.id))
    state.selected = []
    refillHand()
    if (state.score >= state.target) {
      state.gameStatus = 'win'
    } else if (state.handsLeft <= 0) {
      state.gameStatus = 'lose'
    }
  }

  function discardHand() {
    if (state.selected.length === 0 || state.discardsLeft <= 0) return
    state.discardsLeft -= 1
    const discardIds = new Set(state.selected.map(c => c.id))
    state.hand = state.hand.filter(c => !discardIds.has(c.id))
    state.selected = []
    refillHand()
  }

  initGame()

  return { state, initGame, toggleCard, playHand, discardHand }
}
