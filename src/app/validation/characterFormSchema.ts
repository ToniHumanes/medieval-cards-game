import { z } from "zod";

export const REQUIRED_FIELD_MESSAGE = "Campo requerido.";

export const warriorTypeValues = ["1", "2", "3", "4"] as const;

export type WarriorTypeId = (typeof warriorTypeValues)[number];

export const warriorOptions = [
  { label: "Guerrero", value: "1" },
  { label: "Guerrera", value: "2" },
  { label: "Mago", value: "3" },
  { label: "Samurai", value: "4" },
] as const;

const warriorTypeSchema = z
  .string()
  .refine(
    (value): value is WarriorTypeId =>
      warriorTypeValues.includes(value as WarriorTypeId),
    { message: REQUIRED_FIELD_MESSAGE }
  )
  .transform((value) => value as WarriorTypeId);

export const characterFormSchema = z.object({
  inputValue: z.string().trim().min(1, { message: REQUIRED_FIELD_MESSAGE }),
  selectValue: warriorTypeSchema,
});

export type CharacterFormInput = z.input<typeof characterFormSchema>;
export type CharacterFormValues = z.output<typeof characterFormSchema>;
