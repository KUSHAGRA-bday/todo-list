import { useState, useEffect } from 'react'
import Navbar from './components/navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished, setshowFinished] = useState(false)


  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])


  const savetols = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = () => {
    setshowFinished(!showFinished)
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)
    let newtodos = todos.filter(
      item => {
        return item.id !== id
      }
    );
    settodos(newtodos)
    savetols()
  }
  const handledelete = (e, id) => {


    if (confirm(`are you sure to delete`)) {
      let index = todos.findIndex(item => {
        return item.id === id;
      })
      let newtodos = todos.filter(
        item => {
          return item.id !== id
        }
      )
      settodos(newtodos)

    } else {

    }

    savetols()
  }

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, iscompleted: false }])
    settodo("")
    savetols()
  }
  const handlechange = (e) => {
    settodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newtodos = [...todos];
    newtodos[index].iscompleted = !newtodos[index].iscompleted;
    settodos(newtodos)
    savetols()
  }


  return (
    <>
      <Navbar />
      <div className="div container mx-auto  my-7 rounded-xl p-5 min-h-[80vh] max-w-[35vw] " >
        <div className="addtodo">
          <h2 className='text-4xl font-bold text-center from-neutral-950 font-serif'>Add to do</h2>

          <input onChange={handlechange} value={todo} type="text" placeholder='write here!' className='w-80 rounded-3xl py-1 px-3' />
          <button onClick={handleAdd} disabled={todo.length < 1} className='bg-violet-600 hover:bg-indigo-900  text-sm hover:font-extrabold rounded-lg mx-6 my-2 p-3 py-1 text-white font-bold'>Add</button>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished} />ShowFinished
        <h2 className="text-3xl font-bold text-center from-neutral-950 font-serif pt-4">Task to do</h2>
        <div className="todos">
          {todos.map(item => {

            return (showFinished||!item.iscompleted) && <div key={item.id} className="todo flex justify-between">
              {/* checkbox */}
              <div className='flex gap-5 my-2'> <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.iscompleted} />
                <div className={item.iscompleted ? "line-through" : ""}>{item.todo}</div></div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-600 hover:bg-indigo-900 rounded-lg ml-3 text-sm my-1 p-3 py-1 text-white font-bold'>Edit</button>
                <button onClick={(e) => { handledelete(e, item.id) }} className='bg-violet-600 hover:bg-indigo-900 rounded-lg mx-1 text-sm my-1 p-1 py-1 text-white font-bold'>Delete</button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
