import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useState, useEffect } from 'react'

function App(){
  const [habits, setHabits] = useState([])
  const [newHabit, setNewHabit] = useState('')
  const [completedToday, setCompletedToday] = useState([]);
  const [habitCount, setHabitCount] = useState(0);
  const [habitToDelete, setHabitToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [habitBeingEdited, setHabitBeingEdited] = useState(null);
  const [editHabitText, setEditHabitText] = useState('');
  const [serverbaseurl, setServerBaseUrl] = useState('http://localhost:3000');
  useEffect(() => {
    fetch(`${serverbaseurl}/habits`)
    .then(res => res.json())
    .then(data => {
      setHabits(data.habits);
      setHabitCount(data.habits.length);
    })
    .catch(console.error);
  
  fetch(serverbaseurl+'/habits/count')
    .then(res => res.json())
    .then(data => setHabitCount(data.count))
    .catch(console.error);

    const today = new Date().toISOString().split('T')[0];
    fetch(`${serverbaseurl}/habits/completed/${today}`)
    .then(res => res.json())
    .then(data => setCompletedToday(data.completed || []))
    .catch(console.error);
  }, [])

  const addHabit = () => {
    if(!newHabit.trim()) return
    fetch(serverbaseurl+'/habits', {
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
    fetch(`${serverbaseurl}/habits/${encodeURIComponent(habitToDelete)}`,{
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(() => {
      setHabits(prev => prev.filter(h => h !== habitToDelete));
    })
    .catch(console.error);
  };
  function markHabitComplete(habit) {
    const today = new Date(). toISOString().split('T')[0];// Format: "YYYY-MM-DD"
    const alreadyCompleted = completedToday.includes(habit);
    const url = alreadyCompleted
      ? serverbaseurl+'/habits/uncomplete'
      : serverbaseurl+'/habits/complete';
    console.log(alreadyCompleted ? "Unchecking..." : "Checking...");
   
    fetch(url, {
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

  const saveEdit = (oldHabit) => {
    fetch(`${serverbaseurl}/habits/${encodeURIComponent(oldHabit)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newHabit: editHabitText }),
    })
    .then((res) => res.json())
    .then(() => {
      setHabits(habits.map(h => h === oldHabit ? editHabitText : h));
      setHabitBeingEdited(null);
      setEditHabitText('');
    })
    .catch(console.error);
  };
  
  return(
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
        const isEditing = habitBeingEdited === habit;

        return (
        <li 
          key={i} 
          data-index={i}
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
            checked={completed}
            onChange={() => markHabitComplete(habit)}
          />
          
          {isEditing ? (
            <>
              <input
                type="text"
                value={editHabitText}
                onChange={(e) => setEditHabitText(e.target.value)}
                style={{ padding: "4px", fontSize: "14px" }}
              />
              <button 
                onClick={() => saveEdit(habit)}
                style={{
                  padding: "4px 6px",
                  fontSize: "12px",
                  backgroundColor: "solid #bbf7d0",
                  color: "solid #166534",
                  border: "none",
                  borderRadius: "4px"
                }}
                >
                  Save
                </button>
              <button 
                onClick={() => {
                  setHabitBeingEdited(null);
                  setEditHabitText('');
              }}
              style={{
                padding: "4px 6px",
                fontSize: "12px",
                backgroundColor: "#fde68a",
                color: "#78350f",
                border: "none",
                borderRadius: "4px"
              }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              {habit}
              <button 
                onClick={() => {
                  setHabitBeingEdited(habit);
                  setEditHabitText(habit);
              }}
              style={{
                padding: "4px 6px",
                fontSize: "12px",
                backgroundColor: "solid #bae6fd",
                color: "solid #0c4a6e",
                border: "none",
                borderRadius: "4px"
              }}
              >
                Edit
              </button>

              <button
                onClick={() => {
                  setHabitToDelete(habit);
                  setShowModal(true);
                }}
                style={{
                  padding: "4px 6px",
                  fontSize: "12px",
                  backgroundColor: "solid #fecaca",
                  color: "solid #166534",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Delete
              </button>
            </>
          )}
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
   {showModal && habitToDelete && (
    <div style ={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgb(255, 255, 255)',
      display: 'flex',
      alignItems: 'center', 
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'solid #fff0f5', // rlly light lavender pink
        padding: '20px',
        borderRadius: '12px',
        textAlign: 'center',
        maxWidth: '300px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15',
        border: '2px solid #f3cfe2', 
        transition: 'all 0.3s ease-in-out'
      }}>
        <p>Are you sure you want to delete <strong>{habitToDelete}</strong>?</p>
        <button 
          onClick={() => {
            deleteHabit(habitToDelete);
            setShowModal(false);
            setHabitToDelete(null);
        }}
        style={{ 
          marginRight: '10px',
          padding: '6px 12px',
          backgroundColor: 'solid #f28b82',
          color: 'white',
          border:'none',
          borderRadius: '6px',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
           }}
           onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
           onMouseLeave={e => e.target.style.transform = 'scale(1.0)'}
           >
          Yes
          </button>
        <button 
          onClick={() => {
            setShowModal(false);
            setHabitToDelete(null);
        }}
        style={{
          padding: '6px 12px',
          backgroundColor: 'solid #aecbfa',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
        }}
        onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
        onMouseLeave={e => e.target.style.transform = 'scale(1.0)'}
        >
          Cancel
        </button>
      </div>
    </div>  
   )}
   </div>
  )};

export default App;
