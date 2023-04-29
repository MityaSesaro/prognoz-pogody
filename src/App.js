import './App.scss';
import { useState } from 'react';

import Search from './Search';
import City from './City';

function App() {
  return (
    <div className="App">
      <Search />
      <City />
    </div>
  );
}

export default App;
