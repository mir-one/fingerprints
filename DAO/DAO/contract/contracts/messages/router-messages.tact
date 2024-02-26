
// ---------------------------------------
// Router
// ---------------------------------------
message RouteDeployAndInitDao {
    prodMsgValue: Int as uint64;
    devMsgValue: Int as uint64;

    prodRegistry: Address;
    devRegistry: Address;

    owner: Address;
    proposalOwner: Address;
    metadata: Address;
}
