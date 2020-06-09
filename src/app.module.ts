import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DenomModule } from './module/denom.module';
import {NftModule} from './module/nft.module';
import { BlockModule } from './module/block.module';
import { StatisticsModule } from './module/statistics.module';
import { TxModule } from './module/tx.module';
import {APP_FILTER} from '@nestjs/core';
import {HttpExceptionFilter} from './exception/HttpExceptionFilter';
import {cfg} from './config';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './task/task.service';
import { TaskDispatchModule } from './module/task.dispatch.module';

console.log(cfg);

const url: string = `mongodb://${cfg.dbCfg.user}:${cfg.dbCfg.psd}@${cfg.dbCfg.host}:${cfg.dbCfg.port}/${cfg.dbCfg.db}`;
@Module({
    imports: [
        MongooseModule.forRoot(url),
        ScheduleModule.forRoot(),
        DenomModule,
        NftModule,
        BlockModule,
        StatisticsModule,
        TaskDispatchModule,
    	MongooseModule.forRoot(url),
    	DenomModule,
    	TxModule
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
        TasksService,
    ],
})
export class AppModule {
}
