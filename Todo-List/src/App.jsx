import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "./App.css"

function App() {
  const [Todo, setTodo] = useState("")
  const [Todos, setTodos] = useState([])
  const [showFinshed, setshowFinished] = useState(true)

  useEffect(() => {
    let s = localStorage.getItem("todos")
    // console.log(s)
    if(s){
      let ab = JSON.parse(s)
      setTodos(ab)
    }
  }, [])
  
  
  // const saveLS = ()=>{
  //   localStorage.setItem("todos", JSON.stringify(Todos))
  //   console.log(12)
  // }
  
  const handleEdit = (e, id)=>{
    document.querySelector(".focus").focus()
    let index = Todos.findIndex(item=>{
      return item.id==id
    })
    setTodo(Todos[index].Todo)
    let newTodos = Todos.filter(ele=>{
      return ele.id!==id
    })
    localStorage.setItem("todos", JSON.stringify(newTodos))
    setTodos(newTodos)
  }
  const handleDele = (e, id)=>{
    // console.log(id)
    let newTodos = Todos.filter(ele=>{
      return ele.id!==id
    })
    localStorage.setItem("todos", JSON.stringify(newTodos))
    setTodos(newTodos)
    
  }
  const handleAdd = ()=>{
    setTodos([...Todos, {id: uuidv4(), Todo, isCompleted: false}])
    setTodo("")
    localStorage.setItem("todos", JSON.stringify([...Todos, {id: uuidv4(), Todo, isCompleted: false}]))
  }
  const handleChange = (e)=>{
    setTodo(e.target.value)
  }
  const handleCheckbox = (e)=>{
    let id = e.target.name
    // console.log(id)
    let index = Todos.findIndex(item=>{
      return item.id==id
    })
    let newTodos = [...Todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    localStorage.setItem("todos", JSON.stringify(newTodos))
  }
  const Toggle = ()=>{
    setshowFinished(!showFinshed)
  }
  return (
    <>
      <Navbar />
      {/* <div className="md:container mx-auto bg-violet-200 rounded-xl p-5 my-3 min-h-[90vh] md:w-[55vw]"> */}
      <div className="md:container mx-auto bg-c_white backdrop-blur-[10px] border rounded-xl p-5 my-3 min-h-[90vh] md:w-[55vw]">
        <h1 className='text-center font-bold text-[25px] setfont'>iTask manage Your Tasks</h1>
        <div className="addtodo my-4 flex flex-col gap-2">
          <h2 className='text-[20px] font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={Todo} type="text" className='focus w-full rounded-full py-1 shadow-xl bg-slate-50 border-slate-400'/>
          <div className='flex justify-center'>

          <button onClick={handleAdd} disabled={!Todo.length} className='wow font-bold w-[180px] cursor-pointer'>Save</button>
          </div>
        </div>
        <input onChange={Toggle} type="checkbox" checked={showFinshed} className='w-10 mb-3 scale-125'/> <span className='text-[20px]'>Show Finshed Todos</span>
        <h2 className='text-[20px] font-bold'>Your Todos:</h2>
        <div className="todos">
          {Todos.length===0 && <div>No work</div>}
          {Todos.map(item=>{
           return ((showFinshed||!item.isCompleted) && <div key={item.id} className="todo flex items-center mt-2 justify-between w-full">
            <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} className='scale-125'/>
            <div className={item.isCompleted?"line-through":""}>{item.Todo}</div>
            <div className="btns">
              <button onClick={(e)=>handleEdit(e,item.id)} className='wow bg-c_white text-slate-700 p-3 py-1 rounded-md mx-2 hover:bg-violet-900 font-bold' ><FaEdit /></button>
              <button onClick={(e)=>handleDele(e,item.id)} name={item.id} className='wow bg-c_white text-slate-700 p-3 py-1 rounded-md mx-2 hover:bg-violet-900 font-bold' ><MdDelete /></button>
            </div>
          </div>)
          })}
        </div>
      </div>
    </>
  )
}

export default App
