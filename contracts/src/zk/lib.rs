#![no_std]

//! ZKVerifier - On-chain Groth16 proof verifier for Plague game circuits
//!
//! Verifies three circuit types:
//!   1. RoleCommitment  — player committed to a role without revealing it
//!   2. InfectionProof  — player proves they performed valid infection action
//!   3. InnocenceProof  — player proves they are clean without revealing role
//!
//! TODO: Issue #47 - Implement Groth16 verifier in Soroban
//! TODO: Issue #48 - Add verification keys for each circuit

use soroban_sdk::{contract, contractimpl, contracttype, Env, String, Vec};

#[contracttype]
#[derive(Clone, PartialEq)]
pub enum CircuitType {
    RoleCommitment,
    InfectionProof,
    InnocenceProof,
}

#[contracttype]
#[derive(Clone)]
pub struct VerificationKey {
    pub alpha: Vec<String>,
    pub beta: Vec<Vec<String>>,
    pub gamma: Vec<Vec<String>>,
    pub delta: Vec<Vec<String>>,
    pub ic: Vec<Vec<String>>,
}

#[contracttype]
#[derive(Clone)]
pub struct Proof {
    pub pi_a: Vec<String>,
    pub pi_b: Vec<Vec<String>>,
    pub pi_c: Vec<String>,
}

#[contract]
pub struct ZKVerifier;

#[contractimpl]
impl ZKVerifier {
    /// Store verification key for a circuit type (admin only)
    /// TODO: Issue #47
    pub fn set_verification_key(
        env: Env,
        admin: soroban_sdk::Address,
        circuit: CircuitType,
        vk: VerificationKey,
    ) {
        admin.require_auth();
        // TODO: Issue #47 - Store vk indexed by circuit type
    }

    /// Verify a Groth16 proof for a given circuit
    /// Returns true if proof is valid, panics if invalid
    /// TODO: Issue #47
    pub fn verify(
        env: Env,
        circuit: CircuitType,
        proof: Proof,
        public_signals: Vec<String>,
    ) -> bool {
        // TODO: Issue #47
        // 1. Load verification key for circuit type
        // 2. Perform pairing checks (BN254 curve arithmetic)
        //    e(A, B) == e(alpha, beta) * e(vk_x, gamma) * e(C, delta)
        // 3. Return true if valid
        // NOTE: BN254 pairing in Soroban is the hard part — see issue #47
        false
    }
}
