import { Sequelize } from "sequelize-typescript";
import Bet, { BetUpsertParams } from "../models/Bet";
import { ADataService } from "./ADataService";

export class BetDataService extends ADataService<Bet> {
	constructor(em: Sequelize) {
	  super(em, Bet)
	}

	public async createBet(params:BetUpsertParams) {
		const betObject = await this.repository.create({
		  ...params
		})
		return betObject.save().then(async (savedBed) => {
			return savedBed
		}) 
	}
 	 
  }
  