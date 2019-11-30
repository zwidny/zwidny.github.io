import React from 'react';
import ReactDOM from 'react-dom';
import Navigation from "./components/Navigation.jsx";

class App extends React.Component {
  render() {
    return (
      <div>
        <Navigation/>
      </div>
    )
  }
}

// --------------------  app  --------------------------
ReactDOM.render(<App/>, document.getElementById('app'))
