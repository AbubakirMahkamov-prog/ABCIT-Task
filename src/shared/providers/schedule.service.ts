import { Injectable, Inject } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { KnexService } from './knex.service';

@Injectable()
export class ScheduleService {
  @Inject() private knexService: KnexService;
  get knex() {
    return this.knexService.instance;
  }
  
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) 
  async handleEveryDay() {
    const knex = this.knex;
    await knex('users').where('is_verified', false).del();
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async handleEveryMonth() {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1); 
    const currentDate = oneMonthAgo.toISOString(); // Get current date in ISO format
    const knex = this.knex;

    // Start a transaction
    await knex.transaction(async trx => {
      try {
        // Delete likes and comments associated with old publications
        await trx('likes')
          .join('publications', 'likes.publication_id', 'publications.id')
          .where('publications.created_at', '<', currentDate)
          .del();
  
        await trx('comments')
          .join('publications', 'comments.publication_id', 'publications.id')
          .where('publications.created_at', '<', currentDate)
          .del();
  
        // Delete the old publications
        await trx('publications')
          .where('created_at', '<', currentDate)
          .del();
  
        // Commit the transaction
        await trx.commit();
        
      } catch (error) {
        // Rollback the transaction if any error occurs
        await trx.rollback();
        throw error; // Re-throw the error to be handled by the caller
      }
    });
  }
}
