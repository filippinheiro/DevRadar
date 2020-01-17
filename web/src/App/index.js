import React, { useEffect, useState } from 'react';
import DevItem from '../components/DevItem'

import '../global.css';
import './styles.css'
import api from '../services/api'
import '../components/LoginForm'
import LoginForm from '../components/LoginForm';


function App() {

  const [devs, setDevs] = useState([])
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setLatitude(latitude)
        setLongitude(longitude)
      },
      err => {
        console.log(err.message)
      },
      {
        timeout: 30000,
      }
    )
  }, [])

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs')
      setDevs(response.data)
    }
    loadDevs()
  }, [])

  return (
    <div id="app">
      <aside>
        <strong>Entrar</strong>
        <LoginForm/>
      </aside>

      <main>
        <header id="title">Desenvolvedores próximos de você</header>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
