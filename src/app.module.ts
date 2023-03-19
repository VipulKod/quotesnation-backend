import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserSchema } from './users/schemas/user.schema';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/middleware/auth.middleware';
import { QuotesModule } from './quotes/quotes.module';
import { CorsMiddleware } from './middleware/cors.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    UsersModule,
    AuthModule,
    QuotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorsMiddleware, AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
