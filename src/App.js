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
import { getLocalUser, isTokenExist } from './services/token';
import EditProfile from './pages/EditProfile';
import NotFound from './pages/NotFound';
import { io } from 'socket.io-client';
import { setSocket } from './redux/features/chatSlice';
import { useDispatch } from 'react-redux';
import { joinRoom, receiveChat, receiveNotif } from './services/socket';
import { requestPermission, showNotification } from './services/notification';
import Notifications from './pages/Notifications';
import PrivateRoutes from './utils/PrivateRoutes';
import Followers from './pages/Followers';
import Contacts from './pages/Contacts';

function App() {
  const isLogin = isTokenExist();
  const dispatch = useDispatch();

  if (isLogin) {
    requestPermission();

    const socket = io(process.env.REACT_APP_API_URL);
    const { id } = getLocalUser();

    joinRoom(socket, id);

    socket.on('connect', () => {
      dispatch(setSocket(socket));
    });

    receiveNotif(socket, ({ text, username }) => {
      showNotification({
        title: '',
        options: {
          body: `${username} ${text}`,
        },
        url: `${window.location.origin}/notifications`,
      });
    });

    receiveChat(socket, ({ chat, fromUsername, from }) => {
      showNotification({
        title: fromUsername,
        options: {
          body: chat,
        },
        url: `${window.location.origin}/message/${from}/chat`,
      });
    });
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<PrivateRoutes isLogin={isLogin} />}>
        <Route path="/" element={<Home />} />
        <Route path="/signup-photo" element={<SignupPhoto />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/profile" element={<OwnProfile />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/message" element={<Message />} />
        <Route path="/message/:userId/chat" element={<Chat />} />
        <Route path="/post/:postId" element={<PostId />} />
        <Route path="/post/:postId/comments" element={<Comments />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route
          path="/:userId/followers"
          element={<Followers type="followers" />}
        />
        <Route
          path="/:userId/following"
          element={<Followers type="following" />}
        />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
