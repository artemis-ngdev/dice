import { Sequelize } from "sequelize-typescript";
import User from "../../models/User";
import { ADataService } from "./ADataService";

export class UserDataService extends ADataService<User> {
	constructor(em: Sequelize) {
	  super(em, User)
	}
  }
  