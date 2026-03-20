#![cfg(test)]

use super::*;
use soroban_sdk::{testutils::Address as _, Address, Env};

// TODO: Issue #49 - Write full contract test suite

/// Helper: deploy a fresh PlagueGame contract
fn setup() -> (Env, Address, PlagueGameClient) {
    let env = Env::default();
    env.mock_all_auths();
    let admin = Address::generate(&env);
    let contract_id = env.register_contract(None, PlagueGame);
    let client = PlagueGameClient::new(&env, &contract_id);
    client.initialize(&admin);
    (env, admin, client)
}

#[test]
fn test_create_room() {
    // TODO: Issue #49
    // let (env, admin, client) = setup();
    // let host = Address::generate(&env);
    // let room_id = client.create_room(&host, &8, &1_000_000);
    // assert_eq!(room_id, 1);
    todo!("Implement in issue #49")
}

#[test]
fn test_join_room_escrow() {
    // TODO: Issue #49
    todo!("Implement in issue #49")
}

#[test]
fn test_vote_and_elimination() {
    // TODO: Issue #49
    todo!("Implement in issue #49")
}

#[test]
fn test_drain_infected_stake() {
    // TODO: Issue #49
    todo!("Implement in issue #49")
}

#[test]
fn test_claim_winnings_clean_team() {
    // TODO: Issue #49
    todo!("Implement in issue #49")
}

#[test]
fn test_claim_winnings_infected_team() {
    // TODO: Issue #49
    todo!("Implement in issue #49")
}

#[test]
fn test_cannot_join_full_room() {
    // TODO: Issue #49
    todo!("Implement in issue #49")
}

#[test]
fn test_zk_commitment_verification() {
    // TODO: Issue #49
    todo!("Implement in issue #49")
}
