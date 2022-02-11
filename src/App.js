import React, {useState, useRef} from 'react';

import Header from './Header/'; // Header component - This component holds the app title
import Loading from './Loading/'; // Loading component - This component is used as a loading skeleton
import Results from './Results/'; // Results component - This component receives and display the API data
import Error from './Error/'; // Error component - This component is used to manage and display error states
import Footer from './Footer/'; // Footer component - This component holds my name and the API docs references


function App() {

  // API Data States

  const [nations, setNations] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState();

  // Application States

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [voidName, setVoidName] = useState(false);
  const [voidResults, setVoidResults] = useState(false);

  // State for lock the loading

  const [lockedLoading, setLockedLoading] = useState(false);

  // useRef hook to link the input of the text field

  const name = useRef('');

  /*
    
    voidNameFilled - This function is triggered when a change occurs
    on the input field. This function just clean the <Results />
    component and any other error or loading component to clean the
    screen. This function doesn't need any parameter

  */

  const voidNameFilled = () => {

      setVoidResults(true);
      setVoidName(true);
      setError(true);
      setLoading(false);

      setLockedLoading(false);

  };

  /*

    lookForResults - This function is triggered from the findResults 
    function. lookForResults makes the requests and check for error
    states. This function just need the 'endpoint' object (JSON object
    with the endpoint information) as a parameter and returns the 
    age, nationalities and genre information

  */

  const lookForResults = endpoint => {
    fetch(endpoint.url)
    .then(response => {

      if (response.status === 200) {

        return response.json();

      } else {

        setError(true);
        setVoidName(false);
        setVoidResults(false);

      }

    })
    .then(data => {

      switch(endpoint.name) {

        case 'age':

          if (data.age === null) {

            setError(true);
            setVoidResults(true);
            setVoidName(false);

            setLockedLoading(true);
            
          } else {

            setError(false);
            setVoidResults(false);
            setVoidName(false);

            endpoint.state(data);

          }

          break;

        case 'nations':

          if (data.country === []) {

            setError(true);
            setVoidResults(true);
            setVoidName(false);

            setLockedLoading(true);
            
          } else {

            setError(false);
            setVoidResults(false);
            setVoidName(false);

            endpoint.state(data);

          }

          break;

        case 'gender':

          if (data.gender === null) {

            setError(true);
            setVoidResults(true);
            setVoidName(false);

            setLockedLoading(true);

          } else {

            setError(false);
            setVoidResults(false);
            setVoidName(false);

            endpoint.state(data);

          }

          break;

        default:

          break;
      }

      setLoading(false);

    });

  };

  /*

    findResults - This function triggers when button is clicked. This arrow function
    checks firstly if there's something typed on the text input field and then iterates
    trough an array of API endpoints to fetch the needed data. This function need the
    user's name as a parameter

  */

  const findResults = name => { 

    if (name !== '') {

      setVoidName(false);
      setError(false);
      setVoidResults(false);
      setLoading(true);

      setTimeout(() => {

        const endpoints = [
        {
          url: 'https://api.nationalize.io?name='+name,
          state: setNations,
          name: 'nations'
        },
        {
          url: 'https://api.agify.io?name='+name,
          state: setAge,
          name: 'age'
        },
        {
          url: 'https://api.genderize.io?name='+name,
          state: setGender,
          name: 'gender'
        }
      ];

      endpoints.map(endpoint => lookForResults(endpoint));
      }, 500);

    } else {

      setLoading(false);
      setVoidResults(false);
      setVoidName(true);
      setError(true);

    }

  };

  return (
    <React.Fragment>
      <Header>
        <header className="flex justify-center m-0 shadow-md w-full">
          <h1 className="my-10">Your Possible ID 👻</h1>
        </header>
      </Header>
      <section className="flex flex-col items-center justify-center my-4">
        <input type="text" ref={name} name="name" placeholder="Name" className="w-1/4 flex justify-center m-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={voidNameFilled}></input>
        <button type="button" className="w-1/4 m-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={() => findResults(name.current.value)}>Submit</button>
        <section className="flex flex-wrap justify-center my-20 w-full">

          {(!lockedLoading && loading && !error && !voidName && !voidResults) && <Loading />}

          {(!loading && error && voidName && !voidResults && (name.current.value === '')) && <Error text="Name is void. Please, type in your name" />}
          {(!loading && error && !voidName && voidResults) && <Error text="There's no hits for this name. Let's try another one! 🥪" />}

          {(!loading && error && !voidName && !voidResults) && <Error text="An error has occurred. Please, try again" />}

          {(!loading && !error && !voidName && !voidResults && age && gender && nations && (name.current.value !== '')) && <Results age={age} gender={gender} nations={nations} />}

        </section>
      </section>
      <Footer>
        <footer className="bg-white fixed flex flex-col items-center justify-center m-0 shadow-2xl w-full" style={{bottom: '0'}}>
          <span className="my-4">
            <a href="https://nationalize.io/" className="text-blue-300 hover:text-blue-500">nationalize.io</a> |  
            <a href="https://genderize.io/" className="text-blue-300 hover:text-blue-500"> genderize.io</a> |  
            <a href="https://agify.io/" className="text-blue-300 hover:text-blue-500"> agify.io</a>
          </span>
          <h1 className="my-5">With ❤️ by Juan Guzmán</h1>
        </footer>
      </Footer>
    </React.Fragment>
  );
}

export default App;
