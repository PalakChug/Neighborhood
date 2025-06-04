import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [habits, setHabits] = useState(["Drink water", "Excercise", "Read a book"])
  const [newHabit, setNewHabit] = useState("")
  
  function addHabit() {
    if (newHabit.trim() !== "") {
      setHabits([...habits, newHabit.trim()])
      setNewHabit("")
    }
  }
  return (
    
    <div style={{ padding:20, backgroundColor: "#fdf6f0", fontFamily: "Arial, sans-serif", color: "#3c3c3c", minHeight: "100vh" }}>
      <h1 style={{ color: "#3e9ab1"}}> Neighborhood Habit Tracker</h1>
<p>Hello Lets's build some good habits today. 💪</p>
<p>Your next habit could be: {newHabit}</p>
      <input
      
        type="text"
        placeholder="New habit"
        value={newHabit}
        onChange={(e) => setNewHabit (e.target.value)}
        style={{
          padding: "8px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          width: "200px",
          backgroundColor: "#fff"
        }}
        />
      <button 
      onClick={addHabit} 
      style={{
        marginLeft: 10,
        padding: "8px 12 px",
        backgroundColor: "b3dee2",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer"
        }}
      >
        Add Habit
      </button>
      
      <ul style={{ marginTop: 20 }}>
        {habits.map((habit, index) => (
          <li key={index} style={{ padding: "4px 0" }}>{habit}</li>
        ))}
      </ul>
    </div>  
  )
}    
      

export default App
