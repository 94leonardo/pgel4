import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";
import { User } from "@/model/user";
import cloudinary from "@/libs/cloudinary";
import { processImagen } from "@/libs/processImagen";
import { unlink } from "fs/promises";

//rootas del baken para hacer el crud de user por id

//metodo para obtener un user de id de la base de datos
export async function GET(request, { params }) {
  try {
    //const fields = User.fields;
    const result = await conn.query(
      `SELECT * FROM ${User.table} WHERE id_user = ? `,
      [params.id_user]
    );
    if (result.length === 0) {
      return NextResponse.json(
        {
          message: "No se encontro un user con ese id",
        },
        {
          status: 404,
        }
      );
    }
    console.log(result);
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to Obtener un user",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
//metodo para eliminar un user de id de la base de datos
export async function DELETE(request, { params }) {
  try {
    const result = await conn.query(
      `DELETE FROM ${User.table} WHERE id_user = ?`,
      [params.id_user]
    );
    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "No se encontro un user con ese id",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(
      {
        message: "Se elimino el user con exito",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to ELIMINAR un user",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

//metodo para actualizar un user de id de la base de datos
export async function PUT(request, { params }) {
  try {
    const data = await request.formData();
    const imagen = data.get("imagen");
    const updateData = {
      numDocument: data.get("numDocument"),
      nombre: data.get("nombre"),
      apellido: data.get("apellido"),
      email: data.get("email"),
      password: data.get("password"),
      telefono: data.get("telefono"),
    };
    let secure_url;

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
    if (imagen) {
      const filePath = await processImagen(imagen);
      const res = await cloudinary.uploader.upload(filePath);
      updateData.imagen = res.secure_url;

      if (res) {
        await unlink(filePath);
      }
    }

    const result = await conn.query(
      `UPDATE ${User.table} SET ? WHERE id_user = ?`,
      [updateData, params.id_user]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "No se encontro un user con ese id",
        },
        {
          status: 404,
        }
      );
    }
    const updateUser = await conn.query(
      `SELECT * FROM ${User.table} WHERE id_user = ? `,
      [params.id_user]
    );
    return NextResponse.json(updateUser[0]);
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to Actualizar un user",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
