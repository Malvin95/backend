import "reflect-metadata"
import { DataSource } from "typeorm"
import { SimCard } from "./entities/SimCard.ts"
import dotenv from "dotenv"

dotenv.config({ path: '.env.local' });

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: process.env.NODE_ENV === "development",
    logging: process.env.NODE_ENV === "development",
    entities: [SimCard],
    migrations: [],
    subscribers: [],
})

export async function initializeDatabase() {
    try {
        await AppDataSource.initialize();
        console.log("Database connected successfully");
        return true;
    } catch (error) {
        console.log("Database connection failed:", error);
        process.exit(1);
    };
}
