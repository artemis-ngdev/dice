// import {Repository, EntityManager, DeepPartial} from 'typeorm'
import {snakeCase, get, keyBy} from 'lodash'
// import {ID, ObjectType} from '../../typings'
// import {IdentifierNotProvidedError} from '../../errors'
import { Model, Repository, Sequelize} from 'sequelize-typescript'
import ormConfig from '../../orm.config'

// export type ObjectType<T> = (new () => T)
export interface IGetManyQueryArgs<T> {}
export type ID = string | number
export interface IDataService<T> {
	getById(id: ID): Promise<Model<T> |undefined>
	getMany(args?: IGetManyQueryArgs<T>): Promise<Model<T>[]> 
  }

export abstract class ADataService<T> implements IDataService<T> {
  public readonly repository: Repository<Model<any, any>> // Repository<T>


  constructor(protected readonly em: Sequelize, private readonly _entity:any) {
    this.repository = em.getRepository(_entity)
  }


  public async getById(id: ID):  Promise<Model<T> |undefined>  {
    if (!id) throw new Error('Cannot find id')
    const x = await this.repository.findByPk(id)
    return x
  }

  public async getMany(whereClause?: any,): Promise<Model<T>[]> {
    const models = await this.repository.findAll(whereClause)
	  return models
  }
 
}
