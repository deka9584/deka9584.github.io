import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import './App.css';
import WsHeader from './components/WsHeader';
import { GlobalProvider } from './context/Context';
import RouteMap from './constants/RouteMap';
import PongPage from './pages/PongPage';
import WsFooter from './components/WsFooter';
import ProjectsPage from './pages/ProjectsPage';

function App() {
  return (
    <GlobalProvider>
      <div className='app-container'>
        <WsHeader/>
        <Routes>
          <Route path={RouteMap.HOME} element={<HomePage />} />
          <Route path={RouteMap.PONG} element={<PongPage />} />
          <Route path={RouteMap.PROJECTS} element={<ProjectsPage />} />
        </Routes>
        <WsFooter/>
      </div>
    </GlobalProvider>
  );
}

export default App;
