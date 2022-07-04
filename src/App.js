import { Routes, Route } from 'react-router-dom';
import Explore from './pages/Explore';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import SignupPhoto from './pages/SignupPhoto';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signup-photo" element={<SignupPhoto />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/explore" element={<Explore />} />
    </Routes>
  );
}

export default App;
