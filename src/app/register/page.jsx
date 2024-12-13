'use client'

import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import PageHero from "@/components/ui/PageHero";
import Link from "next/link";
import { Toast } from "@/components/ui/Toast";

const TOAST_MESSAGES = {
  validation: "Tjek venligst de markerede felter",
  success: "Bruger oprettet!",
  error: "Oprettelse af bruger fejlede. Prøv igen.",
};

const registerSchema = z.object({
  name: z.string().min(1, "Fulde navn er påkrævet"),
  email: z.string()
    .min(1, "Email er påkrævet")
    .email("Ugyldig email format"),
  password: z.string()
    .min(6, "Adgangskode skal være mindst 6 tegn"),
  confirmPassword: z.string()
    .min(6, "Bekræft adgangskode skal være mindst 6 tegn")
    .refine((val, ctx) => {
      if (val !== ctx.parent.password) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Adgangskoderne skal matche",
        });
      }
      return true;
    }),
});

export default function RegisterPage() {
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [isLoading, setIsLoading] = useState(false);

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors({});
    
    try {
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData);
      const validatedData = registerSchema.parse(data);
      showToast(TOAST_MESSAGES.success, "success");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = {};
        error.errors.forEach((err) => {
          formattedErrors[err.path[0]] = err.message;
        });
        setErrors(formattedErrors);
        showToast(TOAST_MESSAGES.validation, "error");
      } else {
        showToast(TOAST_MESSAGES.error, "error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageHero />
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col align-middle justify-center h-full p-20 relative"
      >
        <form 
          onSubmit={handleSubmit} 
          noValidate
          className="w-full max-w-md mx-auto rounded-lg shadow-xl h-1/2 p-8 border-shape-shape01 border-2 flex flex-col justify-between"
        >
          <h1 className="text-2xl font-bold text-center mb-6">Opret bruger</h1>
          
          <div className="flex flex-col my-2">
            <label className="flex flex-col">
              Fulde navn
              <input
                type="text"
                name="name"
                placeholder="Fulde navn"
                className={`border-2 p-2 ${
                  errors.name ? 'border-primary-red' : 'border-gray-200'
                }`}
              />
            </label>
            {errors.name && (
              <span className="text-primary-red text-sm mt-1">{errors.name}</span>
            )}
          </div>

          <div className="flex flex-col my-2">
            <label className="flex flex-col">
              Email
              <input
                type="email"
                name="email"
                placeholder="navn@mail.dk"
                className={`border-2 p-2 ${
                  errors.email ? 'border-primary-red' : 'border-gray-200'
                }`}
              />
            </label>
            {errors.email && (
              <span className="text-primary-red text-sm mt-1">{errors.email}</span>
            )}
          </div>

          <div className="flex flex-col my-2">
            <label className="flex flex-col">
              Adgangskode
              <input
                type="password"
                name="password"
                placeholder="Adgangskode"
                className={`border-2 p-2 ${
                  errors.password ? 'border-primary-red' : 'border-gray-200'
                }`}
              />
            </label>
            {errors.password && (
              <span className="text-primary-red text-sm mt-1">{errors.password}</span>
            )}
          </div>

          <div className="flex flex-col my-2">
            <label className="flex flex-col">
              Bekræft adgangskode
              <input
                type="password"
                name="confirmPassword"
                placeholder="Bekræft adgangskode"
                className={`border-2 p-2 ${
                  errors.confirmPassword ? 'border-primary-red' : 'border-gray-200'
                }`}
              />
            </label>
            {errors.confirmPassword && (
              <span className="text-primary-red text-sm mt-1">{errors.confirmPassword}</span>
            )}
          </div>

          <button type="submit" className="bg-primary-color01 text-white text-center w-full p-2 mt-4">
            Opret bruger
          </button>

          <p className="text-center mt-4">
            Har du allerede en konto? <Link className="text-blue-400" href="/login">Log ind her</Link>
          </p>
        </form>
        {toast.show && (
            <Toast
              message={toast.message}
              isVisible={toast.show}
              onClose={() => setToast({ ...toast, show: false })}
              type={toast.type}
            />
        )}
      </motion.section>
    </>
  );
}

