import Link from "next/link";

function UserCard({ user }) {
  return (
    <Link
      className="bg-black rounded-lg border border-blue-800 mb-3  hover:bg-gray-700 hover:cursor-pointer"
      href={`/ListUser/${user.id_user}`}
    >
      {user.imagen && (
        <img src={user.imagen} className="w-full rounder-t-lg my-4"></img>
      )}
      <div className="p-4">
        <h2 className="text-lg fond-bold">{user.nombre}</h2>
        <h2 className="text-lg fond-bold">{user.apellido}</h2>
        <h2 className="text-lg fond-bold">{user.email}</h2>
        <h2 className="text-lg fond-bold">{user.telefono}</h2>
      </div>
    </Link>
  );
}

export default UserCard;
