import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const Register = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div id='register'>
      <h2>ReactGram</h2>
      <p className='subtitle'>Cadastre-se para compartilhar fotos.</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Name' />
        <input type="email" placeholder='E-mail' />
        <input type="password" placeholder='Senha' />
        <input type="password" placeholder='Confirmar senha' />
        <input type="submit" value='Cadastrar' />
      </form>
      <p>
        Já tem conta? <Link to='/login'>Entrar</Link>
      </p>
    </div>
  )
}

export default Register