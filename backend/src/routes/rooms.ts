import { Router } from 'express'
import { z } from 'zod'

// TODO: Issue #19 - Implement full rooms API

export const roomRouter = Router()

const CreateRoomSchema = z.object({
  hostAddress: z.string().min(56).max(56),
  maxPlayers: z.number().int().min(4).max(12),
  stakeAmount: z.string(), // bigint as string
})

/**
 * GET /api/rooms
 * List open rooms
 * TODO: Issue #19
 */
roomRouter.get('/', async (_req, res) => {
  // TODO: Issue #19 - Fetch from Redis/DB
  res.json({ rooms: [], message: 'Not implemented — see issue #19' })
})

/**
 * GET /api/rooms/:id
 * Get a specific room's state
 * TODO: Issue #19
 */
roomRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  // TODO: Issue #19 - Fetch room from chain + Redis cache
  res.json({ room: null, message: 'Not implemented — see issue #19' })
})

/**
 * POST /api/rooms
 * Create a room (calls contract, returns room ID)
 * TODO: Issue #19
 */
roomRouter.post('/', async (req, res) => {
  const parsed = CreateRoomSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() })
  }
  // TODO: Issue #19
  // 1. Validate hostAddress is a valid Stellar address
  // 2. Prepare contract invocation XDR
  // 3. Return unsigned XDR for client to sign via Freighter
  res.json({ xdr: null, message: 'Not implemented — see issue #19' })
})
