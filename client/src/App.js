import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);

  let node;

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((responseData) => setData(responseData));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {!data ? (
          <p>Loading...</p>
        ) : (
          <>
            <p> {data.title}</p>
            <p> {data.description}</p>
            <a> {data.link}</a>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
