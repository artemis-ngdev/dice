// import ormConfig from "../orm.config";

// export const syncingDatabase = async () => {
// 	await new Promise<void>(async (resolve, reject) => {
// 		// await ormConfig.sync({ force: true });
// 		await ormConfig.sync();
// 	})
//   }


// const syncDB = syncingDatabase()

// export default syncDB

import { Sequelize } from "sequelize-typescript";
import { SequelizeTypescriptMigration } from "sequelize-typescript-migration";
import ormConfig from "../orm.config";
import path from 'path'

export const createMigration = async () => {
await SequelizeTypescriptMigration.makeMigration(ormConfig as any, {
    outDir: path.join(__dirname, "../migrations"),
    migrationName: "new_tables",
    preview: false,
});
}

const migrate = createMigration()

export default migrate