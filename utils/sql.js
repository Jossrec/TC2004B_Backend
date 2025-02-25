import sql from "mssql";
const config = {
    server: "LAPREC\SQLEXPRESS",
    database: "tc3004b",
    options: {
      trustedConnection: true, // Set to true if using Windows Authentication
      trustServerCertificate: true, // Set to true if using self-signed certificates
    },
    driver: "msnodesqlv8", // Required if using Windows Authentication
  };

  const sqlConnect = async () => {
    return await sql.connect(sqlConfig);
  }

export{sqlConnect, sql};