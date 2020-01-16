import React, { useState, useEffect} from 'react';
import './styles.css'


function DevForm({ onSubmit }) {

  const [github_username, setGithubUsername] = useState('')
  const [password, setPassword] = useState('')
  const [techs, setTechs] = useState('')
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
  
  
  async function handleSubmit(event) {
    try {
      event.preventDefault()
      const data = {
        github_username,
        techs,
        password,
        latitude,
        longitude
      }
      const response = await api.post('/signup', data)
    } finally {
      setGithubUsername('')
      setTechs('')
      setPassword('')
    }

  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="github_username">Usuário do Github</label>
        <input
          name="github_username"
          id="github_username"
          required
          value={github_username}
          onChange={e => setGithubUsername(e.target.value)} />
      </div>

      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input name="techs"
          id="techs"
          required
          value={techs}
          onChange={e => setTechs(e.target.value)} />
      </div>

      <div className="input-block">
        <label htmlFor="password">Senha</label>
        <input name="password"
          id="password"
          required
          value={password}
          type="password"
          onChange={e => setPassword(e.target.value)} />
      </div>

      <div className="input-group">

        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input type="number" name="latitude" id="latitude" required disabled value={latitude} />
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input type="number" name="longitude" id="longitude" required disabled value={longitude} />
        </div>
      </div>
      <button type="submit">Entrar</button>
    </form>
  )

}

export default DevForm;
