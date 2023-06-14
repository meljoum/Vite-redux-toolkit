//import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { amountAdded, counterState, decremented, incremented } from './featuers/counter/counterSlice'
import './App.css'
import { useState } from 'react'
import { blocState, incrementBlog } from './featuers/blog/blogSlice'

function App() {
  //*const [count, setCount] = useState(0)

  //*const handleChange = () => setCount((count) => count + 1)


  // we get the state from redux
  const count =  useAppSelector(counterState)
  const blogFive = useAppSelector(blocState)
  const dispatch = useAppDispatch();

  const [incrementAmount, setIncrementAmount] = useState('2')
  const incrementValue = Number(incrementAmount) || 0

  function handleIncrementCounter() {
    dispatch(incremented());
  }

  function handleDecrementedCounter() {
    dispatch(decremented());
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleChange(e: any) {
    setIncrementAmount(e.target.value)
  }

  function handleAmountAdded() {
    dispatch(amountAdded(incrementValue));
  }

  //blog
  function addBlogNum() {
    dispatch(incrementBlog());
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleIncrementCounter}> + </button>
        <button onClick={handleDecrementedCounter}> - </button>
        <div className="input-txt h-8 w-1/2 my-auto mx-2">
          <input type="number" value={incrementAmount} onChange={handleChange} name="" id="" />
        </div>
        <p>The count is : {count.value}</p>
        
        <button onClick={handleAmountAdded}>Amount Added</button>

        <h1>Blog Reducer</h1>
        <button onClick={addBlogNum}>+ 5</button>
        <p>The blog number : {blogFive.num}</p>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
