import { Module } from '@nestjs/common';
import { HttModule } from './infra/http/http.module';
import { DatabaseModule } from './infra/database/database.module';

@Module({
  imports: [HttModule, DatabaseModule],
})
export class AppModule {}
