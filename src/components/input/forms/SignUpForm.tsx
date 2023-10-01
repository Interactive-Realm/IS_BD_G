import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { supabase } from "../../../supabase-ram";

type Props = {
  onSignUp: () => void;
};

type SignUpFormData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  checkbox: [];
};

const SignUpForm = ({ onSignUp }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();
  const [signInError, setSignInError] = useState("");

  const onSubmit: SubmitHandler<SignUpFormData> = async (values) => {
    if (values.checkbox && values.checkbox.length < 2) return;

    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: "000000",
    });

    if (error) {
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: "000000",
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
        setSignInError("Kunne ikke tilmelde. Er din information korrekt?");
      } else {
        setSignInError("");
        onSignUp();
      }
    } else {
      setSignInError('');
      onSignUp();
    }

    
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        <input
          type="text"
          {...register("firstName", { required: "skal udfyldes" })}
          placeholder="Fornavn..."
        />
        {errors.firstName && (
          <p className="error">{errors.firstName.message}</p>
        )}
      </label>
      <label>
        <input
          type="text"
          {...register("lastName", { required: "skal udfyldes" })}
          placeholder="Efternavn..."
        />
        {errors.lastName && <p className="error">{errors.lastName.message}</p>}
      </label>
      <label>
        <input
          type="tel"
          {...register("phone", { required: "skal udfyldes" })}
          placeholder="Telefon nr..."
        />
        {errors.phone && <p className="error">{errors.phone.message}</p>}
      </label>
      <label>
        <input
          type="text"
          {...register("email", {
            required: "skal udfyldes",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "ugyldig email",
            },
          })}
          placeholder="Email..."
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </label>
      <div className="input-checkbox">
        <input {...register("checkbox")} type="checkbox" value="A" required={true}/> 
        {' '} Jeg accepterer <a href="https://intersport.dk/fodselsdagsspil.html" className="underline" target="_blank">konkurrencebetingelserne</a>.
      </div>
      <div className="input-checkbox">
        <input {...register("checkbox")} type="checkbox" value="B" required={true}/> 
        {'  '} Jeg samtykker til at modtage nyhedsbreve fra CLUB Intersport.
      </div>
      <div className="button-group" >
      <button className="button primary" type="submit">
        TILMED & DELTAG
      </button>
      <p></p>
      </div>
      {signInError !== "" && <p className="error">{signInError}</p>}
    </form>
  );
};

export default SignUpForm;
