//conexion a la base de datos

import mysql from "serverless-mysql";
import { PrismaClient } from "@prisma/client";

export const conn = mysql({
  config: {
    host: "localhost",
    user: "root",
    password: "54321",
    port: 3306,
    database: "proyectoevento",
  },
});



/**
const prismaClientSingleton = () => {
  return new PrismaClient();
};

const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
**/