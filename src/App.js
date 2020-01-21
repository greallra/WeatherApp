import React from 'react';
import Section1 from './Sections/Section1';
import './App.css';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        
        {/* Load section 1 by default */}
        <Section1 />
      </div>
    );
  }
  
}

export default App;
