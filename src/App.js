import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(()=> {
    api.get('/repositories').then(response =>{
      setRepositories(response.data)
    })

  },[])

  async function handleAddRepository() {

    const response = await api.post('repositories',{
      title:"Project3",
	    url:"github.com/Cleiton",
      techs:["Javascript"]
    })

    const repositorie = response.data

    setRepositories([...repositories, repositorie])
  }

  async function handleRemoveRepository(id) {
     await api.delete(`repositories/${id}`)

     const elementIndex = repositories.findIndex(repositorie => repositorie.id === id)

     const repositoriesUpdate = [...repositories ]
     repositoriesUpdate.splice(elementIndex,1) 

     setRepositories(repositoriesUpdate)

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorie => 
        <li key={repositorie.id}>

          {repositorie.title}

          <button onClick={() => handleRemoveRepository(repositorie.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
