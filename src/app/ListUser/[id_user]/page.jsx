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
    <section className="flex justify-center items-center h-[calc(100vh-10rem)]">
      <div className="flex w-2/6 justify-center ">
        <div className="p-2 bg-white w-1/3">
          <p className="text-state-700 font-bold">{user.nombre}</p>
          <p className="text-slate-700 font-bold">{user.apellido}</p>
          <p className="text-slate-700">{user.email}</p>
          <Buttons id_user={user.id_user} />
        </div>
        <img src={user.imagen} className="w-1/3" alt=""></img>
      </div>
    </section>
  );
}

export default Userpage;
