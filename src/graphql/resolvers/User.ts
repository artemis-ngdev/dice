import { Model } from "sequelize-typescript"
import { Arg, Ctx, FieldResolver, Int, Query, Resolver, Root } from "type-graphql"
import { IGraphqlContext } from ".."
import Bet from "../../database/models/Bet"
import User from "../../database/models/User"

@Resolver(() => User)
export class UserResolver {


  @Query((returns) => [User], {description: 'Get all users'})
  async getUserList(@Ctx() ctx: IGraphqlContext): Promise<Model<User, User>[]> {
     const {dsFactory} = ctx
     return await dsFactory.getUserDS().getMany()
   }

  @Query((returns) => User, {description: 'Get one user'})
  async getUser(@Arg('id', type => Int,{nullable: false}) id: number, @Ctx() ctx: IGraphqlContext): Promise<Model<User, User>> {
    const {dsFactory} = ctx
    return await dsFactory.getUserDS().getById(id)    
  }



  @FieldResolver(() => [Bet])
  async bets(@Root() user: User, @Ctx() ctx: IGraphqlContext): Promise<Model<Bet, Bet>[]>  {
    const {dsFactory} = ctx
    const bets = await dsFactory.getBetDS().repository.findAll({where: {userId: user.id}})
    return bets
  }

}