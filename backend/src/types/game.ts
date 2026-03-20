export type PlayerStatus = 'clean' | 'infected' | 'eliminated'
export type RoomStatus = 'waiting' | 'starting' | 'active' | 'ended'
export type RoundPhase = 'infection' | 'discussion' | 'voting' | 'reveal' | 'ended'

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
