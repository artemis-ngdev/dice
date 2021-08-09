import {  Sequelize,  Table, Model, Column, DataType, AutoIncrement, PrimaryKey, Default, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { Field, Int,Float, ObjectType } from 'type-graphql';
import User from './User';
 
export interface BetUpsertParams {
  id?: number
  userId?: number
  betAmount?: number;
  chance?: number;
  payout?: number;
  win?: boolean;
}


@Table({
  tableName: "Bet",
  modelName: 'Bet',
  freezeTableName: true,
})
@ObjectType()
export default class Bet extends Model<Bet> {

  @Field(() => Int)
  @AutoIncrement
  @PrimaryKey  
  @Column(DataType.INTEGER)
  id: number;
  
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)	
  @Field()
  userId: number

  @Field(() => User)
  @BelongsTo(() => User)
  user: User


  @Field(() => Float, {nullable: true})
  @Column(DataType.FLOAT)	
  betAmount: number;

  @Field(() => Float,  {nullable: true})
  @Column(DataType.FLOAT)	
  chance: number;

  @Field(() => Float, {nullable: true})
  @Column(DataType.FLOAT)	
  payout: number;

  @Default(false)	
  @Field(() => Boolean,  {nullable: true, defaultValue: false})
  @Column(DataType.BOOLEAN)	
   win: boolean;
}


export function initBet(sequalize: Sequelize): any {
  const attributes: SequelizeAttributes<BetUpsertParams> = {
    id: { type:  DataType.INTEGER, primaryKey: true, autoIncrement: true},
    userId: { type: DataType.INTEGER },
    betAmount: { type: DataType.FLOAT },
    chance: { type: DataType.FLOAT },
    payout: { type: DataType.FLOAT },
    win: { type: DataType.BOOLEAN },
   };
  const Bet = sequalize.define("Bet", attributes);

  return Bet;
};