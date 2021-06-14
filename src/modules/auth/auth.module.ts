import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
// import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { features, jwtConstants } from 'src/common/constants';
import { JwtStrategy } from './jwt.strategy';
import { StudentsModule } from '../students/students.module';
import { AuthService } from './auth.service';
import { TeachersModule } from '../teachers/teachers.module';
import { InstructorsModule } from '../instructors/instructors.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    MongooseModule.forFeature(features),
    StudentsModule,
    TeachersModule,
    InstructorsModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.timeout },
    }),
  ],
  providers: [JwtStrategy, AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
