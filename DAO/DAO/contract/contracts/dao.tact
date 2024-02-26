import "@stdlib/deploy";
import "@stdlib/ownable";
import "./messages/dao-messages";


contract Dao with Deployable {

    owner: Address;
    registry: Address;
    proposalOwner: Address;
    daoIndex: Int as uint32;    
    metadata: Address;
    fwdMsgFee: Int as uint64;

    init(registry: Address, daoIndex: Int) {
        self.registry = registry; 
        self.daoIndex = daoIndex;

        self.owner =  newAddress(0, 0x0);
        self.proposalOwner = newAddress(0, 0x0);
        self.metadata =  newAddress(0, 0x0);
        self.fwdMsgFee = ton("1000000");
    }
    
    receive(init: DaoInit) {
        require(self.owner == newAddress(0, 0x0), "Already initialized");
        require(sender() == self.registry, "Invalid sender");

        self.owner = init.owner;
        self.proposalOwner = init.proposalOwner;
        self.metadata = init.metadata;
        self.fwdMsgFee = init.fwdMsgFee;
    }

    receive(msg: SetOwner) {
        require(sender() == self.owner, "Invalid sender");
        self.owner = msg.newOwner;
    }

    receive(msg: SetProposalOwner) {
        require(sender() == self.owner, "Invalid sender");
        self.proposalOwner = msg.newProposalOwner;
    }

    receive(msg: SetMetadata) {
        require(sender() == self.owner, "Invalid sender");
        self.metadata = msg.newMetadata;
    }

    receive(msg: SetFwdMsgFee) {
        require(sender() == self.registry, "Only registry can change fwd msg fee");
        self.fwdMsgFee = msg.newFwdMsgFee;
    }

    receive(msg: FwdMsg) {
        require(sender() == self.owner || sender() == self.proposalOwner, "Invalid sender");        
        require(context().value >= self.fwdMsgFee, "Below min fee for dao forward message");
        send(msg.fwdMsg);
    }

    get fun state(): DaoContractState {
        return DaoContractState {
            registry: self.registry, 
            owner: self.owner, 
            proposalOwner: self.proposalOwner, 
            metadata: self.metadata, 
            daoIndex: self.daoIndex, 
            fwdMsgFee: self.fwdMsgFee
        };
    }
}