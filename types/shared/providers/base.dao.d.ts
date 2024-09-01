import { Knex } from 'knex';
export interface IBaseQuery<T> {
    getById(id: string, columns?: string[]): Promise<T>;
    updateById(id: string, value: T): Promise<T[]>;
    insert(value: T, returning?: string[]): Promise<T>;
    insertWithTransaction(trx: Knex.Transaction, value: T, returning?: string[]): Promise<T[]>;
    updateByIdWithTransaction(trx: Knex.Transaction, id: string, value: T): Promise<T[]>;
    getByIdWithTransaction(trx: Knex.Transaction, id: string, columns?: string[]): Promise<T>;
}
export declare class BaseRepo<T> implements IBaseQuery<T> {
    private _tableName;
    private knexService;
    get knex(): any;
    get tableName(): string;
    constructor(_tableName: string);
    generateRecordId(): string;
    getById(id: string, columns?: string[]): Promise<T>;
    getAll(): Promise<T>;
    updateById(id: string, value: T, returning?: string[]): Promise<T[]>;
    updateByColumn(column: string, id: string, value: T, returning?: string[]): Promise<T[]>;
    updateByConditions(conditions: T, values: T, returning?: string[]): Promise<T[]>;
    insert(value: T, returning?: string[]): Promise<T>;
    insertWithTransaction(trx: Knex.Transaction, value: T, returning?: string[]): Promise<any>;
    updateByIdWithTransaction(trx: Knex.Transaction, id: string | string[], value: T, returning?: string[]): Promise<any>;
    getByIdWithTransaction(trx: Knex.Transaction, id: string, columns?: string[]): Promise<T>;
    selectWithTransaction(trx: Knex.Transaction | Knex, where: any, options?: {
        limit: number;
        offset: number;
        columns: string[];
    }): Knex.QueryBuilder<{}, ({
        _base: {};
        _hasSelection: true;
        _keys: string;
        _aliases: {};
        _single: boolean;
        _intersectProps: {};
        _unionProps: unknown;
    } | {
        _base: {};
        _hasSelection: true;
        _keys: string;
        _aliases: {};
        _single: false;
        _intersectProps: {};
        _unionProps: never;
    })[]>;
    select(where: any, options?: {
        limit: number;
        offset: number;
        columns: string[];
    }): any;
    selectOne(id: string, options?: {
        columns: string[];
    }): Promise<any>;
    selectRows(where: any, options?: {
        limit: number;
        offset: number;
        columns: string[];
    }): Promise<any>;
}
