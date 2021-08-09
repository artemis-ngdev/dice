import appConfig from '../config'
import { DataServiceFactory } from '../database/services/Factory'
import {Promise} from 'bluebird'
import { UserUpsertParams } from '../models/User'
 
export const params: UserUpsertParams[]  = [
	{
		name: 'Artemis',
		balance: 1000 
	},
	{
		name: 'Mary',
		balance: 800 
	},
	{
		name: 'George',
		balance: 5000 
	}
]

 const populateUsers = async () => {
	
	const seq =  appConfig.ormPostgresOptions
 	const db = new DataServiceFactory(seq)

	 Promise.map(params, async (p) =>  {
		const user = await  db.getUserDS().repository.create({
			...p
		  })
	   	await user.save()
		})
 	console.log('Seeding users')

}

const seed = populateUsers()

export default seed