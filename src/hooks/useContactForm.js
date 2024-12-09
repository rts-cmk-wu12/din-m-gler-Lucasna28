// hooks/useContactForm.ts
import { useState } from "react";
import { contactFormSchema, ContactFormValues } from "@/validation";
import { useToast } from "./useToast";

export function useContactForm() {
  const [formData, setFormData] =
    useState <
    ContactFormValues >
    {
      name: "",
      email: "",
      subject: "",
      message: "",
    };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationResult = contactFormSchema.safeParse(formData);
    if (!validationResult.success) {
      validationResult.error.errors.forEach((err) => {
        showToast({ message: err.message, type: "error" });
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simuler en asynkron handling (f.eks. en API-anmodning)
      showToast({ message: "Besked sendt!", type: "success" });
    } catch (error) {
      showToast({ message: "Fejl ved afsendelse af besked", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { formData, handleChange, handleSubmit, isSubmitting };
}
