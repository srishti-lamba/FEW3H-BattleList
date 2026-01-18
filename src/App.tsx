import React, {useEffect, useState} from 'react';
import Settings from './components/settings';
import Table from './components/table';
import './App.css';
import allChapters from './db/chapters.json';
import allMissions from './db/missions.json';

function App() {

  const [difficulty, setDifficulty] = useState<number>(1);

  // Run once
  useEffect(() => {
    console.log("All Chapters:")
    console.log(allChapters)
    console.log("All Missions:")
    console.log(allMissions)
  }, [])

  return (
    <div className="App">
      <header className="App-header">
      Test test
      </header>
      <Settings
        allChapters={allChapters}
        difficulty={difficulty} setDifficulty={setDifficulty}
      />
      <Table
        allMissions={allMissions}
        allChapters={allChapters}
        difficulty={difficulty}
      />
    </div>
  );
}

export default App;

