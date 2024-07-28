"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"; // Corrección: usar useRouter en lugar de userRouter
import { useState } from "react";

/**
 * Componente de página de inicio de sesión
 */
function Loginpage() {
  const router = useRouter(); // Corrección: usar useRouter para obtener el router
  const {
    register, // Método para registrar los campos del formulario
    handleSubmit, // Método para manejar el envío del formulario
    formState: { errors }, // Estado del formulario para manejar errores
  } = useForm();

  const [error, setError] = useState(null);

  /**
   * Maneja el envío del formulario
   * @param {Object} data - Datos del formulario
   */
  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    console.log(res);
    if (res.error) {
      setError(res.error);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  });

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={onSubmit} className="w-1/4">
        {error && (
          <p className="bg-red-500 text-lg text-white p-2 rounded">{error}</p>
        )}

        <h1 className="text-slate-200 font-bold text-3xl mb-6 text-center">
          Login
        </h1>
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

        <label
          htmlFor="password"
          className="text-slate-200 mb-2 block text-sm mt-2"
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
        <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 rounded mt-6">
          Login
        </button>
      </form>
    </div>
  );
}

export default Loginpage;
