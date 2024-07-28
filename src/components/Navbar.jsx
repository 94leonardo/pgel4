import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function Navbar() {
  const session = await getServerSession(authOptions);

  console.log(session);

  return (
    <nav className="flex justify-between items-center bg-gray-950 text-white px-24 py-3">
      <Link href="/">
        <h2 className=" text-3xl font-bold">Proyecto-Eventos</h2>
      </Link>

      <ul className="flex gap-x-2">
        {!session?.user ? (
          <>
            <li>
              <Link href="/auth/login">Login</Link>
            </li>

            <li>
              <Link href="/auth/register">Registro</Link>
            </li>
          </>
        ) : (
          <>
            {" "}
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/api/auth/signout">LogOut</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
