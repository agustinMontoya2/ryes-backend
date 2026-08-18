import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppExceptionFilter } from "./common/exceptions/app-exception.filter";
import { ResponseInterceptor } from "./common/interceptors/response.interceptor";
import config from "./config/config";
import { configSchema } from "./config/config.schema";
import { BranchesController } from "./controllers/branches.controller";
import { DentistsController } from "./controllers/dentists.controller";
import { OrdersController } from "./controllers/orders.controller";
import { PatientsController } from "./controllers/patients.controller";
import { ReportsController } from "./controllers/reports.controller";
import { ServicesController } from "./controllers/services.controller";
import { UsersController } from "./controllers/users.controller";
import {
  BranchEntity,
  DentistEntity,
  JobReportEntity,
  JobReportOrderEntity,
  OrderEntity,
  PatientEntity,
  ServiceEntity,
  UserBranchEntity,
  UserEntity,
} from "./infrastructure/orm/entities";
import { PostgresqlModule } from "./infrastructure/postgresql/postgresql.module";
import {
  BranchRepository,
  DentistRepository,
  JobReportOrderRepository,
  JobReportRepository,
  OrderRepository,
  PatientRepository,
  ServiceRepository,
  UserBranchRepository,
  UserRepository,
} from "./infrastructure/repositories";
import { AuthModule } from "./modules/auth";
import {
  BranchesService,
  DentistsService,
  OrdersService,
  PatientsService,
  ReportsService,
  ServicesService,
  UsersService,
} from "./services";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      validationSchema: configSchema,
    }),
    PostgresqlModule,
    TypeOrmModule.forFeature([
      BranchEntity,
      DentistEntity,
      JobReportEntity,
      JobReportOrderEntity,
      OrderEntity,
      PatientEntity,
      ServiceEntity,
      UserEntity,
      UserBranchEntity,
    ]),
    AuthModule,
  ],
  controllers: [
    BranchesController,
    PatientsController,
    DentistsController,
    ServicesController,
    OrdersController,
    ReportsController,
    UsersController,
  ],
  providers: [
    BranchRepository,
    DentistRepository,
    JobReportOrderRepository,
    JobReportRepository,
    OrderRepository,
    PatientRepository,
    ServiceRepository,
    UserRepository,
    UserBranchRepository,
    BranchesService,
    DentistsService,
    OrdersService,
    PatientsService,
    ReportsService,
    ServicesService,
    UsersService,
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    { provide: APP_FILTER, useClass: AppExceptionFilter },
  ],
})
export class AppModule {}
