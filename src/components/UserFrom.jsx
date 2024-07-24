"use client";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

function UserFrom() {
  const [user, setUser] = useState({
    numDocument: "",
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    telefono: "",
  });
  //recetear formulario

  const [file, setFile] = useState(null);
  const form = useRef(null);
  const router = useRouter();
  const params = useParams();

  //funcion para manejar cambios
  const handleChange = (event) => {
    setUser({ 
      ...user, [event.target.name]: event.target.value
     });
  };

  useEffect(() => {
    if (params.id_user) {
      axios.get("/api/user/" + params.id_user).then((res) => {
        setUser({
          numDocument: res.data.numDocument,
          nombre: res.data.nombre,
          apellido: res.data.apellido,
          email: res.data.email,
          password: res.data.password,
          telefono: res.data.telefono,
        });
      });
    }
  }, []);

  //evento andle submit cuando se envia el formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    
    const formData = new FormData();
    formData.append("numDocument", user.numDocument);
    formData.append("nombre", user.nombre);
    formData.append("apellido", user.apellido);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("telefono", user.telefono);
    formData.append("imagen", file);
    //envia peticion post

    if (file) {
      formData.append("imagen", file);
    }

    if (!params.id_user) {
      const res = await axios.post("/api/user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
    } else {
      const res = await axios.put("/api/user/" + params.id_user, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }

    form.current.reset();
    router.refresh();
    router.push("/ListUser");
  };

  return (
    <div className="flex ">
      <form
        className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-3"
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
          value={user.numDocument}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          autoFocus
        />

        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Nombre:
        </label>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          onChange={handleChange}
          value={user.nombre}
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
          value={user.apellido}
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
          value={user.email}
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
          autoComplete="on"
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
          value={user.telefono}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4"
        />

        <label
          htmlFor="userimagen"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Imagen profile:
        </label>
        <input
          type="file"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        {file && (
          <img
            className="w-50  object-contain mx-auto my-4"
            src={URL.createObjectURL(file)}
            alt=""
          />
        )}

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {params.id_user ? "Actualizar" : "Registrar"}
        </button>
      </form>
    </div>
  );
}

export default UserFrom;
