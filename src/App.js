import { Routes, Route } from 'react-router-dom';
import AddPost from './pages/AddPost';
import Explore from './pages/Explore';
import Home from './pages/Home';
import Login from './pages/Login';
import Message from './pages/Message';
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
      <Route path="/add-post" element={<AddPost />} />
      <Route path="/message" element={<Message />} />
    </Routes>
  );
}

export default App;
