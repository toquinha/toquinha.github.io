import React from 'react';
import './App.css';
import Header from './components/Header'
import Main from './components/Main'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';


class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
