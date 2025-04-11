import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])

  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    if (todostring) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])

  const savetols = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos))
  }


  const handleedit = (e, id) => {
    const t = todos.find(item => item.id === id)
    settodo(t.todo)
    const newTodos = todos.filter(item => item.id !== id)
    settodos(newTodos)
    savetols(newTodos)
  }


  const handledelete = (e, id) => {
    const newTodos = todos.filter(item => item.id !== id)
    settodos(newTodos)
    savetols(newTodos)
  }

  const handleadd = () => {
    if (todo.trim() === "") return;
    const newTodos = [...todos, { id: uuidv4(), todo, iscomplete: false }]
    settodos(newTodos)
    settodo("")
    savetols(newTodos)
  }

  const handlechange = (e) => {
    settodo(e.target.value)
  }

  const handlecheckbox = (e) => {
    const id = e.target.name
    const newTodos = todos.map(item =>
      item.id === id ? { ...item, iscomplete: !item.iscomplete } : item
    )
    settodos(newTodos)
    savetols(newTodos)
  }


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleadd()
    }
  }

  return (
    <>

      <Navbar />
      <div className='flex justify-center'>

        <div className="md:container md:mr-5 md:ml-5 md:w-1/2 md:my-5 md:rounded-xl p-5 bg-violet-200 min-h-[80vh] justify-center items-center">
          <h1 className='text-2xl font-bold text-center font-mono mb-3'>SparkNotes - The best app for managing your todos</h1>
          <hr className='invert'/>
          <div className="addtodo my-5">
            <h1 className="text-lg font-bold mb-3 flex justify-center ">ADD A TODO</h1>
            <div className='flex gap-2 items-center justify-center'>
            <input
              onChange={handlechange}
              onKeyDown={handleKeyPress}
              value={todo}
              type="text"
              className='w-full border-2 border-black rounded-lg pl-1 py-1'
            />
            <button onClick={handleadd} className='bg-violet-700 hover:bg-violet-900 text-white p-3 py-1 rounded-lg'>Save</button>
          </div>
          </div>

          <h2 className='text-lg font-bold flex justify-center  '>YOUR TODOS</h2>
          <div className="todos flex flex-col w-auto font-medium">
            {todos.length === 0 && <div className='my-3 flex flex-col items-center w-auto text-5xl text-red-700 '>No todos to display</div>}

            {todos.map((item) => {
              return (
                <div
                  key={item.id}
                  className="todo flex flex-col sm:flex-row sm:justify-between sm:items-start my-3 bg-white p-3 rounded-lg shadow-md w-full gap-3"
                >
                  <div className="flex gap-3 w-full ">
                    <input
                      name={item.id}
                      onChange={handlecheckbox}
                      type="checkbox"
                      checked={item.iscomplete}
                      className="mt-1"
                    />
                    <div
                      className={`break-all whitespace-pre-wrap w-full ${item.iscomplete ? "line-through text-gray-500" : ""
                        }`}
                    >
                      {item.todo}
                    </div>

                  </div>
                  <div className="buttons flex gap-3">
                    <button
                      onClick={(e) => handleedit(e, item.id)}
                      className="bg-violet-700 hover:bg-violet-900 text-white p-3 py-1 rounded-lg"
                    >
                     <FaEdit />
                    </button>
                    <button
                      onClick={(e) => handledelete(e, item.id)}
                      className="bg-violet-700 hover:bg-violet-900 text-white p-3 py-1 rounded-lg"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

    </>
  )
}
export default App
