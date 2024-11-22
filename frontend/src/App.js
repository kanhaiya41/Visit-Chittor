import './App.css';
import Home from './component/Home';
import { Routes, Route } from 'react-router-dom';
import Tour from './component/Tour';
import Contact from './component/Contact';
import About from './component/About';
import PlacePage from './component/User/PlacePage';
import GuideBooking from './component/User/GuideBooking';
import AdminPanel from './component/admin/AdminPanel';
import Manager from './component/admin/Manager';
import ManagerPanel from './component/manager/ManagerPanel';
import Employee from './component/manager/Employee';
import WorkAssign from './component/manager/WorkAssign';
import Guide from './component/guide/Guide';
import CompleteWork from './component/guide/CompleteWork';
import { Toaster } from 'react-hot-toast';

function App() {

  const ary = ['fort', 'sawariya_ji', 'shani_maharaj', 'amba_mata', 'matrikundiya', 'aavri_mata', 'seeta_mata', 'diwana_shah', 'jhatla_mata', 'dams', 'rawatbhata', 'kapasan', 'villages', 'hotels', 'hospitals'];

  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tour' element={<Tour />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/AdminPanel' element={<AdminPanel />} />
        <Route path='/ManagerPanel' element={<ManagerPanel />} />
        <Route path='/GuidePanel' element={<Guide />} />
        <Route path='/manager-info' element={<Manager />} />
        <Route path='/employee-info' element={<Employee />} />
        <Route path='/Employeework' element={<WorkAssign />} />
        <Route path='/work-complete' element={<CompleteWork />} />
        {
          ary.map(curElemi => (
            <>
              <Route path={`/tour/${curElemi}`} element={<PlacePage />} />
              <Route path={`/tour/${curElemi}/booking`} element={<GuideBooking />} />
            </>
          ))
        }
      </Routes>
    </>
  );
}

export default App;
