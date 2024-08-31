import { Injectable } from '@nestjs/common';
import knex from 'knex';

@Injectable()
export class KnexService {
  instance: any;

  constructor() {
    this.instance = knex({
      client: 'postgresql',
      debug: false,
      connection: {
        host: process.env.PGHOST,
        user: process.env.PGUSER,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: Number(process.env.PGPORT),
      },
      pool: {
        min: 0,
        max: Number(process.env.MAX_POOL) || 75,
        acquireTimeoutMillis: 60000,
        idleTimeoutMillis: 600000,
      },
    });
  }
}
