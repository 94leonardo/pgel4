"use client";
import { useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function UserFrom() {
  const [user, setUser] = useState({
    numDocument: "",
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    telefono: "",
  });
  //funcion para manejar cambios
  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  //recetear formulario
  const form = useRef(null);
  const router = useRouter();

  //evento andle submit cuando se envia el formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    //envia peticion post
    const res = axios.post("/api/user", user);
    console.log(res);
    form.current.reset();
    router.push("/ListUser");
  };

  return (
    <div>
      <form
        className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
        ref={form}
      >
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Documento:
        </label>
        <input
          type="text"
          name="numDocument"
          placeholder="Documento"
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          autoFocus
        />

        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
          alert
        >
          Nombre:
        </label>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
        />

        <label
          htmlFor="surname"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Apellido:
        </label>
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
        />

        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Email:
        </label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
        />

        <label
          htmlFor="password"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Password:
        </label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
        />

        <label
          htmlFor="phone"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Teléfono:
        </label>
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4"
        />

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Registrar
        </button>
      </form>
    </div>
  );
}

export default UserFrom;
