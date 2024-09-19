import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import FormFieldWrapper from './FormFieldWrapper';
import { useUserAuth } from '../../context/FirestoreAuthContext';
import { Button } from '@/components/ui/button';

const schema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long',
  }),
});

const LoginForm = () => {
  const { login } = useUserAuth();

  const formMethods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { handleSubmit, control } = formMethods;

  const onSubmit = (data) => {
    login(data.email, data.password);
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
          />
          <FormFieldWrapper
            control={control}
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
          />
          <Button className={'bg-green-500'} type="submit">
            Login
          </Button>
        </form>
      </FormProvider>
    </section>
  );
};

export default LoginForm;
