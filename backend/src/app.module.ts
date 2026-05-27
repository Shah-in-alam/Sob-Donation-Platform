import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ClubsModule } from './clubs/clubs.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { MembershipModule } from './membership/membership.module';
import { StepsModule } from './steps/steps.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DATABASE_HOST', 'localhost'),
        port: config.get<number>('DATABASE_PORT', 5432),
        username: config.get<string>('DATABASE_USER', 'sob'),
        password: config.get<string>('DATABASE_PASSWORD', 'sob_password'),
        database: config.get<string>('DATABASE_NAME', 'sob_platform'),
        autoLoadEntities: true,
        // Auto-sync schema in dev only. Use migrations in production.
        synchronize: config.get<string>('NODE_ENV') !== 'production',
      }),
    }),
    ClubsModule,
    UsersModule,
    AuthModule,
    MembershipModule,
    StepsModule,
    LeaderboardModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
