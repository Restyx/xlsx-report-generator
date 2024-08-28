import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { ReportEntity } from '../entities/report.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([ReportEntity]), ConfigModule ,HttpModule],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
