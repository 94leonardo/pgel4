import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { User } from "@/model/user";
import { conn } from "@/libs/mysql";

/**
 * Configuración de opciones de autenticación para NextAuth
 */
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      /**
       * Función de autorización para validar las credenciales proporcionadas
       * @param {Object} credentials - Credenciales proporcionadas por el usuario
       * @param {Object} req - Objeto de solicitud (request)
       * @returns {Object|null} - Objeto de usuario si la autenticación es exitosa, de lo contrario null
       */
      async authorize(credentials, req) {
        // Imprimir las credenciales proporcionadas
        console.log(credentials);

        // Buscar el usuario en la base de datos por email
        const [userFound] = await conn.query(
          `SELECT * FROM ${User.table} WHERE email = ?`,
          [credentials.email]
        );

        // Si no se encuentra el usuario, lanzar un error
        if (!userFound) throw new Error("No user found");
        console.log(userFound);

        // Comparar la contraseña proporcionada con la contraseña almacenada
        const matchPassword = await bcrypt.compare(
          credentials.password,
          userFound.password
        );

     


        // Si las contraseñas no coinciden, lanzar un error
        if (!matchPassword) throw new Error("Wrong password");

        // Devolver un objeto de usuario si la autenticación es exitosa
        return {
          id: userFound.id_user,
          name: userFound.nombre,
          email: userFound.email,
          password: userFound.password,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
};

// Definir el manejador para las rutas de NextAuth
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
