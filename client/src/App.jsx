import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useState, useEffect } from 'react'

function App(){
  const [habits, setHabits] = useState([])
  const [newHabit, setNewHabit] = useState('')
  const [completedToday, setCompletedToday] = useState([]);
  const [habitCount, setHabitCount] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3000/habits')
    .then(res => res.json())
    .then(data => {
      setHabits(data.habits);
      setHabitCount(data.habits.length);
    })
    .catch(console.error);
  
  fetch('http://localhost:3000/habits/count')
    .then(res => res.json())
    .then(data => setHabitCount(data.count))
    .catch(console.error);

    const today = new Date().toISOString().split('T')[0];
    fetch(`http://localhost:3000/habits/completed/${today}`)
    .then(res => res.json())
    .then(data => setHabitCompleted(data.completed || []))
    .catch(console.error);
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
  function markHabitComplete(habit) {
    const today = new Date(). toISOString().split('T')[0];// Format: "YYYY-MM-DD"
    const alreadyCompleted = completedToday.includes(habit);
    const url = alreadyCompleted
      ? 'http://localhost:3000/habits/uncomplete'
      : 'http://localhost:3000/habits/complete';
    console.log(alreadyCompleted ? "Unchecking..." : "Checking...");
    fetch( url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ habit, date: today }),
    })
    .then(res => res.json())
    .then(() => {
      if (alreadyCompleted) {
      setCompletedToday(prev => prev.filter(h => h !== habit));
    } else {
      setCompletedToday(prev => [...prev, habit]);
    }
  })
    .catch(console.error)
  }
  
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
    <p>Total Habits: {habitCount}</p>
    <ul>
      {habits.map((habit, i) => {
        const completed = completedToday.includes(habit);
        return(
        <li 
          key={i} 
          style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "10px",
            textDecoration: completed ? "line-through" : "none",
            color: completed ? "#888" : "#000"
            }}
            >
          <input
            type = "checkbox"
            checked={completedToday.includes(habit)}
            onChange={() => markHabitComplete(habit)}
            />
          {habit}
          <button 
          onClick={() => {
            if (confirm(`Are you sure you want to delete "${habit}"?`)) {
              deleteHabit(habit);
            }
          }}  
          style={{
             marginLeft: 10,
             padding: "4px 8px",
             fontSize: "12px",
             color: "white",
             backgroundColor: "#f28b82",
             border: "none",
             borderRadius: "4px",
             cursor: "pointer" 
            }}
          >
            Delete
          </button>
          </li>
      );
     })}
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
