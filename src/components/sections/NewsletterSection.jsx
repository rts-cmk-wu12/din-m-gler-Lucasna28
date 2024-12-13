"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRightIcon, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { z } from "zod";

const emailSchema = z.string().email({ message: "Indtast venligst en gyldig email" });

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { addToast, ToastContainer } = useToast();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const validateEmail = (email) => {
    try {
      emailSchema.parse(email); // Valider e-mail med zod
      return "";
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors[0]?.message || "Ugyldig email";
      }
      return "Der opstod en fejl";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);

    const error = validateEmail(email);
    if (error) {
      addToast(error, "error");
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSuccess(true);
      addToast("Tak for din tilmelding! Du vil modtage en bekræftelse på mail.", "success");
      setEmail("");
      setTouched(false);
    } catch (error) {
      addToast("Der opstod en fejl. Prøv venligst igen.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className="py-16 bg-cover bg-center h-[14rem] w-full relative"
      style={{
        backgroundImage: "url('/images/newsletter.png')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/65 w-full" />
      <motion.div
        className="container mx-auto px-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="w-full mx-auto text-center text-white flex items-center justify-center">
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold mb-4 w-1/3"
          >
            Tilmeld dig vores nyhedsbrev og hold dig opdateret på boligmarkedet
          </motion.h2>
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="flex max-w-xl mx-auto relative"
            noValidate
            aria-label="Nyhedsbrev tilmelding"
          >
            <motion.input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => {
                setIsFocused(false);
                setTouched(true);
              }}
              placeholder="Din e-mail adresse"
              className={`
                flex-1 px-4 py-3 text-gray-900 
                focus:outline-none focus:ring-2 focus:ring-white
                disabled:bg-gray-100 disabled:cursor-not-allowed
                ${touched && validateEmail(email) ? "border-red-500" : ""}
              `}
              aria-label="Email adresse"
              disabled={isLoading || isSuccess}
            />
            {touched && validateEmail(email) && (
              <p className="absolute -bottom-6 left-0 text-red-400 text-sm">
                {validateEmail(email)}
              </p>
            )}
            <motion.button
              type="submit"
              className={`
                px-6 py-3 font-semibold transition-colors flex
                ${isSuccess
                  ? "bg-green-500 text-white cursor-not-allowed"
                  : "bg-white text-primary-color01 hover:bg-gray-100"}
                disabled:opacity-70 disabled:cursor-not-allowed
              `}
              disabled={isLoading || isSuccess}
            >
              {isLoading ? (
                <Loader2 className="size-5 animate-spin"/>
              ): isSuccess ? (
                <span className="">Tilmeldt</span>
              ): (<span className="sr-only">Send</span>)}
              <ArrowRightIcon />
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
      <ToastContainer />
    </section>
  );
}