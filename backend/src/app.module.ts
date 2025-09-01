import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from './modules/prisma/prisma.module';
import { CadastroDbvModule } from './modules/cadastro-dbv/cadastro-dbv.module';
import { CadastroUnidadeModule } from './cadastro-unidade/cadastro-unidade.module';
import { CadastroUnidadeModule } from './modules/cadastro-unidade/cadastro-unidade.module';

@Module({
  imports: [
    AdminModule,
    AuthModule,
    CadastroDbvModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({}),
    PrismaModule,
    CadastroUnidadeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
