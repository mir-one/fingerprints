
// ---------------------------------------
// Dao
// ---------------------------------------
message SetOwner {
    newOwner: Address;
}

message SetProposalOwner {
    newProposalOwner: Address;
}

message SetFwdMsgFee {
    newFwdMsgFee: Int as uint64;
}

message SetMetadata {
    newMetadata: Address;
}

message FwdMsg {
    fwdMsg: SendParameters;
}

message DaoInit {
    owner: Address;
    proposalOwner: Address;
    metadata: Address;
    fwdMsgFee: Int as uint64;
}

struct DaoContractState {

    registry: Address;
    owner: Address;
    proposalOwner: Address;
    metadata: Address;
    daoIndex: Int as uint32;    
    fwdMsgFee: Int as uint64;
}
