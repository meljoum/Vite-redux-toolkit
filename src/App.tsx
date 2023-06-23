//import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { amountAdded, counterState, decremented, incremented } from './featuers/counter/counterSlice'
import './App.css'
import { useState } from 'react'
import { blocState, incrementBlog } from './featuers/blog/blogSlice'
//It's form Dogs Api
import { useFetchBreedsQuery, useDeleteDogMutation } from './featuers/dogs-api/dogs_api_slice'
import { useFetchPokemonQuery } from './featuers/pokemon-api/pokemon_api_slice'

function App() {
  //*const [count, setCount] = useState(0)

  //*const handleChange = () => setCount((count) => count + 1)


  // we get the state from redux
  const count =  useAppSelector(counterState)
  const blogFive = useAppSelector(blocState)
  const dispatch = useAppDispatch();

  //It's to use Dogs Api - with RTK Query that save all request in cache to don't reload every time

  const [numDogs, setNumDogs] = useState(10);
  const { data : dogApiData = [], isFetching } = useFetchBreedsQuery(numDogs);

  //It's for Pokemon Api

  /* const [name]*/
  const { data : pokemoneApiData, error, isLoading: isPokemonLoading } = useFetchPokemonQuery();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleChangeNumDogs(e: any) {
    setNumDogs(Number(e.target.value))
  }

  // Delete Dog
  const [isLoading, setIsLoading] = useState(false);

  const [deleteDog] = useDeleteDogMutation();
  const dogIdToDelete = 1;

  const handleDelete = async () => {
    
    setIsLoading(true);

    deleteDog(dogIdToDelete)
      .unwrap() // Handle the successful response
      .then(() => {
        console.log('Dog deleted successfully');
      })
      .catch((error: any) => {
        console.log('Failed to delete dog:', error);
        
      })
      .finally(() => {
        setIsLoading(false);
      })
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

  if(isFetching) {
    return <div className="lds_ellipsis"><div></div><div></div><div></div><div></div></div>;
  }

  console.log('POKKKK :', pokemoneApiData?.results);
  console.log('Doooogs :', dogApiData);
  return (
    <div className="container">
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
          <select value={numDogs} onChange={handleChangeNumDogs}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="30">30</option>
          </select>
          <p>Number of dogs fetched : {dogApiData.length}</p>

          <button onClick={handleDelete} disabled={isLoading}>
            {isLoading ? 'Deleting...': 'Delete Dog'}
          </button>

          <div className='list_dogs'>
            {(!isFetching) ?
              <table>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Picture</th>
                  </tr>
                </thead>
                <tbody>
                  {dogApiData.map((breed) => (
                    <tr key={breed.id}>
                      <td>{breed.id}</td>
                      <td>{breed.name}</td>
                      <td>
                        <img src={breed.image.url} alt={breed.name} width={250} height={250} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table> : 
              <div className='lds_ellipsis'><div></div><div></div><div></div><div></div></div>
            }
          </div>
          
          <div className='list_pokemon'>
            <h3>Liste of pokemon :</h3>
            <p>Number of pokemon fetched : {pokemoneApiData?.results.length}</p>
            
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Url</th>
                </tr>
              </thead>
              <tbody>
                { error ? (
                    <tr>
                      <td>Oh no, there was an error</td>
                    </tr>
                  ): isPokemonLoading ? (
                    <tr>
                      <td>Loading...</td>
                    </tr>
                  ): pokemoneApiData?.results ?(
                      pokemoneApiData.results.map((poke) => (
                        <tr key={poke.name}>
                          <td>{poke.name}</td>
                          <td>{poke.url}</td>
                        </tr>
                      )) 
                  )
                      
                : null }
                  
              </tbody>
            </table>
          </div>
        </div>
        
    
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
