//conexion a la base de datos

import mysql from "serverless-mysql";

export const conn = mysql({
  config: {
    host: "localhost",
    user: "root",
    password: "54321",
    port: 3306,
    database: "proyectoevento",
  },
});
