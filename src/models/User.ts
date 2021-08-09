import { Table, Model, Column, DataType, AutoIncrement, PrimaryKey, HasMany, Sequelize } from 'sequelize-typescript'
import { Field, Float, Int, ObjectType } from 'type-graphql';
import Bet, { BetUpsertParams } from './Bet';

export interface UserUpsertParams {
  id?: number
  name?: string
  balance?: number
  bets?: BetUpsertParams[]
}

@Table({
  tableName: "User",
  modelName: 'User',
  freezeTableName: true,
})
@ObjectType()
export default class User extends Model<User> {

  @Field(() => Int)
  @AutoIncrement
  @PrimaryKey  
  @Column(DataType.INTEGER)
  id: number;
  
  @Field({nullable: true})
  @Column(DataType.STRING)	
  name: string;

  @Field(() => Float)
  @Column(DataType.FLOAT)	
  balance: number;

  @Field(() => [Bet])
  @HasMany(() => Bet)
  bets: Bet[]
}
 
export function initUser(sequalize: Sequelize): any {
  const attributes: SequelizeAttributes<UserUpsertParams> = {
    id: { type:  DataType.INTEGER, primaryKey: true, autoIncrement: true},
    name: { type: DataType.STRING },
   };
  const User = sequalize.define("User", attributes);
  return User;
};