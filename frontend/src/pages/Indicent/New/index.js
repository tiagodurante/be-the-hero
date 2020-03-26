import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import './styles.css'

import logo from '../../../assets/logo.svg'
import api from '../../../services/api'

export default function NewIncident () {
  const history = useHistory()
  const ongID = localStorage.getItem('ongID')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')

  async function handleNewIncident (e) {
    e.preventDefault()
    const data = {
      title, description, value
    }
    try {
      await api.post('/incidents', data, {
        headers: {
          Authorization: ongID
        }
      })
      history.push('/profile')
    } catch (error) {
      alert('Erro ao cadastrar este caso.')
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logo} alt="Logotipo"/>
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
          <Link to="/profile" className="back-link">
            <FiArrowLeft size={16} color="#e02041"/>
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input type="text" placeholder="Título" value={title} onChange={e => setTitle(e.target.value)}/>
          <textarea type="text" placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)}/>
          <input type="number" step={0.01} placeholder="Valor em reais" value={value} onChange={e => setValue(e.target.value)}/>
          <button className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}