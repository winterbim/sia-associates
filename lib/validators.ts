import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caracteres")
    .max(100, "Le nom ne doit pas depasser 100 caracteres"),
  email: z.string().email("Adresse email invalide"),
  company: z
    .string()
    .min(1, "Le nom de l'entreprise est requis")
    .max(100, "Le nom ne doit pas depasser 100 caracteres"),
  subject: z.enum(
    [
      "architecture",
      "pilotage",
      "exploitation",
      "cloud",
      "audit",
      "autre",
    ],
    { errorMap: () => ({ message: "Veuillez selectionner un sujet" }) }
  ),
  message: z
    .string()
    .min(20, "Le message doit contenir au moins 20 caracteres")
    .max(2000, "Le message ne doit pas depasser 2000 caracteres"),
  consent: z.literal(true, {
    errorMap: () => ({
      message: "Vous devez accepter la politique de confidentialite",
    }),
  }),
  website: z.string().max(0).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
