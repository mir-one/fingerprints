
// ---------------------------------------
// Proposal
// ---------------------------------------
struct Params {
    proposalStartTime: Int as uint64;
    proposalEndTime: Int as uint64;
    proposalSnapshotTime: Int as uint64;
    votingSystem: String;
    votingPowerStrategies: String;
    title: String;
    description: String;
    quorum: String;
    hide: Bool;
}

message ProposalInit {
    body: Params;
}

message(0x7c420ea2) Vote {
    comment: String;
}

message UpdateProposal {
    updateParams: Params;
}

struct ProposalContractState {
    proposalDeployer: Address;
    id: Int as uint32;
    proposalStartTime: Int as uint64;
    proposalEndTime: Int as uint64;
    proposalSnapshotTime: Int as uint64;
    votingSystem: String;
    votingPowerStrategies: String;
    title: String;
    description: String;
    quorum: String;
    hide: Bool;        
}