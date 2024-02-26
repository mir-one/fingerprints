import "@stdlib/deploy";
import "@stdlib/ownable";
import "./messages/registry-messages";
import "./dao";


contract Registry with Deployable {

    registryId: Int as uint32;
    nextDaoId: Int as uint32;
    admin: Address;
    deployAndInitDaoFee: Int as uint64;
    newDaosfwdMsgFee: Int as uint64;

    init(registryId: Int) {
        self.registryId = registryId;
        self.nextDaoId = 0;
        self.admin = newAddress(0, 0x0);
        self.deployAndInitDaoFee = ton("1");
        self.newDaosfwdMsgFee = ton("0.1");
    }
    
    receive(deployAndInitDao: DeployAndInitDao) {
        require(context().value >= self.deployAndInitDaoFee, "Below min fee for create dao");
        
        let init: StateInit = self.getDaoStateInit(self.nextDaoId);
        let daoAddress: Address = contractAddress(init);

        send(SendParameters{
            to: daoAddress, 
            value: 0, 
            bounce: false,
            mode: SendRemainingValue,
            body: DaoInit{owner: deployAndInitDao.owner, proposalOwner: deployAndInitDao.proposalOwner, 
            metadata: deployAndInitDao.metadata, fwdMsgFee: self.newDaosfwdMsgFee}.toCell(),
            code: init.code,
            data: init.data
        });

        self.nextDaoId = self.nextDaoId + 1;
    }

    receive(msg: SetDeployAndInitDaoFee) {
        require(sender() == self.admin, "Only admin can set the create dao fee");
        self.deployAndInitDaoFee = msg.newDeployAndInitDaoFee;
    }

    // effects daos which were not created yet
    receive(msg: SetNewDaoFwdMsgFee) {
        require(sender() == self.admin, "Only admin can set the new dao fwd msg fee");
        self.newDaosfwdMsgFee = msg.newDaosfwdMsgFee;
    }

    // effects already created daos
    receive(msg: SendToDaoSetFwdMsgFee) {
        require(sender() == self.admin, "Only admin can set the dao fwd msg fee");

        let init: StateInit = self.getDaoStateInit(msg.daoId);
        let daoAddress: Address = contractAddress(init);

        send(SendParameters{
            to: daoAddress, 
            value: 0, 
            bounce: false,
            mode: SendRemainingValue,
            body: SetFwdMsgFee{newFwdMsgFee: msg.newFwdMsgFee}.toCell()
        });
    }

    receive(msg: SetRegistryAdmin) {
        // to burn the admin set it to newAddress(-1, 0x0)
        require(sender() == self.admin || self.admin == newAddress(0, 0x0), "Only admin can set new registry admin");
        self.admin = msg.newAdmin;
    }

    fun getDaoStateInit(daoIndex: Int): StateInit {
        return initOf Dao(myAddress(), daoIndex);
    }

    get fun state(): RegistryContractState {
        return RegistryContractState {
            registryId: self.registryId,
            nextDaoId: self.nextDaoId,
            admin: self.admin,
            deployAndInitDaoFee: self.deployAndInitDaoFee,
            newDaosfwdMsgFee: self.newDaosfwdMsgFee
        };
    }

    get fun nextDaoId(): Int {
        return self.nextDaoId;
    }

    get fun daoAddress(daoId: Int): Address {
        let init: StateInit = self.getDaoStateInit(daoId);
        return contractAddress(init);
    }
}