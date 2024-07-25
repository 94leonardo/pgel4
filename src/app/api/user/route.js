import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";
import { User } from "@/model/user";
import {  unlink } from "fs/promises";
import cloudinary from "@/libs/cloudinary";
import {processImagen } from "@/libs/processImagen";

// Método general para listar
export async function GET() {
  try {
    const results = await conn.query(`SELECT * FROM ${User.table}`);
    return NextResponse.json({
      status: "success",
      message: "Listar todos los usuarios",
      results,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error(
      {
        message: "Failed to fetch users",
      },
      {
        status: 500,
      }
    );
  }
}

// Método POST para insertar
export async function POST(request) {
  try {
    const data = await request.formData();
    const imagen = data.get("imagen");

    if (!data.get("nombre")) {
      return NextResponse.json(
        {
          message: "Nombre es requerido",
        },
        {
          status: 400,
        }
      );
    }

    if (!imagen) {
      return NextResponse.json(
        {
          message: "Imagen es requerida",
        },
        {
          status: 400,
        }
      );
    }

   
    const filePath = await processImagen(imagen);

    const res = await cloudinary.uploader.upload(filePath);

    if (res) {
      await unlink(filePath);
    }

    const result = await conn.query(`INSERT INTO ${User.table} SET ?`, {
      numDocument: data.get("numDocument"),
      nombre: data.get("nombre"),
      apellido: data.get("apellido"),
      email: data.get("email"),
      password: data.get("password"),
      telefono: data.get("telefono"),
      imagen: res.secure_url,
    });

    return NextResponse.json({
      status: "success",
      message: "Usuario creado exitosamente",
      data: {
        id_user: result.insertId,
        numDocument: data.get("numDocument"),
        nombre: data.get("nombre"),
        apellido: data.get("apellido"),
        email: data.get("email"),
        password: data.get("password"),
        telefono: data.get("telefono"),
        imagen: res.secure_url,
      },
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
