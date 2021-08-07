import {  Sequelize,  Table, Model, Column, DataType, AutoIncrement, PrimaryKey, Default, AllowNull, ForeignKey, BelongsTo } from 'sequelize-typescript'
// import { DataTypes } from 'sequelize/types';
import { Field, Int,Float, ObjectType } from 'type-graphql';
import ormConfig from '../../orm.config';
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
  // @AllowNull(false)	
  betAmount: number;

  @Field(() => Float,  {nullable: true})
  @Column(DataType.FLOAT)	
  // @AllowNull(false)	
  chance: number;

  @Field(() => Float, {nullable: true})
  @Column(DataType.FLOAT)	
  // @AllowNull(false)	
  payout: number;

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

  // Bet.associate = (models) => {
    // associations can be defined here
    // authoriseDate.belongsTo(models.User, { foreignKey: 'userId', });
  // };

  // User.hasMany(Bet);
  // Bet.belongsTo(User, { targetKey: 'id', foreignKey: 'f_userId'}); // A BelongsTo B
  // console.log('ddddddddd', Bet)
  return Bet;
};

// export function initProduct(sequalize: Sequelize.Sequelize): ProductModel {
//   const attributes: SequelizeAttributes<ProductAttributes> = {
//     id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
//     name: { type: Sequelize.STRING, allowNull: false },
//     price: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
//     archived: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
//   };
//   const Product = sequalize.define<ProductInstance, ProductAttributes>("Product", attributes);
//   return Product;
// };

// Bet.init(
//   {
//     id: {
//       type: DataType.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     userId: {
//       type: DataType.INTEGER,
//       references: {
//         model: User, // Can be both a string representing the table name or a Sequelize model
//         key: 'id'
//       }    
//     },
//     betAmount: {
//       type: DataType.FLOAT,
//     },
//     chance: {
//       type: DataType.FLOAT,
//     },
//     payout: {
//       type: DataType.FLOAT,
//     },
//     win: {
//       type: DataType.BOOLEAN,
//      },
//   },
//   {
//     // tableName: 'Bet',
//     sequelize: Sequelize
//   },
// );