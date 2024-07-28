import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { conn } from "@/libs/mysql";
import { User } from "@/model/user";

export async function POST(request) {
  try {
    const { email, password, numDocument, nombre, apellido } =
      await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    // Verificar la longitud del hash
    if (hashedPassword.length > 255) {
      throw new Error("Hashed password is too long for the database column");
    }

    // Ejecutar la consulta de inserción
    const result = await conn.query(
      `INSERT INTO ${User.table} (email, password, numDocument, nombre, apellido) VALUES (?, ?, ?, ?, ?)`,
      [email, hashedPassword, numDocument, nombre, apellido]
    );

    // Verificar si la inserción fue exitosa
    if (result.affectedRows === 1) {
      return NextResponse.json(
        { message: "User created successfully" },
        { status: 201 }
      );
    }
  } catch (error) {
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
