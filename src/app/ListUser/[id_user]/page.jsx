import Buttons from "./Buttons";
import { conn } from "@/libs/mysql";

async function loadUser(id_user) {
  try {
    const [result] = await conn.query("SELECT * FROM user WHERE id_user = ? ", [
      id_user,
    ]);
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

async function Userpage({ params }) {
  const user = await loadUser(params.id_user);

  return (
    <section className="flex justify-center items-center">
      <div className="flex w-4/6 h-2/6 justify-center">
        <div className="p-2 bg-white rounded">
          <p className="text-slate-500 font-bold">{user.nombre}</p>
          <p className="text-slate-700 font-bold">{user.apellido}</p>
          <p className="text-slate-700">{user.email}</p>
          <Buttons id_user={user.id_user} />
        </div>
      </div>
    </section>
  );
}

export default Userpage;
