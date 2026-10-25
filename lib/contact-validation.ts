export const limits = { name: 100, email: 254, subject: 160, message: 5000 };
export type ContactFields = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
export type ContactErrors = Partial<Record<keyof ContactFields, string>>;
export function validateContact(input: unknown): {
  fields: ContactFields;
  errors: ContactErrors;
} {
  const source =
    input && typeof input === "object"
      ? (input as Record<string, unknown>)
      : {};
  const fields: ContactFields = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };
  const errors: ContactErrors = {};
  for (const key of Object.keys(fields) as (keyof ContactFields)[]) {
    const value = source[key];
    fields[key] = typeof value === "string" ? value.trim() : "";
    if (!fields[key])
      errors[key] = `Please enter your ${key === "message" ? "message" : key}.`;
    else if (fields[key].length > limits[key])
      errors[key] = `Please keep this under ${limits[key]} characters.`;
    else if (key !== "message" && /[\r\n\x00]/.test(fields[key]))
      errors[key] = "Please use a single line of text.";
  }
  if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errors.email = "Please enter a valid email address.";
  if (fields.message && fields.message.length < 10)
    errors.message = "Please include at least 10 characters.";
  return { fields, errors };
}
