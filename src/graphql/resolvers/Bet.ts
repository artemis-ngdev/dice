import { Arg, Ctx, FieldResolver, Int, Mutation, Query, Resolver, Root } from "type-graphql"
import { IGraphqlContext } from ".."
import Bet, { BetUpsertParams, initBet } from "../../models/Bet"
import User from "../../models/User"
import {Model, Sequelize} from 'sequelize-typescript';
import ormConfig from "../../orm.config";
import ModelManager from "sequelize/types/lib/model-manager";

@Resolver(() => Bet)
export class BetResolver {
  @Query((returns) => [Bet], {description: 'Get all bets'})
  async getBetList(@Ctx() ctx: IGraphqlContext): Promise<Model<Bet, Bet>[]> {
     const {dsFactory} = ctx
     return await dsFactory.getBetDS().getMany()
   }

  @Query((returns) => Bet, {description: 'Get one bet'})
  async getBet(@Arg('id', type => Int, {nullable: false}) id: number, @Ctx() ctx: IGraphqlContext): Promise<Model<Bet, Bet>>{
    const {dsFactory} = ctx
    return await dsFactory.getBetDS().getById(id)    
  }

 

  @Query((returns) => [Bet], {description: 'Return a distinct list of the best bet each user has made'})
  async getBestBetPerUser(@Arg('limit',type => Int, {nullable: true}) limit: number,  @Ctx() ctx: IGraphqlContext) :Promise<Model<Bet, Bet>[]>{
    const {dsFactory } = ctx
    const clause =  {  
          attributes: [
            "userId", "win",
            [Sequelize.fn('MIN', Sequelize.col('betAmount')), 'betAmount'],
            [Sequelize.fn('MAX', Sequelize.col('payout')), 'payout'],
            [Sequelize.fn('MAX', Sequelize.col('chance')), 'chance'],
            ],
           where: {
            win: true,
            },
           limit,
           group: ["userId", "win"],
          //  include: [ { model: initBet(ormConfig), as: 'Div' } ],

          //  include:[{all:true}] ,
          //  include: [
          //   {
          //     model: initBet(ormConfig),
          //     required: false
          //   }
          // ],
          // 
          // raw: true,
      }       
    const result = await dsFactory.getBetDS().getMany(clause) 
    return  result
  }

 
  @Mutation((returns) => Bet)
  async createBet(
   @Arg('userId' ,type => Int, {nullable: false}) userId: number,
   @Arg('chance', {nullable: false}) chance: number, 
   @Arg('betAmount', {nullable: false}) betAmount: number, 
   @Ctx() ctx: IGraphqlContext)  {
    const {dsFactory} = ctx
    const params:BetUpsertParams = {
        userId,
        chance,
        betAmount,  
        win: false      
    }
    const user = await dsFactory.getUserDS().getById(userId)
    // validation for balance 
    if (user.getDataValue('balance') < betAmount) {
      throw Error('You do not have enough credits to place this bet!')
    }
      params.payout = params.betAmount * chance 
      if (params.payout > 0) { // assuming that if payout is positive then is a win
          params.win = true
      }
  
    return dsFactory.getBetDS().createBet({...params}).then(async (bet) => {
      if (bet) {
        // update balance 
        await user.update(
          {
            balance: user.getDataValue('balance') - betAmount
          },
          { where: { id: userId } }
        ).then(() => {})
      }
      if (bet && bet.getDataValue('win') === true) {
        // update balance since is a win
        await user.update(
          {
            balance: user.getDataValue('balance') + params.payout
          },
          { where: { id: userId } }
        ).then(() => {})
      }
      return bet
    })

    
    
  }

 
  @FieldResolver(() => User)
  async user(@Root() bet: Bet, @Ctx() ctx: IGraphqlContext): Promise<Model<User, User>> {
    const {dsFactory} = ctx
    const user = await dsFactory.getUserDS().getById(bet.userId)!
    return user
  }

}