import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AddPost from './pages/AddPost';
import Chat from './pages/Chat';
import Explore from './pages/Explore';
import Home from './pages/Home';
import Login from './pages/Login';
import Message from './pages/Message';
import OwnProfile from './pages/OwnProfile';
import Comments from './pages/Comments';
import PostId from './pages/PostId';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import SignupPhoto from './pages/SignupPhoto';
import { isTokenExist } from './services/token';
import EditProfile from './pages/EditProfile';
import NotFound from './pages/NotFound';

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
      <Route
        path="/profile/:userId"
        element={isLogin ? <Profile /> : <Login />}
      />
      <Route path="/profile" element={isLogin ? <OwnProfile /> : <Login />} />
      <Route path="/explore" element={isLogin ? <Explore /> : <Login />} />
      <Route path="/add-post" element={isLogin ? <AddPost /> : <Login />} />
      <Route path="/message" element={isLogin ? <Message /> : <Login />} />
      <Route
        path="/message/:userId/chat"
        element={isLogin ? <Chat /> : <Login />}
      />
      <Route path="/post/:postId" element={isLogin ? <PostId /> : <Login />} />
      <Route
        path="/post/:postId/comments"
        element={isLogin ? <Comments /> : <Login />}
      />
      <Route
        path="/edit-profile"
        element={isLogin ? <EditProfile /> : <Login />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
