"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

function Buttons({ id_user }) {
  const router = useRouter();

  return (
    <div className="flex gap-x-1 justify-end mt-4 mb-2">
      <button
        className="text-white bg-red-500 hover:bg-red-700 py-2 px-3 rounded"
        onClick={async () => {
          if (confirm("Esta seguro de Eliminar el Usuario?")) {
            const res = await axios.delete("/api/user/" + id_user);
            if (res.status === 200) {
              router.push("/ListUser");
              router.refresh();
            }
          }
        }}
      >
        delete
      </button>
      <button
        className="text-white bg-gray-500 hover:bg-gray-700 py-2 px-3 rounded"
        onClick={() => {
          router.push(`/ListUser/edit/${id_user}`);
        }}
      >
        Edit
      </button>
    </div>
  );
}

export default Buttons;
