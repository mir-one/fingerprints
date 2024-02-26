import "@stdlib/deploy";
import "./messages/proposal-messages";


contract Proposal with Deployable {

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
    
    init(proposalDeployer: Address, id: Int) {
        self.proposalDeployer = proposalDeployer;
        self.id = id;

        self.proposalStartTime = 0;
        self.proposalEndTime = 0;
        self.proposalSnapshotTime = 0;
        self.votingSystem = "";
        self.votingPowerStrategies = "";
        self.title = "";
        self.description = "";        
        self.quorum = "";
        self.hide = false;
    }

    receive(msg: ProposalInit) {
        require(self.proposalStartTime == 0 && self.proposalEndTime == 0 && self.proposalSnapshotTime == 0, "Already initialized");
        require(sender() == self.proposalDeployer, "Invalid sender");

        self.proposalStartTime = msg.body.proposalStartTime;
        self.proposalEndTime = msg.body.proposalEndTime;
        self.proposalSnapshotTime = msg.body.proposalSnapshotTime;
        self.votingSystem = msg.body.votingSystem;
        self.votingPowerStrategies = msg.body.votingPowerStrategies;
        self.title = msg.body.title;
        self.description = msg.body.description;
        self.quorum = msg.body.quorum;
        self.hide = msg.body.hide;
    }

    receive(vote: Vote) {
        require(now() >= self.proposalStartTime && now() <= self.proposalEndTime, "Incative proposal");
    }

    receive(msg: UpdateProposal) {
        require(self.proposalStartTime != 0 && self.proposalEndTime != 0 && self.proposalSnapshotTime != 0, "Propsal was not initialized yet");
        require(sender() == self.proposalDeployer, "Invalid sender");
        require(now() <= self.proposalStartTime, "Update proposals is possible only before start time");

        self.proposalStartTime = msg.updateParams.proposalStartTime;
        self.proposalEndTime = msg.updateParams.proposalEndTime;
        self.proposalSnapshotTime = msg.updateParams.proposalSnapshotTime;
        self.votingSystem = msg.updateParams.votingSystem;
        self.votingPowerStrategies = msg.updateParams.votingPowerStrategies;
        self.title = msg.updateParams.title;
        self.description = msg.updateParams.description;
        self.quorum = msg.updateParams.quorum;
        self.hide = msg.updateParams.hide;        
    }

    get fun state(): ProposalContractState {
        return ProposalContractState {
            proposalDeployer: self.proposalDeployer,
            id: self.id,
            proposalStartTime: self.proposalStartTime,
            proposalEndTime: self.proposalEndTime,
            proposalSnapshotTime: self.proposalSnapshotTime,
            votingSystem: self.votingSystem,
            votingPowerStrategies: self.votingPowerStrategies,
            title: self.title,
            description: self.description,
            quorum: self.quorum,
            hide: self.hide
        };
    }
}