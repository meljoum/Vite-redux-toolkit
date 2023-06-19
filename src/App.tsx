//import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { amountAdded, counterState, decremented, incremented } from './featuers/counter/counterSlice'
import './App.css'
import { useState } from 'react'
import { blocState, incrementBlog } from './featuers/blog/blogSlice'
//It's form Dogs Api
import { useFetchBreedsQuery } from './featuers/dogs-api/dogs_api_slice'

function App() {
  //*const [count, setCount] = useState(0)

  //*const handleChange = () => setCount((count) => count + 1)


  // we get the state from redux
  const count =  useAppSelector(counterState)
  const blogFive = useAppSelector(blocState)
  const dispatch = useAppDispatch();

  //It's to use Dogs Api - with RTK Query that save all request in cache to don't reload every time

  
  const [numDogs, setNumDogs] = useState(10);
  const { data = [], isFetching } = useFetchBreedsQuery(numDogs);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleChangeNumDogs(e: any) {
    setNumDogs(Number(e.target.value))
  }

  //---------------------------------------------------------------
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
        <div>
          <h2>Blog Reducer</h2>
          <button onClick={addBlogNum}>+ 5</button>
          <p>The blog number : {blogFive.num}</p>
        </div>

        //* It's for Useing Dogs Api data with Redux
        <div>
          <h2>Dogs Api - Reducer</h2>
          <h4>Choose num of dogs would you fetch :</h4>
          <select name="" id="" value={numDogs} onChange={handleChangeNumDogs}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="30">30</option>
          </select>
          <p>Number of dogs fetched : {data.length}</p>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Picture</th>
              </tr>
            </thead>
            <tbody>
              {data.map((breed) => (
                <tr key={breed.id}>
                  <td>{breed.id}</td>
                  <td>{breed.name}</td>
                  <td>
                    <img src={breed.image.url} alt={breed.name} width={250} height={250} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
    
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
