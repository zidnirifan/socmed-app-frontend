import Navbar from '../components/NavBar';
import ExplorePostList from '../components/ExplorePostList';
import SearchNavbar from '../components/SearchBar';

function Explore() {
  return (
    <>
      <Navbar />
      <SearchNavbar />
      <ExplorePostList posts={itemData} />
    </>
  );
}

const itemData = [
  {
    img: 'https://source.unsplash.com/random/?mount',
    title: 'Bed',
  },
  {
    img: 'https://source.unsplash.com/random/?tree',
    title: 'Bed',
  },
  {
    img: 'https://source.unsplash.com/random/?cafe',
    title: 'Bed',
  },
  {
    img: 'https://source.unsplash.com/random/?cat',
    title: 'Bed',
  },
  {
    img: 'https://source.unsplash.com/random/?park',
    title: 'Bed',
  },
  {
    img: 'https://source.unsplash.com/random/?forest',
    title: 'Bed',
  },
  {
    img: 'https://source.unsplash.com/random/?plant',
    title: 'Bed',
  },
  {
    img: 'https://source.unsplash.com/random/?flower',
    title: 'Bed',
  },
  {
    img: 'https://source.unsplash.com/random/?phone',
    title: 'Bed',
  },
  {
    img: 'https://source.unsplash.com/random/?computer',
    title: 'Bed',
  },
  {
    img: 'https://source.unsplash.com/random/?river',
    title: 'Bed',
  },
  {
    img: 'https://source.unsplash.com/random/?cloud',
    title: 'Bed',
  },
  {
    img: 'https://source.unsplash.com/random/?water',
    title: 'Bed',
  },
  {
    img: 'https://source.unsplash.com/random/?waterfall',
    title: 'Bed',
  },
  {
    img: 'https://source.unsplash.com/random/?car',
    title: 'Bed',
  },
  {
    img: 'https://source.unsplash.com/random/?wolf',
    title: 'Bed',
  },
  {
    img: 'https://source.unsplash.com/random/?crocodile',
    title: 'Bed',
  },
  {
    img: 'https://source.unsplash.com/random/?animal',
    title: 'Bed',
  },
  {
    img: 'https://source.unsplash.com/random/?sportcar',
    title: 'Bed',
  },
  {
    img: 'https://source.unsplash.com/random/?cycle',
    title: 'Bed',
  },
  {
    img: 'https://source.unsplash.com/random/?motor',
    title: 'Bed',
  },
  {
    img: 'https://source.unsplash.com/random/?truck',
    title: 'Bed',
  },
  {
    img: 'https://source.unsplash.com/random/?boat',
    title: 'Bed',
  },
  {
    img: 'https://source.unsplash.com/random/?girl',
    title: 'Bed',
  },
];

export default Explore;
