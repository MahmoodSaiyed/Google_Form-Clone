import './App.css';
import Centertabs from './components/Centretabs';
import Formheader from './components/Formheader';
import Header from './components/Header';
import Maincomponent from './components/Maincomponent';
import Questionform from './components/Questionform';
import Template from './components/Template';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Userform from './components/Userform';
import Submitted from './components/Submitted';

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path='/form/:id' element={<Layout1/>}/>
          <Route path="/" element={<Layout />}/>
          <Route path="/response" element={<Userform />}/>
          <Route path="/submitted" element={<Submitted />}/>


        </Routes>
      </Router>
    </div>
  );
}

function Layout() {
  return (
    <>
      <Header />
      <Template />
      <Maincomponent/>
    </>
  );
}
function Layout1() {
  return (
    <>
    <Formheader/>
    <Centertabs/>
    <Questionform/>
    </>
  );
}

export default App;