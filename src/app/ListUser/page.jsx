import UserCard from "@/components/UserCard";
import React from "react";
import { conn } from "@/libs/mysql";

async function loadUsers() {
  const users = await conn.query('SELECT * FROM user');
  return users;
}

export const dynamic = "force-dynamic"

async function ListUser() {
  const users = await loadUsers();
  return <div className="grid gap-4 grid-cols-4">
      {users.map((user) => (
        <UserCard key={user.id_user} user={user} />
      ))}
    </div>;
  
}

export default ListUser;
