import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../../slices/authSlice';

import Message from '../../components/Message/Message';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const {loading, error} = useSelector(state => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword
    }

    dispatch(register(user));
  }

  // Clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch])

  return (
    <div id='register'>
      <h2>ReactGram</h2>
      <p className='subtitle'>Cadastre-se para compartilhar fotos.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Name'
          value={name || ''}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder='E-mail'
          value={email || ''}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder='Senha'
          value={password || ''}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder='Confirmar senha'
          value={confirmPassword || ''}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input 
          type="submit" 
          value={loading? 'Aguarde...' : 'Cadastrar'} 
          disabled={loading}
        />
        {error && <Message message={error}  type='error'/>}
      </form>
      <p>
        Já tem conta? <Link to='/login'>Entrar</Link>
      </p>
    </div>
  )
}

export default Register