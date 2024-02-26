import "@stdlib/deploy";
import "@stdlib/ownable";
import "./messages/router-messages";
import "./registry";


contract Router with Deployable {

    init() {    
    }
    
    receive(routeDeployAndInitDao: RouteDeployAndInitDao) {
        
        send(SendParameters{
            to: routeDeployAndInitDao.prodRegistry, 
            value: routeDeployAndInitDao.prodMsgValue, 
            bounce: false,
            mode: 0,
            body: DeployAndInitDao{owner: routeDeployAndInitDao.owner, proposalOwner: routeDeployAndInitDao.proposalOwner, 
            metadata: routeDeployAndInitDao.metadata}.toCell(),
            code: null,
            data: null
        });

        send(SendParameters{
            to: routeDeployAndInitDao.devRegistry, 
            value: routeDeployAndInitDao.devMsgValue, 
            bounce: false,
            mode: 0,
            body: DeployAndInitDao{owner: routeDeployAndInitDao.owner, proposalOwner: routeDeployAndInitDao.proposalOwner, 
            metadata: routeDeployAndInitDao.metadata}.toCell(),
            code: null,
            data: null
        });

    }
}