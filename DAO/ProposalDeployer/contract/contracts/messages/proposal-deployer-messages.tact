import "./proposal-messages";

// ---------------------------------------
// ProposalDeployer
// ---------------------------------------
message DeployAndInitProposal {
    body: Params;
}

message SendProposalInit {
    body: Params;
}

message SendUpdateProposal {
    proposalAddress: Address;
    updateParams: Params;
}
