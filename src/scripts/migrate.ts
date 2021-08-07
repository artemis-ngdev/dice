import { SequelizeTypescriptMigration } from "sequelize-typescript-migration";
import ormConfig from "../orm.config";
import path from 'path'

export const createMigration = async () => {
await SequelizeTypescriptMigration.makeMigration(ormConfig as any, {
    outDir: path.join(__dirname, "../database/migrations"),
    migrationName: "new_tables",
    preview: false,
});
}

const migrate = createMigration()

export default migrate