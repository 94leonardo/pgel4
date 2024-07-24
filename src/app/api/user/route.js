import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";
import { User } from "@/model/user";
import { writeFile } from "fs/promises";
import path from "path";
import { v2 as cloudinary } from 'cloudinary';

// Configuration
cloudinary.config({
  cloud_name: "dzp43kwsn",
  api_key: "488723593664257",
  api_secret: "MjBbZm5iA1z4ATo3VgWlQ820sJA", // Click 'View Credentials' below to copy your API secret
});

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
    const data = await request.formData();
    const imagen = data.get("imagen");
    
    if (!data.get("name")) {
      return NextResponse.json(
        {
          message: "Name is required",
        },
        {
          status: 400,
        }
      );
    }

    if (!imagen) {
      return NextResponse.json(
        {
          message: "Image is required",
        },
        {
          status: 400,
        }
      );
    }

    const bytes = await imagen.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filePath = path.join(process.cwd(), "public", imagen.name);
    await writeFile(filePath, buffer);

    const res = await cloudinary.uploader.upload(filePath);

    const result = await conn.query("INSERT INTO user SET ?", {
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
