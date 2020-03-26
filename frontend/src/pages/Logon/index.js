import React, { useState } from 'react'
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import './styles.css'

import api from '../../services/api'

import heroesImage from '../../assets/heroes.png'
import logoImage from '../../assets/logo.svg'

export default function Logon () {
  const [id, setID] = useState('')
  const history = useHistory()

  async function handleLogin (e) {
    e.preventDefault()

    try {
      const result = await api.post('/sessions', {id})
      localStorage.setItem('ongID', id)
      localStorage.setItem('ongName', result.data.name)
      history.push('/profile')
    } catch (error) {
      alert('Falha no login, tente novamente.')
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImage} alt="Be The Hero"/>
        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <input type="text" placeholder="Sua ID" value={id} onChange={e => setID(e.target.value)}/>
          <button className="button" type="submit">Entrar</button>
          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#e02041"/>
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImage} alt="Heroes"/>
    </div>
  );
}