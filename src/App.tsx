import { useState } from 'react'

import './global.css';
import styles from './App.module.css';

import rocket from './assets/rocket.svg'

function App() {
  /* const tasks = [
    {
      id: 1,
      active: true,
      name: "Primeira Tarefa"  
    },
    {
      id: 2,
      active: false,
      name: "Segunda Tarefa"  
    },
    {
      id: 3,
      active: true,
      name: "Terceira Tarefa"  
    }
  ] */

  const [newTask,setNewTask] = useState('')

  const [tasks,setTasks] = useState([])  

  function handleTaskChange(event) {
    setNewTask(event.target.value)
  } 

  function handleAddTask(event) {
    event?.preventDefault();
    const idInc = tasks.length + 1
    setTasks([...tasks, {id: idInc, active: false, name: newTask}])
    setNewTask('')
  } 

  function handleDeleteTask(event) {
    const result = tasks.filter((task) => task.id != event.target.id);
    setTasks(result)    
  } 

  function handleVerCheck(event) {
    const altertask = tasks.map(task => {
      if (task.id == event.target.id) {
        return {
          ...task,
          active: event.target.checked
        }
      }
      return task      
    })    

    setTasks(altertask)

  }


  return (
    <>
      <header className={styles.header}>
        <img src={rocket}></img>
        <h1 className={styles.h1cm}>to</h1>     
        <h1 className={styles.h1sm}>do</h1>
      </header>

      <div className={styles.central}>
        <div className={styles.form}>
          <form onSubmit={handleAddTask}>
            <input name="name" onChange={handleTaskChange} value={newTask}></input>
            
            <button type='submit'>Criar</button>
          </form>
        </div>
      </div>

      <div className={styles.inferior}>
        <div className={styles.headertot}>
          <div >
            <p>Tarefas criadas: {tasks.length}</p>
          </div>
          <div></div>
          <div className={styles.totais}>
            <p>Concluídas: {tasks.filter(task => task.active).length} de {tasks.length}</p>
          </div>
        </div>        

        {
        tasks.length !== 0 ? (
          tasks.map((task) => {
          return (
            <div className={styles.task}>
              <div>
                <input id={task.id} type='checkbox' checked={task.active} onChange={handleVerCheck} ></input>
                <h2>{task.name}</h2>
              </div>
              <button id={task.id} onClick={handleDeleteTask}>Excluir</button>
            </div>
          )
          
          }
          
          )
        ) : (
          <h1>Nenhuma tarefa cadastrada.</h1>
        )        
        }
      </div>

    </>
  )
}

export default App
