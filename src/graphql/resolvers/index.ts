import { BetResolver } from "./Bet";
import { UserResolver } from "./User";


export const resolvers = [UserResolver, BetResolver] as const
