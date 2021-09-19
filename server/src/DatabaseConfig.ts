import {ConnectionOptions, createConnection} from "typeorm";
import {TypeOrmModuleOptions} from "@nestjs/typeorm/dist/interfaces/typeorm-options.interface";

export const DatabaseConfig = <ConnectionOptions>{
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    autoLoadEntities: true,
    name: "default"
}

export default createConnection(DatabaseConfig)