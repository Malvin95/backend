import "reflect-metadata"
import { DataSource } from "typeorm"
import { SimCard } from "./entities/SimCard.ts"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Exodus14:14!",
    database: "go2sim",
    synchronize: false,
    logging: true,
    entities: [SimCard],
    migrations: [],
    subscribers: [],
})

try {
    AppDataSource.initialize()
} catch (error) {
    console.log(error);
};
