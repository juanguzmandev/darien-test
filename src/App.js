import React, {useState, useEffect, useRef} from 'react';
import Header from './Header/';
import Loading from './Loading/';
import Results from './Results/';
import Error from './Error/';
import Footer from './Footer/';


function App() {

  const [nations, setNations] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [voidName, setVoidName] = useState(false);
  const [voidResults, setVoidResults] = useState(false);

  const name = useRef('');

  const voidNameFilled = () => {

      setVoidResults(true);
      setVoidName(true);
      setError(true);
      setLoading(false);

  };

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

          } else {

            setError(false);
            setVoidResults(false);
            setVoidName(false);

            endpoint.state(data);

          }

          break;
      }

      setLoading(false);

    });

  };

  const findResults = name => {

    if (name != '') {

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

          {(loading && !error && !voidName && !voidResults) && <Loading />}

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
