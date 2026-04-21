import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(100, "Le nom ne doit pas dépasser 100 caractères"),
  email: z.string().email("Adresse email invalide"),
  company: z
    .string()
    .min(1, "Le nom de l'entreprise est requis")
    .max(100, "Le nom ne doit pas dépasser 100 caractères"),
  subject: z.enum(
    [
      "architecture",
      "pilotage",
      "exploitation",
      "cloud",
      "audit",
      "autre",
    ],
    { errorMap: () => ({ message: "Veuillez sélectionner un sujet" }) }
  ),
  message: z
    .string()
    .min(20, "Le message doit contenir au moins 20 caractères")
    .max(2000, "Le message ne doit pas dépasser 2000 caractères"),
  consent: z.literal(true, {
    errorMap: () => ({
      message: "Vous devez accepter la politique de confidentialité",
    }),
  }),
  website: z.string().max(0).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
