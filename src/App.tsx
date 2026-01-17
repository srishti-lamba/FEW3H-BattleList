import React, {useEffect} from 'react';
import Settings from './components/settings';
import Table from './components/table';
import './App.css';
import allChapters from './db/chapters.json';

function App() {

  // Run once
  useEffect(() => {
    console.log("All Chapters:")
    console.log(allChapters)
  }, [])

  return (
    <div className="App">
      <header className="App-header">
      Test test
      </header>
      <Settings
        allChapters={allChapters}
      />
      <Table
        allChapters={allChapters}
      />
    </div>
  );
}

export default App;