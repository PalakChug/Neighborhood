import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useState, useEffect } from 'react'

function App(){
  const [habits, setHabits] = useState([])
  const [newHabit, setNewHabit] = useState('')

  useEffect(() => {
    fetch('http://localhost:3000/habits')
    .then(res => res.json())
    .then(data => setHabits(data.habits))
    .catch(console.error)
  }, [])

  const addHabit = () => {
    if(!newHabit.trim()) return
    fetch('http://localhost:3000/habits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newHabit.trim() }),
    })
    .then(res => res.json())
    .then(data => {
      setHabits(data.habits)
      setNewHabit('')
    })
    .catch(console.error)
  } 
  const deleteHabit = (habitToDelete) => {
    fetch(`http://localhost:3000/habits/${encodeURIComponent(habitToDelete)}`,{
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(data => {
      setHabits(habits.filter(h => h != habitToDelete));
    })
    .catch(console.error);
  };
  return (
  <div style ={{
    padding: 20,
    backgroundColor: "#fdf6f0",
    fontFamily:"Arial, sans-serif",
    color: "#3c3c3c",
    minHeight: "100vh"
  }}>
    <h1 style ={{ color: "#3e9ab1" }}>My Habits</h1>
    <p>Hello! Let's build some new habits today!</p>
    <ul>
      {habits.map((habit, index) => (
        <li key={index}>
          {habit}
          <button 
          onClick={() => deleteHabit(habit)}
          style={{
             marginLeft: 10,
             padding: '2px 6px',
             fontSize: '0.8rem',
             color: 'white',
             backgroundColor: 'red',
             border: 'none',
             borderRadius: '4px',
             cursor: 'pointer' 
            }}
          >
            x
          </button>
          </li>
      ))}
    </ul>
    <input 
      type="text"
      value={newHabit}
      onChange={e => setNewHabit(e.target.value)}
      placeholder="Add a new habit"
    />
    <button onClick={addHabit}>Add Habit</button>

  </div>
  )
} 
      

export default App
