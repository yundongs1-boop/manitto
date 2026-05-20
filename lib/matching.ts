import { PARTICIPANTS } from "./participants"
import { EVENT_SEED } from "./constants"

// Seeded PRNG implementation
function xmur3(str: string) {
  let h = 1779033703 ^ str.length
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507)
    h = Math.imul(h ^ (h >>> 13), 3266489909)
    return (h ^= h >>> 16) >>> 0
  }
}

function mulberry32(a: number) {
  return () => {
    let t = (a += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Fisher-Yates shuffle with seeded random
function seededShuffle<T>(array: T[], seed: string): T[] {
  const shuffled = [...array]
  const seedGen = xmur3(seed)
  const random = mulberry32(seedGen())

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return shuffled
}

// Get Manitto assignment for a participant
export function getManittoAssignment(participantId: number) {
  const shuffledParticipants = seededShuffle(PARTICIPANTS, EVENT_SEED)

  // Find the index of the current participant in the shuffled array
  const currentIndex = shuffledParticipants.findIndex((p) => p.id === participantId)

  if (currentIndex === -1) {
    throw new Error("Participant not found")
  }

  // Get the next participant in the circular list (their Manitto)
  const manittoIndex = (currentIndex + 1) % shuffledParticipants.length

  return shuffledParticipants[manittoIndex]
}
