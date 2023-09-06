import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../supabase';

type SignInFormData = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();
  const navigate = useNavigate();
  const [signInError, setSignInError] = useState('');

  const onSubmit: SubmitHandler<SignInFormData> = async (values) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      setSignInError('Kunne ikke logge ind. Er din information korrekt?');
    } else {
      setSignInError('');
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Email
        <input
          type="text"
          {...register('email', {
            required: 'skal udfyldes',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'ugyldig email',
            },
          })}
          placeholder="Email..."
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </label>
      <label>
        Kodeord
        <input
          type="password"
          {...register('password', { required: 'skal udfyldes' })}
          placeholder="Kodeord..."
        />
        {errors.password && <p className="error">{errors.password.message}</p>}
      </label>
      <button className="primary" type="submit">
        LOG IND
      </button>
      {signInError !== '' && <p className="error">{signInError}</p>}
    </form>
  );
};

export default SignInForm;
