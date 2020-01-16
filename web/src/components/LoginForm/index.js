import React, { useState } from 'react';
import api from '../../services/api'
import './styles.css'

function LoginForm() {

   const [github_username, setGithubUsername] = useState('')
   const [password, setPassword] = useState('')

   async function handleSubmit(event) {
      event.preventDefault()
      const data = {
         github_username,
         password
      }
      const response = await api.post('/login', data)
      if (response.data.token) console.log('User logado')
      setGithubUsername('')
      setPassword('')
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
            <label htmlFor="password">Senha</label>
            <input name="password"
               id="password"
               required
               value={password}
               type="password"
               onChange={e => setPassword(e.target.value)} />
         </div>
         <button type="submit">Entrar</button>
      </form>
   )
}

export default LoginForm;
