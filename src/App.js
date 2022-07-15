import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AddPost from './pages/AddPost';
import Chat from './pages/Chat';
import Explore from './pages/Explore';
import Home from './pages/Home';
import Login from './pages/Login';
import Message from './pages/Message';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import SignupPhoto from './pages/SignupPhoto';
import { isTokenExist } from './services/token';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    setIsLogin(isTokenExist());
  }, []);

  return (
    <Routes>
      <Route path="/" element={isLogin ? <Home /> : <Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/signup-photo"
        element={isLogin ? <SignupPhoto /> : <Login />}
      />
      <Route path="/profile" element={isLogin ? <Profile /> : <Login />} />
      <Route path="/explore" element={isLogin ? <Explore /> : <Login />} />
      <Route path="/add-post" element={isLogin ? <AddPost /> : <Login />} />
      <Route path="/message" element={isLogin ? <Message /> : <Login />} />
      <Route path="/message/chat" element={isLogin ? <Chat /> : <Login />} />
    </Routes>
  );
}

export default App;
