import sql from "mssql";

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
      trustedConnection: true, // Set to true if using Windows Authentication
      trustServerCertificate: true, // Set to true if using self-signed certificates
    },
    driver: "msnodesqlv8", // Required if using Windows Authentication
  };

  
  const sqlConnect = async () => {
    return await sql.connect(config);
  }

export{sqlConnect, sql};