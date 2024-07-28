"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      return alert("Las contraseñas no coinciden");
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          numDocument: data.numDocument,
          nombre: data.nombre,
          apellido: data.apellido,
          email: data.email,
          password: data.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        router.push("/auth/login");
      } else {
        const errorData = await res.json();
        alert(
          errorData.message || "Algo salió mal, por favor intenta de nuevo."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema con el servidor. Por favor, intenta más tarde.");
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-800">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-slate-200 font-bold text-3xl mb-6 text-center">
          Register
        </h2>

        <div className="mb-4">
          <label
            htmlFor="numDocument"
            className="text-slate-200 mb-2 block text-sm"
          >
            Documento:
          </label>
          <input
            type="text"
            {...register("numDocument", {
              required: "Documento es requerido",
            })}
            className="p-3 rounded bg-slate-700 text-slate-300 w-full"
            placeholder="Documento"
            autoComplete="Documento"
          />
          {errors.numDocument && (
            <span className="text-red-500 text-xs">
              {errors.numDocument.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="nombre" className="text-slate-200 mb-2 block text-sm">
            Nombre:
          </label>
          <input
            type="text"
            {...register("nombre", {
              required: "Nombre es requerido",
            })}
            className="p-3 rounded bg-slate-700 text-slate-300 w-full"
            placeholder="Nombre"
            autoComplete="Nombre"
          />
          {errors.nombre && (
            <span className="text-red-500 text-xs">
              {errors.nombre.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="apellido"
            className="text-slate-200 mb-2 block text-sm"
          >
            Apellido:
          </label>
          <input
            type="text"
            {...register("apellido", {
              required: "Apellido es requerido",
            })}
            className="p-3 rounded bg-slate-700 text-slate-300 w-full"
            placeholder="Apellido"
            autoComplete="Apellido"
          />
          {errors.apellido && (
            <span className="text-red-500 text-xs">
              {errors.apellido.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="text-slate-200 mb-2 block text-sm">
            Email:
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email es requerido",
            })}
            className="p-3 rounded bg-slate-700 text-slate-300 w-full"
            placeholder="Email"
            autoComplete="email"
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="text-slate-200 mb-2 block text-sm"
          >
            Password:
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Password es requerido",
            })}
            className="p-3 rounded bg-slate-700 text-slate-300 w-full"
            placeholder="Password"
            autoComplete="password"
          />
          {errors.password && (
            <span className="text-red-500 text-xs">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="text-slate-200 mb-2 block text-sm"
          >
            Confirm Password:
          </label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Confirm Password es requerido",
            })}
            className="p-3 rounded bg-slate-700 text-slate-300 w-full"
            placeholder="Confirm Password"
            autoComplete="password"
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-xs">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <button
          className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 rounded ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Registrando..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
