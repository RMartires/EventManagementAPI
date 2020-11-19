const database = require("./database");

const authenticateDB = () => database.authenticate();

const dropDB = () => database.drop();

const syncDB = () => database.sync();

const successfulDBStart = () =>
  console.info("connection to the database has been established successfully");

const errorDBStart = (err) =>
  console.info("unable to connect to the database:", err);

const startMigrateTrue = async () => {
  try {
    await syncDB();
    successfulDBStart();
  } catch (err) {
    errorDBStart(err);
  }
};

const startMigrateFalse = async () => {
  try {
    await dropDB();
    await syncDB();
    successfulDBStart();
  } catch (err) {
    errorDBStart(err);
  }
};

const start = async (migrate, req, res, next) => {
  try {
    let DB;
    await authenticateDB();

    if (migrate === "force_sync") {
      await database.query("SET FOREIGN_KEY_CHECKS = 0");
      await database.sync({ force: true });
      await database.query("SET FOREIGN_KEY_CHECKS = 1");
    } else if (migrate) {
      DB = await startMigrateTrue();
    } else {
      DB = await startMigrateFalse();
    }

    req.DB = DB;

    next();
  } catch (err) {
    return errorDBStart(err);
  }
};

exports.start = start;
