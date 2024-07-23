import React from "react";
import axios from "axios";

async function loadUsers(userId) {
  const { data } = await axios.get("http://localhost:3000/api/user/" + userId);
  console.log(data);
  return data;
}

async function UserPage({ params }) {
  const users = await loadUsers(params.id_user);
  return (
    <section className="flex justify-center items-center">
      <div className="p-6 bg-white">
        <p>Nombre: {users.nombre}</p>
        <p>Apellido: {users.apellido}</p>
        <p>Email: {users.email}</p>
        <p>Telefono: {users.telefono}</p>

        <div className="flex gap-x-2 justify-end mt-2">
          <button className="text-white bg-grey-500 hover:bg-grey-700 py-2 px-4 rounded">
            Editar
          </button>
          <button className="text-white bg-red-500 hover:bg-red-700 py-2 px-4 rounded">
            Eliminar
          </button>
        </div>
      </div>
    </section>
  );
}

export default UserPage;
