import { Sequelize } from "sequelize-typescript";
import { BetDataService } from "./Bet";
import { UserDataService } from "./User";

 
export class DataServiceFactory {
  private _userDS: UserDataService
  private _betDS: BetDataService

constructor(private readonly em: Sequelize) {
}

  public getUserDS(): UserDataService {
    this._userDS = this._userDS ?? new UserDataService(this.em)
    return this._userDS
  }

  public getBetDS(): BetDataService {
    this._betDS = this._betDS ?? new BetDataService(this.em)
    return this._betDS
  }
 
}
