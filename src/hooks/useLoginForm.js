/**
 * @name useLoginForm
 * @description Custom hook for login form
 * @returns {Object} - Form methods
 */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "../utils/schemas/zSchemas";

const useLoginForm = () => {
  const formMethods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return formMethods;
};

export default useLoginForm;
