import { NextResponse } from "next/server";
import {conn}  from "@/libs/mysql";
import {User} from "@/model/user";


//metodo general para listar
export default async function GET() {
  try {
    const fields = User.fields;
    const [results] = await conn.query(`SELECT * FROM ${User.table}`);
    return NextResponse.json({
      status: "success",
      message: "listar todos los user",
      results,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error(
      {
        message: "Failed to fetch user",
      },
      {
        status: 500,
      }
    );
  }
}

//metodo post para insertar
export async function POST(request) {
try {
  const { numDocument, nombre, apellido, email, password, telefono } =  await request.json();
  const fields = User.fields;
  const result = await conn.query(`INSERT INTO ${User.table} SET ?`, {
    [fields.numDocument]: numDocument,
    [fields.nombre]: nombre,
    [fields.apellido]: apellido,
    [fields.email]: email,
    [fields.password]: password,
    [fields.telefono]: telefono,
  });
  return NextResponse.json({
    status: "success",
    message: "Usuario creado exitosamente",
    data: {
      id_user: result.insertId,
      numDocument,
      nombre,
      apellido,
      email,
      password,
      telefono,
    },
    result,
  });
} catch (error) {
  console.error(error);
  return NextResponse.json(
    {
      status: "error",
      message: "Failed to create user",
      error: error.message,
    },
    { status: 500 }
  );
}
}