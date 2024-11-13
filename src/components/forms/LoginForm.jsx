/**
 * @name LoginForm
 * @description LoginForm component
 * @returns {JSX.Element} - Rendered LoginForm component

 */

import { FormProvider } from "react-hook-form";
import FormFieldWrapper from "./FormFieldWrapper";
import { useUserAuth } from "../../context/FirestoreAuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { routerPaths } from "../../router/routeLabels";
import useLoading from "../../hooks/useLoading";
import Spinner from "../spinner/Spinner";
import { useState } from "react";
import useLoginForm from "../../hooks/useLoginForm";

const LoginForm = () => {
  const { login } = useUserAuth();
  const navigate = useNavigate();
  const { loading, setLoading } = useLoading();
  const [error, setError] = useState(null);
  const formMethods = useLoginForm();

  const { handleSubmit, control } = formMethods;

  const onSubmit = async (data) => {
    try {
      setLoading("login", true);
      setError(null);
      await login(data.email, data.password);
      navigate(routerPaths.dashboard);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading("login", false);
    }
  };

  return (
    <section className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
          <FormFieldWrapper
            control={control}
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
          />
          <FormFieldWrapper
            control={control}
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
          />
          <Button
            className={`bg-green-500 ${loading("login") ? "cursor-not-allowed" : "cursor-pointer"}`}
            type="submit">
            {loading("login") ? <Spinner /> : "Login"}
          </Button>
        </form>
      </FormProvider>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </section>
  );
};

export default LoginForm;
