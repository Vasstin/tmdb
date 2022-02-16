import PopularTabs from '../src/components/Popular/PopularTabs';
import TrandingTabs from '../src/components/Popular/TrandingTabs';
import Navigation from '../src/components/Navigation/Navigation';
import './App.css';

import { styled } from '@mui/material/styles';


function App() {
  const Wrapper = styled('div')({
    margin: '0 5%'
  })
  
  return (
    <div className="App">
      <Navigation/>
      <Wrapper>
        <PopularTabs />
        <TrandingTabs />
      </Wrapper>
    </div>
  );
}

export default App;
