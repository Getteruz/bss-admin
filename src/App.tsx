import { useState } from 'react';
import './App.css';
import Home from './app/home/home';
import GlobalContext from './shared/contexts/GlobalContext';

import '../node_modules/@syncfusion/ej2-base/styles/material.css';
import '../node_modules/@syncfusion/ej2-buttons/styles/material.css';
import '../node_modules/@syncfusion/ej2-popups/styles/material.css';
import '../node_modules/@syncfusion/ej2-react-navigations/styles/material.css';


function App() {

  const [page, setPage] = useState<any>('Главная')

  const hendleSetPage = (value: any): any => {
    setPage(value);

  };
  return (
    <>
      <GlobalContext.Provider value={{ page, setPage: hendleSetPage }}>
        <Home />
      </GlobalContext.Provider>


    </>
  );
}

export default App;
