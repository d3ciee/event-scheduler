import { z } from "zod";

const registerUserValidationSchema = z.object({
    email: z.string({required_error:"Email field is required"}).email("Please enter a valid email address"),
    password: z
      .string({required_error:"Password field is required"})
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(1024, { message: "Password must be less than 1024 characters long" })
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
        message:
          "Password must contain at least one number, one uppercase letter and one one lowercase letter.",
      }),
  });

  export {
    registerUserValidationSchema
  }
  