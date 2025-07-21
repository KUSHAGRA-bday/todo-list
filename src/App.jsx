import { useState, useEffect } from 'react'
import Navbar from './components/navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {

  // Initialize from localStorage
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState(() => {
    const todoString = localStorage.getItem("todos");
    return todoString ? JSON.parse(todoString) : [];
  });
  const [showFinished, setshowFinished] = useState(() => {
    const showFinishedString = localStorage.getItem("showFinished");
    return showFinishedString ? JSON.parse(showFinishedString) : false;
  });

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Save showFinished to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("showFinished", JSON.stringify(showFinished));
  }, [showFinished]);

  const toggleFinished = () => {
    setshowFinished(!showFinished)
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)
    let newtodos = todos.filter(item => item.id !== id);
    settodos(newtodos)
  }
  const handledelete = (e, id) => {
    if (confirm(`are you sure to delete`)) {
      let newtodos = todos.filter(item => item.id !== id)
      settodos(newtodos)
    }
  }

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, iscompleted: false }])
    settodo("")
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
  }

  return (
    <>
      <Navbar />
      <div className="div container mx-auto my-7 rounded-xl p-5 min-h-[80vh] w-[90vw] max-w-full sm:max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
        <div className="addtodo">
          <h2 className='text-3xl sm:text-4xl font-bold text-center text-stone-50 font-serif'>Add to do</h2>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-0 sm:justify-center mt-4">
            <input
              onChange={handlechange}
              value={todo}
              type="text"
              placeholder='write here!'
              className='w-full sm:w-80 rounded-3xl py-2 px-3 mb-2 sm:mb-0'
            />
            <button
              onClick={handleAdd}
              disabled={todo.length < 1}
              className='bg-violet-600 hover:bg-indigo-900 text-sm hover:font-extrabold rounded-lg sm:mx-6 my-2 sm:my-0 p-3 py-1 text-white font-bold cursor-pointer w-full sm:w-auto'
            >
              Add
            </button>
          </div>
        </div>
        <div className="flex items-center mt-4">
          <input onChange={toggleFinished} type="checkbox" checked={showFinished} className='cursor-pointer' />
          <span className='text-white ml-2'>Show Finished</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-stone-50 font-serif pt-4">Task to do</h2>
        <div className="todos">
          {todos.map(item => {
            return (showFinished || !item.iscompleted) && (
              <div key={item.id} className="todo flex flex-col sm:flex-row justify-between text-white items-center my-3 p-3 bg-slate-600 rounded-lg">
                {/* checkbox */}
                <div className='flex gap-5 my-2 items-center w-full sm:w-auto'>
                  <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.iscompleted} />
                  <div className={item.iscompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="buttons flex h-full gap-2 mt-2 sm:mt-0">
                  <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-600 hover:bg-indigo-900 rounded-lg text-sm p-3 py-1 text-white font-bold'>Edit</button>
                  <button onClick={(e) => { handledelete(e, item.id) }} className='bg-violet-600 hover:bg-indigo-900 rounded-lg text-sm p-1 py-1 text-white font-bold'>Delete</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App