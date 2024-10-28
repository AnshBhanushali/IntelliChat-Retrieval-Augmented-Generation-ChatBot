// src/components/Auth/SignupForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { signup } from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './AuthStyles.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

interface SignupFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'At least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm Password is required'),
});

const SignupForm: React.FC = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (data: SignupFormInputs) => {
    try {
      const response = await signup(data.email, data.password);
      setUser(response.data.user);
      navigate('/chat');
    } catch (error) {
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
      <h2>Sign Up</h2>
      <label>
        Email
        <input type="email" {...register('email')} />
        <p className={styles.error}>{errors.email?.message}</p>
      </label>
      <label>
        Password
        <input type="password" {...register('password')} />
        <p className={styles.error}>{errors.password?.message}</p>
      </label>
      <label>
        Confirm Password
        <input type="password" {...register('confirmPassword')} />
        <p className={styles.error}>{errors.confirmPassword?.message}</p>
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
