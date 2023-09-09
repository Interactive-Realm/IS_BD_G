import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { supabase } from '../../../supabase-ram';

type Props = {
  onSignUp: () => void;
};

type SignUpFormData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
};

const SignUpForm = ({ onSignUp }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();
  // const navigate = useNavigate();
  const [signInError, setSignInError] = useState('');

  const onSubmit: SubmitHandler<SignUpFormData> = async (values) => {
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          email: values.email,
          phone: values.phone,
          first_name: values.firstName,
          last_name: values.lastName,
        },
      },
    });

    if (error) {
      setSignInError('Kunne ikke logge ind. Er din information korrekt?');
    } else {
      setSignInError('');
      // navigate('/');
      onSignUp();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Fornavn
        <input
          type="text"
          {...register('firstName', { required: 'skal udfyldes' })}
          placeholder="Fornavn..."
        />
        {errors.firstName && (
          <p className="error">{errors.firstName.message}</p>
        )}
      </label>
      <label>
        Efternavn
        <input
          type="text"
          {...register('lastName', { required: 'skal udfyldes' })}
          placeholder="Efternavn..."
        />
        {errors.lastName && <p className="error">{errors.lastName.message}</p>}
      </label>
      <label>
        Telefon nr.
        <input
          type="tel"
          {...register('phone', { required: 'skal udfyldes' })}
          placeholder="Telefon nr..."
        />
        {errors.phone && <p className="error">{errors.phone.message}</p>}
      </label>
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
      <button className="button primary" type="submit">
        OPRET BRUGER
      </button>
      {signInError !== '' && <p className="error">{signInError}</p>}
    </form>
  );
};

export default SignUpForm;
