import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email().required("No email provided"),
  password: yup
    .string()
    .required("No password provided")
    .min(8, "Password is too short - should be 8 chars minimum"),
});

export const registerSchema = yup.object({
  email: yup.string().email().required("No email provided"),
  password: yup
    .string()
    .required("No password provided")
    .min(8, "Password is too short - should be 8 chars minimum"),
  firstName : yup.string().min(4).required(),
  lastName : yup.string().min(4).required(),
});

