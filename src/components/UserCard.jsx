import Link from "next/link";

function UserCard({ user }) {
  return (
    <Link className="bg-black rounded-lg border border-blue-800 mb-3 p-4 hover:bg-gray-700 hover:cursor-pointer"
        href={`/user/${user.id_user}`}
    >

      <h2 className="text-lg fond-bold">{user.nombre}</h2>
      <h2 className="text-lg fond-bold">{user.apellido}</h2>
      <h2 className="text-lg fond-bold">{user.email}</h2>
      <h2 className="text-lg fond-bold">{user.email}</h2>
      <h2 className="text-lg fond-bold">{user.telefono}</h2>
    </Link>
  );
}

export default UserCard;
