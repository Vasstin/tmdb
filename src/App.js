import PopularTabs from '../src/components/Popular/PopularTabs';
import Navigation from '../src/components/Navigation/Navigation';
import './App.css';

import { styled } from '@mui/material/styles';


function App() {

  
  return (
    <div className="App">
      <Navigation/>
      <PopularTabs />
    </div>
  );
}

export default App;
