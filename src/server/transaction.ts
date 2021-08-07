import {NextFunction, Response, Request} from 'express'
import onFinished from 'on-finished'
import { DataServiceFactory } from '../database/services/Factory'
import ormConfig from '../orm.config'

export const useTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const connectionManager = ormConfig.connectionManager
    const connection = await connectionManager.getConnection({type: 'write'})
    
    req.trxContext = await ormConfig.transaction()
    req.dsFactory = new DataServiceFactory(ormConfig)
     // req.externalFactory = new ServiceFactory(appConfig)
    // req.user = await req.dsFactory.getUserDS().repository.findOne({where: {email: "artemis@smartape.io"}})
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onFinished(res, async (err: any) => {
		try {
		  if (!req.trxContext) return;
		  if (err) {
			await req.trxContext.rollback();
		  } else {
			await req.trxContext.commit();
		  }
		} finally {
      await connectionManager.releaseConnection(connection)
       // await req.trxContext.connectionManager
    	}
	  });
    next()
  } catch (error) {
    console.log('FUCKING ERROR ' , error)
    // await connectionManager.close()
    next(error)
  }
}
