// innocence_proof.nr
// Circuit: Proves a player is clean (not infected, not patient_zero)
// without revealing their secret or role
//
// Public inputs:  commitment, nullifier (prevents double-proving)
// Private inputs: role, secret
//
// TODO: Issue #36 - Implement and test this circuit

use dep::std::hash::poseidon;

global ROLE_CLEAN: Field = 0;

fn main(
    // Public
    commitment: pub Field,
    nullifier: pub Field,
    // Private
    role: Field,
    secret: Field,
) {
    // 1. Constrain role is boolean
    assert(role * (role - 1) == 0);

    // 2. Prove role is CLEAN (not patient_zero)
    assert(role == ROLE_CLEAN);

    // 3. Verify commitment matches
    let computed_commitment = poseidon::bn254::hash_2([role, secret]);
    assert(computed_commitment == commitment);

    // 4. Verify nullifier (prevents reuse of same proof)
    // nullifier = poseidon(secret, round_number)
    // NOTE: round_number must also be a private input here
    // TODO: Issue #36 - Add round_number as private input and bind nullifier to it
    let computed_nullifier = poseidon::bn254::hash_1([secret]);
    assert(computed_nullifier == nullifier);
}
