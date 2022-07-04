import HomeBar from '../components/HomeBar';
import Navbar from '../components/NavBar';
import Post from '../components/Post';

function Home() {
  return (
    <>
      <Navbar />
      <HomeBar />
      <Post />
      <Post />
      <Post />
    </>
  );
}

export default Home;
