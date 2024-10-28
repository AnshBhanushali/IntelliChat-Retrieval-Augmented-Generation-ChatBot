import React from 'react';
import { useForm } from 'react-hook-form';
import { login } from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './AuthStyles.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

interface LoginFormInputs {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginForm: React.FC = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await login(data.email, data.password);
      setUser(response.data.user);
      navigate('/chat');
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
      <h2>Login</h2>
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
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
