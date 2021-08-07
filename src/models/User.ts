import { Table, Model, Column, DataType, AutoIncrement, PrimaryKey, Default, HasMany, AllowNull, Sequelize } from 'sequelize-typescript'
import { Field, Float, Int, ObjectType } from 'type-graphql';
import Bet, { BetUpsertParams } from './Bet';

interface UserUpsertParams {
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
  // @AllowNull(true)	
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
    // User.hasMany(Bet)

  return User;
};

// User.init(
//   {
//     id: {
//       type: DataType.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     name: {
//       type: DataType.STRING,
//     },
//   },
//   {
//     // tableName: 'Bet',
//     sequelize,
//     //  modelName: 'User',

//   },
// );

 