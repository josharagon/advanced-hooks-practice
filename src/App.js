import React, { useEffect, useReducer } from 'react';
import Ideas from './Ideas';
import Form from './Form';
import ThemeContext from './ThemeContext'
import './App.css';


const initialState = {
  theme: 'light',
  ideas: [],
}

const appReducer = (state, action) => {
  switch(action.type) {
    case 'TOGGLE_THEME':
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      return {...state, theme: newTheme};
    case 'ADD_IDEA' :
      const existingIdeas = state.ideas;
      existingIdeas.push(action.newIdea)
      return {...state, ideas: existingIdeas};
    case 'DELETE_IDEA':
      const filteredIdeas = state.ideas.filter(idea => idea.id !== action.id)
      return {...state, ideas: filteredIdeas};
      default:
        return state
  }
}


function App() {
 const [state, dispatch] = useReducer(appReducer, initialState)



  useEffect(() => {
    document.title = `Ideabox (${state.ideas.length})`
  })

  const addIdea = (newIdea) => {
    const action = {
      type: 'ADD_IDEA',
      newIdea: newIdea
    }
    dispatch(action);
  }

  const deleteIdea = (id) => {
    const action = {
      type: 'DELETE_IDEA',
      id:id
    }
    dispatch(action);
  }

  const toggleTheme = () => {
    const action = { type: 'TOGGLE_THEME'}
    dispatch(action);
  }

  return(
    <ThemeContext.Provider value={state.theme}>
    <main className={`App ${state.theme}`}>
      <h1>IdeaBox</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <Form addIdea={addIdea} />
      <Ideas ideas={state.ideas} deleteIdea={deleteIdea} />
    </main>
    </ThemeContext.Provider>
  )
}

export default App;
