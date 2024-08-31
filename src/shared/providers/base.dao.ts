import { Knex } from 'knex';
import { Inject } from '@nestjs/common';
import ObjectID from 'bson-objectid';
import { KnexService } from './knex.service';

export interface IBaseQuery<T> {
  getById(id: string, columns?: string[]): Promise<T>;

  updateById(id: string, value: T): Promise<T[]>;

  insert(value: T, returning?: string[]): Promise<T>;

  insertWithTransaction(
    trx: Knex.Transaction,
    value: T,
    returning?: string[],
  ): Promise<T[]>;

  updateByIdWithTransaction(
    trx: Knex.Transaction,
    id: string,
    value: T,
  ): Promise<T[]>;

  getByIdWithTransaction(
    trx: Knex.Transaction,
    id: string,
    columns?: string[],
  ): Promise<T>;
}

export class BaseRepo<T> implements IBaseQuery<T> {
  @Inject() private knexService: KnexService;
  get knex() {
    return this.knexService.instance;
  }

  get tableName(): string {
    return this._tableName;
  }

  constructor(private _tableName: string) {}

  generateRecordId() {
    return new ObjectID().toString();
  }

  getById(id: string, columns = ['*']): Promise<T> {
    return this.knexService.instance
      .select(columns)
      .from(this._tableName)
      .where('id', id)
      .first();
  }

  getAll(): Promise<T> {
    return this.knexService.instance
      .select('*')
      .from(this._tableName)
      .whereNull('is_deleted')
      .orWhere('is_deleted', false);
  }

  updateById(id: string, value: T, returning = ['*']): Promise<T[]> {
    return this.knexService
      .instance(this._tableName)
      .update(value)
      .where('id', id)
      .returning(returning);
  }

  updateByColumn(
    column = 'id',
    id: string,
    value: T,
    returning = ['*'],
  ): Promise<T[]> {
    return this.knexService
      .instance(this._tableName)
      .update(value)
      .where(column, id)
      .returning(returning);
  }

  updateByConditions(
    conditions: T,
    values: T,
    returning = ['*'],
  ): Promise<T[]> {
    return this.knexService
      .instance(this._tableName)
      .update(values)
      .where(conditions)
      .returning(returning);
  }

  async insert(value: T, returning = ['*']): Promise<T> {
    const [data] = await this.knexService.instance
      .insert({ ...value, id: this.generateRecordId() })
      .into(this._tableName)
      .returning(returning);
    return data;
  }

  insertWithTransaction(trx: Knex.Transaction, value: T, returning = ['*']) {
    const queryBuilder = trx
      .insert(value)
      .into(this._tableName)
      .returning(returning);
    return queryBuilder.then((data) => (data.length === 1 ? data[0] : data));
  }

  updateByIdWithTransaction(
    trx: Knex.Transaction,
    id: string | string[],
    value: T,
    returning = ['*'],
  ) {
    let queryBuilder = trx
      .update(value)
      .from(this._tableName)
      .where('id', id)
      .returning(returning);
    if (Array.isArray(id) && id.length > 0) {
      queryBuilder = queryBuilder.whereIn(`id`, id);
    } else {
      queryBuilder = queryBuilder.where(`id`, id);
    }
    return queryBuilder.then((data) => (data.length === 1 ? data[0] : data));
  }

  getByIdWithTransaction(
    trx: Knex.Transaction,
    id: string,
    columns = ['*'],
  ): Promise<T> {
    return trx.select(columns).from(this._tableName).where('id', id).first();
  }

  selectWithTransaction(
    trx: Knex.Transaction | Knex,
    where: any,
    options = { limit: 0, offset: 0, columns: ['*'] },
  ) {
    let query = trx.select(options.columns).from(this._tableName).where(where);

    if (options.limit) {
      query = query.limit(Number(options.limit));
    }

    if (options.offset) {
      query = query.offset(Number(options.offset));
    }
    return query;
  }

  select(where: any, options = { limit: 0, offset: 0, columns: ['*'] }): any {
    let query = this.knexService.instance
      .select(options.columns)
      .from(this._tableName)
      .where(where);

    if (options.limit) {
      query = query.limit(options.limit);
    }

    if (options.offset) {
      query = query.offset(options.offset);
    }
    return query;
  }

  async selectOne(id: string, options = { columns: ['*'] }) {
    return this.knexService.instance
      .select(options.columns)
      .from(this._tableName)
      .where('id', id)
      .first();
  }

  async selectRows(
    where: any,
    options?: { limit: number; offset: number; columns: string[] },
  ) {
    return this.select(where, options);
  }
}
