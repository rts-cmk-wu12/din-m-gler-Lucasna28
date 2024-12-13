"use client"
import { useState } from "react";
import { redirect } from "next/navigation";
import { motion } from "framer-motion";
import { z } from "zod";
import PageHero from "@/components/ui/PageHero";
import Link from "next/link";
import login from "@/actions/login";
import { Toast } from "@/components/ui/Toast";

const TOAST_MESSAGES = {
  validation: "Tjek venligst de markerede felter",
  success: "Login successful!",
  error: "Login fejlede. Tjek venligst dine oplysninger.",
  invalidEmail: "Forkert email format. Husk at tilføje første bogstav af efternavn hvis der er flere med samme navn",
  serverError: "Der opstod en fejl. Prøv igen senere.",
};

const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, "Email er påkrævet")
    .email("Ugyldig email format")
    .refine(
      (email) => /^[a-zA-Z]+(?:[A-Z][a-zA-Z]*)?@mail\.dk$/.test(email),
      "Email skal være i formatet: navn@mail.dk"
    ),
  password: z
    .string()
    .min(1, "Adgangskode er påkrævet")
    .refine((pwd) => pwd === "123456", "Ugyldig adgangskode"),
});

export default function LoginPage() {
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
      // Validate form data
      const validatedData = loginSchema.parse(data);
      
      try {
        // Submit form
        const result = await login(null, formData);
        if (result.success) {
          showToast(TOAST_MESSAGES.success, "success");
          setTimeout(() => redirect("/"), 1500);
        } else {
          // Handle known login failures
          showToast(TOAST_MESSAGES.error, "error");
        }
      } catch (error) {
        // Handle API errors
        if (error?.message?.includes("Internal Server Error") || error?.status === 500) {
          // Specific handling for potential duplicate name cases
          const email = formData.get("identifier");
          const nameWithoutDomain = email.split("@")[0];
          
          if (nameWithoutDomain && !nameWithoutDomain.match(/[A-Z]/)) {
            showToast(TOAST_MESSAGES.invalidEmail, "error");
            setErrors({
              identifier: "Tilføj venligst første bogstav af dit efternavn (med stort)"
            });
          } else {
            showToast(TOAST_MESSAGES.serverError, "error");
          }
        } else {
          showToast(TOAST_MESSAGES.serverError, "error");
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = {};
        error.errors.forEach((err) => {
          formattedErrors[err.path[0]] = err.message;
        });
        setErrors(formattedErrors);
        showToast(TOAST_MESSAGES.validation, "error");
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
          <h1 className="text-2xl font-bold text-center mb-6">Log ind på din konto</h1>
          
          <div className="flex flex-col my-2">
            <label className="flex flex-col">
              Email
              <input
                type="email"
                name="identifier"
                placeholder="navn@mail.dk"
                className={`border-2 p-2 ${
                  errors.identifier ? 'border-primary-red' : 'border-gray-200'
                }`}
              />
            </label>
            {errors.identifier && (
              <span className="text-primary-red text-sm mt-1">{errors.identifier}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="flex flex-col">
              Adgangskode
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={`border-2 p-2 ${
                  errors.password ? 'border-primary-red' : 'border-gray-200'
                }`}
              />
            </label>
            {errors.password && (
              <span className="text-primary-red text-sm mt-1">{errors.password}</span>
            )}
          </div>

          <button type="submit" className="bg-primary-color01 text-white text-center w-full p-2 mt-4">
            Log ind
          </button>

          <p className="mt-8">Log ind med</p>
          <div className="flex justify-between">
            <button type="button" className="bg-primary-orange text-white p-3 w-1/3">Google</button>
            <button type="button" className="bg-primary-facebook text-white p-3 w-1/3 mx-4">Facebook</button>
            <button type="button" className="bg-primary-color01 text-white p-3 w-1/3">Twitter</button>
          </div>

          <p className="text-center mt-4">
            Har du ikke en konto? <Link className="text-blue-400" href="/register">opret bruger</Link>
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