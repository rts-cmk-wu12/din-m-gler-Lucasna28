"use client";

import { useState } from "react";
import { useActionState, useEffect } from "react";
import { redirect } from "next/navigation";
import { motion } from "framer-motion";
import { z } from "zod";
import PageHero from "@/components/ui/PageHero";
import Link from "next/link";
import { Toast } from "@/components/ui/Toast";

const loginSchema = z.object({
  identifier: z.string().email("Indtast en gyldig email"),
  password: z.string().min(6, "Adgangskoden skal være mindst 6 tegn"),
});

export default function LoginPage() {
  const [formState, formAction] = useActionState(null);
  const [toast, setToast] = useState({ message: "", type: "success", isVisible: false });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      identifier: formData.get("identifier"),
      password: formData.get("password"),
    };

    const validation = loginSchema.safeParse(data);

    if (!validation.success) {
      const errorMessages = validation.error.errors.map((e) => e.message).join(", ");
      setToast({ message: errorMessages, type: "error", isVisible: true });
      return;
    }

    formAction(validation.data); // Send data til login-action
  };

  useEffect(() => {
    if (!formState) return;

    if (!formState.success) {
      setToast({ message: "FEJL! Login mislykkedes.", type: "error", isVisible: true });
    }

    if (formState.success) {
      setToast({ message: "Login lykkedes!", type: "success", isVisible: true });
      setTimeout(() => {
        redirect("/");
      }, 2000);
    }
  }, [formState]);

  return (
    <>
      <PageHero />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col align-middle justify-center h-full p-20"
      >
        <form
          onSubmit={handleFormSubmit}
          className="w-full max-w-md mx-auto rounded-lg shadow-xl h-1/2 p-8 border-shape-shape01 border-2 flex flex-col justify-between"
        >
          <h1 className="text-2xl font-bold text-center mb-6">Log ind på din konto</h1>
          <label className="flex flex-col my-2">
            Email
            <input
              type="email"
              name="identifier"
              placeholder="Email"
              className="border-gray-200 border-2 p-2"
            />
          </label>
          <label className="flex flex-col">
            Adgangskode
            <input
              type="password"
              name="password"
              placeholder="Adgangskode"
              className="border-gray-200 border-2 p-2"
            />
          </label>
          <button type="submit" className="bg-primary-color01 text-white text-center w-full p-2 mt-4">
            Log ind
          </button>
          <p className="mt-8">Log ind med</p>
          <div className="flex justify-between">
            <button className="bg-primary-orange text-white p-3 w-1/3">Google</button>
            <button className="bg-primary-facebook text-white p-3 w-1/3 mx-4">Facebook</button>
            <button className="bg-primary-color01 text-white p-3 w-1/3">Twitter</button>
          </div>
          <p className="text-center mt-4">
            Har du ikke en konto? <Link className="text-blue-400" href="/signup">Opret bruger</Link>
          </p>
        </form>
        {toast.isVisible && (
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={() => setToast({ ...toast, isVisible: false })}
        />
      )}
      </motion.section>
    </>
  );
}