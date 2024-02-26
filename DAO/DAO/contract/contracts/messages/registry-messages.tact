
// ---------------------------------------
// Registry
// ---------------------------------------
message DeployAndInitDao {
    owner: Address;
    proposalOwner: Address;
    metadata: Address;
}

message SendDaoInit {
    owner: Address;
    proposalOwner: Address;
    metadata: Address;
}

message SetDeployAndInitDaoFee {
    newDeployAndInitDaoFee: Int as uint64;
}

message SetNewDaoFwdMsgFee {
    newDaosfwdMsgFee: Int as uint64;
}

message SendToDaoSetFwdMsgFee {
    daoId: Int as uint32;
    newFwdMsgFee: Int as uint64;    
}

message SetRegistryAdmin {
    newAdmin: Address;
}

struct RegistryContractState {
    registryId: Int as uint32;
    nextDaoId: Int as uint32;
    admin: Address;
    deployAndInitDaoFee: Int as uint64;
    newDaosfwdMsgFee: Int as uint64;
}