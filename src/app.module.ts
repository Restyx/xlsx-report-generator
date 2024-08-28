import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ReportModule } from './report/report.module';
import { ReportEntity } from './entities/report.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: './.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get<string>('POSTGRES_HOST') || '',
          port: Number(config.get<string>('POSTGRES_PORT')) || 0,
          username: config.get<string>('POSTGRES_USERNAME') || '',
          password: config.get<string>('POSTGRES_PASSWORD') || '',
          database: config.get<string>('POSTGRES_DB') || '',
          entities: [ReportEntity],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    ReportModule,
  ],
})
export class AppModule {}
