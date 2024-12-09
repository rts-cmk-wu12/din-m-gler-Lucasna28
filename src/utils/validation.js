// utils/validation.ts
import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, "Navn er påkrævet"),
  email: z.string().email("Ugyldig emailadresse"),
  subject: z.string().min(1, "Emne er påkrævet"),
  message: z.string().min(1, "Besked er påkrævet"),
});
