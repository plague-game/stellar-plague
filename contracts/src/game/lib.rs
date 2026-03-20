#![no_std]

//! PlagueGame - Main game room contract
//! Handles room creation, player joining, escrow, rounds, voting, and payouts
//!
//! TODO: Issue #40 - Implement full game room contract
//! TODO: Issue #41 - Implement escrow and payout logic
//! TODO: Issue #42 - Implement round management

use soroban_sdk::{
    contract, contractimpl, contracttype, contractclient,
    Env, Address, String, Vec, Map, Symbol,
    token, log, panic_with_error,
};

// ─── Storage Keys ──────────────────────────────────────────────────────────

#[contracttype]
pub enum DataKey {
    Room(u64),
    Player(u64, Address),
    RoomCount,
    Config,
}

// ─── Enums ─────────────────────────────────────────────────────────────────

#[contracttype]
#[derive(Clone, PartialEq)]
pub enum RoomStatus {
    Waiting,
    Starting,
    Active,
    Ended,
}

#[contracttype]
#[derive(Clone, PartialEq)]
pub enum RoundPhase {
    Infection,
    Discussion,
    Voting,
    Reveal,
    Ended,
}

#[contracttype]
#[derive(Clone, PartialEq)]
pub enum PlayerStatus {
    Clean,
    Infected,
    Eliminated,
}

// ─── Data Structures ───────────────────────────────────────────────────────

#[contracttype]
#[derive(Clone)]
pub struct RoomConfig {
    pub min_players: u32,
    pub max_players: u32,
    pub stake_amount: i128,
    pub max_rounds: u32,
    pub round_duration_secs: u64,
    pub discussion_duration_secs: u64,
    pub voting_duration_secs: u64,
}

#[contracttype]
#[derive(Clone)]
pub struct Room {
    pub id: u64,
    pub host: Address,
    pub status: RoomStatus,
    pub config: RoomConfig,
    pub players: Vec<Address>,
    pub current_round: u32,
    pub pot: i128,
    pub created_at: u64,
    pub started_at: u64,
}

#[contracttype]
#[derive(Clone)]
pub struct PlayerState {
    pub address: Address,
    pub status: PlayerStatus,
    /// Poseidon hash commitment of the player's role + secret
    /// ZK proof verifies this without revealing the role
    pub role_commitment: String,
    pub staked: i128,
    pub vote_target: Option<Address>,
    pub joined_at: u64,
}

#[contracttype]
#[derive(Clone)]
pub struct Round {
    pub number: u32,
    pub phase: RoundPhase,
    pub phase_ends_at: u64,
    pub votes: Map<Address, Address>,
    pub eliminated: Vec<Address>,
    pub drain_amount: i128,
}

// ─── Contract ──────────────────────────────────────────────────────────────

#[contract]
pub struct PlagueGame;

#[contractimpl]
impl PlagueGame {
    /// Initialize the contract (called once on deploy)
    pub fn initialize(env: Env, admin: Address) {
        admin.require_auth();
        // TODO: Issue #40 - Store admin, set initial config
        log!(&env, "PlagueGame initialized");
    }

    /// Create a new game room
    /// Returns the room ID
    ///
    /// TODO: Issue #40
    pub fn create_room(
        env: Env,
        host: Address,
        max_players: u32,
        stake_amount: i128,
    ) -> u64 {
        host.require_auth();
        // TODO: Issue #40
        // 1. Validate params (max_players 4–12, stake_amount > 0)
        // 2. Increment room counter
        // 3. Create Room struct and store it
        // 4. Emit room_created event
        panic_with_error!(&env, 1u32); // placeholder
    }

    /// Player joins a room and stakes XLM
    ///
    /// TODO: Issue #41
    pub fn join_room(env: Env, player: Address, room_id: u64) {
        player.require_auth();
        // TODO: Issue #41
        // 1. Load room, verify status is Waiting
        // 2. Check player not already in room
        // 3. Check room not full
        // 4. Transfer stake_amount from player to contract (escrow)
        // 5. Add player to room.players
        // 6. Update room pot
        // 7. Emit player_joined event
    }

    /// Host starts the game — triggers VRF role assignment off-chain
    /// Players must submit role commitments before first round begins
    ///
    /// TODO: Issue #42
    pub fn start_game(env: Env, host: Address, room_id: u64) {
        host.require_auth();
        // TODO: Issue #42
        // 1. Verify caller is host
        // 2. Verify min_players reached
        // 3. Set room status to Starting
        // 4. Emit game_starting event (backend picks this up for VRF)
    }

    /// Player submits their ZK role commitment
    /// Must be called by all players during Starting phase
    ///
    /// TODO: Issue #43 - ZK commitment submission
    pub fn submit_role_commitment(
        env: Env,
        player: Address,
        room_id: u64,
        commitment: String,
        zk_proof: String, // serialised proof
    ) {
        player.require_auth();
        // TODO: Issue #43
        // 1. Verify game is in Starting phase
        // 2. Call ZKVerifier contract to verify the proof
        // 3. Store commitment in PlayerState
        // 4. If all players committed, start Round 1
    }

    /// Cast a vote to eliminate a player during Voting phase
    ///
    /// TODO: Issue #44
    pub fn cast_vote(
        env: Env,
        voter: Address,
        room_id: u64,
        target: Address,
    ) {
        voter.require_auth();
        // TODO: Issue #44
        // 1. Verify phase is Voting
        // 2. Verify voter is not eliminated
        // 3. Verify target is not eliminated
        // 4. Store vote (one vote per player per round)
        // 5. If all non-eliminated players voted, trigger vote resolution
    }

    /// Resolve votes at end of voting phase — eliminate majority target
    ///
    /// TODO: Issue #44
    pub fn resolve_votes(env: Env, room_id: u64) {
        // TODO: Issue #44
        // 1. Tally votes
        // 2. Eliminate player with most votes (tie = no elimination)
        // 3. Check win conditions
        // 4. Emit player_eliminated event
        // 5. Advance to next round or end game
    }

    /// Drain infected players' stakes each round
    ///
    /// TODO: Issue #45
    pub fn trigger_drain(env: Env, room_id: u64, round: u32) {
        // TODO: Issue #45
        // 1. Only callable by contract itself or admin (keeper pattern)
        // 2. For each infected player, subtract drain_amount from their stake
        // 3. Add drained amount to clean players' claimable balance
        // 4. Emit pot_drained event
    }

    /// Claim winnings after game ends
    ///
    /// TODO: Issue #46
    pub fn claim_winnings(env: Env, player: Address, room_id: u64) -> i128 {
        player.require_auth();
        // TODO: Issue #46
        // 1. Verify game is ended
        // 2. Calculate player's share based on win condition
        // 3. Transfer XLM from contract to player
        // 4. Mark player as claimed
        0
    }

    /// Read-only: Get room state
    pub fn get_room(env: Env, room_id: u64) -> Room {
        env.storage()
            .persistent()
            .get(&DataKey::Room(room_id))
            .expect("Room not found")
    }

    /// Read-only: Get player state within a room
    pub fn get_player(env: Env, room_id: u64, player: Address) -> PlayerState {
        env.storage()
            .persistent()
            .get(&DataKey::Player(room_id, player))
            .expect("Player not found")
    }
}
