import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../../slices/authSlice';
import { Link } from 'react-router-dom';
import './Auth.css';

import Message from '../../components/Message/Message';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = { email, password };

    dispatch(login(user));
  }

  useEffect(() => {
    dispatch(reset());
  }, [dispatch])

  return (
    <div id='login'>
      <h2>ReactGram</h2>
      <p className='subtitle'>Faça o login para ver e compartilhar fotos.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
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
          type="submit" 
          value={loading? 'Aguarde...' : 'Entrar'} 
          disabled={loading}
          />
          {error && <Message message={error} type='error' />}
      </form>
      <p>Não tem uma conta? <Link to='/register'>Cadastre-se</Link></p>
    </div>
  )
}

export default Login