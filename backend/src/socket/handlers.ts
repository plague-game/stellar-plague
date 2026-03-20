import { Server, Socket } from 'socket.io'
import { logger } from '../lib/logger'
import type { GameEvent } from '../types/game'

// TODO: Issue #20 - Implement full socket event handlers
// TODO: Issue #21 - Implement room state sync via Redis

export function setupSocketHandlers(io: Server) {
  io.on('connection', (socket: Socket) => {
    logger.info(`Client connected: ${socket.id}`)

    /**
     * Player joins a socket room for real-time updates
     * TODO: Issue #20
     */
    socket.on('join_room', async ({ roomId, playerAddress }: { roomId: string; playerAddress: string }) => {
      // TODO: Issue #20
      // 1. Validate roomId exists in DB/Redis
      // 2. Verify playerAddress is in the room
      // 3. socket.join(roomId)
      // 4. Broadcast player_joined to room
      // 5. Send current room state to connecting player
      socket.join(roomId)
      logger.info(`${socket.id} joined room ${roomId}`)
    })

    /**
     * Player leaves a room
     * TODO: Issue #20
     */
    socket.on('leave_room', ({ roomId }: { roomId: string }) => {
      socket.leave(roomId)
    })

    /**
     * Player action: infect a target (Patient Zero / infected only)
     * Must include ZK proof before forwarding to contract
     * TODO: Issue #22
     */
    socket.on('action_infect', async (payload: {
      roomId: string
      targetAddress: string
      zkProof: string
    }) => {
      // TODO: Issue #22
      // 1. Verify ZK infection proof
      // 2. Call contract triggerInfection
      // 3. Broadcast infection event to room (without revealing who infected)
    })

    /**
     * Phase timer tick — backend manages phase transitions
     * TODO: Issue #23
     */
    socket.on('request_phase_advance', async ({ roomId }: { roomId: string }) => {
      // TODO: Issue #23
      // 1. Check if phase timer has expired
      // 2. Advance to next phase
      // 3. Broadcast phase_changed event
    })

    socket.on('disconnect', () => {
      logger.info(`Client disconnected: ${socket.id}`)
    })
  })
}

/**
 * Broadcast a game event to all players in a room
 */
export function broadcastEvent(io: Server, roomId: string, event: GameEvent) {
  io.to(roomId).emit('game_event', event)
}
