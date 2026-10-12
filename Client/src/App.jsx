import './App.css';
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home"
import Dashavatar from './pages/Dashavatar';
import AvatarDetails from "./pages/AvatarDetails";
import Temples from './pages/Temples';
import TemplesDetail from "./pages/TemplesDetails";
import VishnuPuran from "./pages/VishnuPuran";
import StoryDetails from "./pages/StoryDetails";
import Signup from './pages/Signup';
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App(){ 
  return ( 
    <Routes>
        <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/dashavatar" element={<Dashavatar/>}></Route>
        <Route path="/dashavatar/:name" element={<AvatarDetails />} />
        <Route path='/temples' element={<Temples/>}/>
        <Route path="/temples/:name" element={<TemplesDetail />} />
        <Route path="/vishnu-puran" element={<VishnuPuran />} />
        <Route path="/vishnu-puran/:id" element={<StoryDetails/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
    </Route> </Routes> ); 
    }
export default App;