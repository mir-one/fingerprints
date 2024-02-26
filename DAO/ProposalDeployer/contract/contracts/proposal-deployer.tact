import "@stdlib/deploy";
import "@stdlib/ownable";
import "./messages/proposal-deployer-messages";
import "./proposal";


contract ProposalDeployer with Deployable {

    dao: Address; // dao is parent contract (cannot be changed)
    nextProposalId: Int as uint32;

    init(dao: Address) {
        self.dao = dao;
        self.nextProposalId = 0;
    }

    receive(msg: DeployAndInitProposal) {
        require(sender() == self.dao, "only dao can send create proposal message");

        // Create message
        let init: StateInit = self.getProposalStateInit(self.nextProposalId);
        let proposalAddress: Address = contractAddress(init);

        send(SendParameters{
            to: proposalAddress, 
            value: 0, 
            bounce: false,
            mode: SendRemainingValue,
            body: ProposalInit{body: msg.body}.toCell(),
            code: init.code,
            data: init.data
        });

        self.nextProposalId = self.nextProposalId + 1;
    }

    receive(msg: SendUpdateProposal) {
        require(sender() == self.dao, "only dao can send update proposal message");

        send(SendParameters{
            to: msg.proposalAddress, 
            value: 0, 
            bounce: false,
            mode: SendRemainingValue,
            body: UpdateProposal{updateParams: msg.updateParams}.toCell()
        });
    }

    fun getProposalStateInit(index: Int): StateInit {
        return initOf Proposal(myAddress(), index);
    }

    get fun dao(): Address {
        return self.dao;
    }

    get fun nextProposalId(): Int {
        return self.nextProposalId;
    }

    get fun proposalAddr(index: Int): Address {
        let init: StateInit = self.getProposalStateInit(index);
        return contractAddress(init);
    }
}