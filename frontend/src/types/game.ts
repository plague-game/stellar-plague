// ─── Player ────────────────────────────────────────────────────────────────

export type PlayerStatus = 'clean' | 'infected' | 'eliminated'
export type PlayerRole = 'patient_zero' | 'infected' | 'clean' | 'unknown'

export interface Player {
  id: string
  walletAddress: string
  displayName: string
  status: PlayerStatus
  /** Only revealed at game end or via ZK proof */
  role: PlayerRole
  isEliminated: boolean
  stakedAmount: bigint
  joinedAt: number
}

// ─── Room ──────────────────────────────────────────────────────────────────

export type RoomStatus = 'waiting' | 'starting' | 'active' | 'ended'

export interface Room {
  id: string
  contractAddress: string
  hostAddress: string
  players: Player[]
  maxPlayers: number
  minPlayers: number
  stakeAmount: bigint
  status: RoomStatus
  currentRound: number
  maxRounds: number
  createdAt: number
  startedAt?: number
  endedAt?: number
}

// ─── Round ─────────────────────────────────────────────────────────────────

export type RoundPhase = 'infection' | 'discussion' | 'voting' | 'reveal' | 'ended'

export interface Round {
  number: number
  phase: RoundPhase
  infectedThisRound: string[]
  eliminatedThisRound: string[]
  votes: Vote[]
  drainAmount: bigint
  startedAt: number
  phaseEndsAt: number
}

// ─── Vote ──────────────────────────────────────────────────────────────────

export interface Vote {
  voterAddress: string
  targetAddress: string
  timestamp: number
}

// ─── ZK Proof ──────────────────────────────────────────────────────────────

export interface ZKProof {
  proof: {
    pi_a: string[]
    pi_b: string[][]
    pi_c: string[]
  }
  publicSignals: string[]
}

export interface RoleCommitment {
  commitment: string
  nullifier: string
}

// ─── Game State ────────────────────────────────────────────────────────────

export interface GameState {
  room: Room | null
  localPlayer: Player | null
  currentRound: Round | null
  isConnected: boolean
  isLoading: boolean
  error: string | null
}

// ─── Contract ──────────────────────────────────────────────────────────────

export interface ContractConfig {
  contractId: string
  network: 'testnet' | 'mainnet'
  rpcUrl: string
}

// ─── Events (Socket) ───────────────────────────────────────────────────────

export type GameEventType =
  | 'player_joined'
  | 'player_left'
  | 'game_started'
  | 'round_started'
  | 'phase_changed'
  | 'vote_cast'
  | 'player_eliminated'
  | 'player_infected'
  | 'game_ended'
  | 'pot_drained'

export interface GameEvent {
  type: GameEventType
  roomId: string
  payload: Record<string, unknown>
  timestamp: number
}
