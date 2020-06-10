import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const GET_PLATFORMS = gql`
  {
    platforms {
      name
    }
  }
`;

function App() {
  const [count, setCount] = useState(0);
  const { loading, error, data } = useQuery(GET_PLATFORMS);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {loading && <div>Loading</div>}
        {error && <div>Error</div>}
        {data && data.platforms.map(({ name }: { name: string }) => <div>{name}</div>)}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {count}
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </header>
    </div>
  );
}

export default App;
