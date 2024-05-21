import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'localhost',  
  user: 'root',
  password: 'admin123',
  database: 'taskmanager',
  port: 3306
});

const promisePool = pool.promise();

const connectDB = async () => {
  try {
    await promisePool.getConnection();
    console.log("Conectado com o Banco");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export { connectDB, promisePool };