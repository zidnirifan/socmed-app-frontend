import NotifBar from '../components/NotifBar';
import NotifList from '../components/NotifList';

const notifData = [
  {
    id: '2323',
    type: 'follow',
    user: {
      id: '123',
      username: 'jhondoe',
      profilePhoto: '',
    },
    text: 'started following you',
    createdAt: '1d',
  },
  {
    id: '2323',
    type: 'like',
    user: {
      id: '123',
      username: 'gedang',
      profilePhoto: '',
    },
    text: 'like your post',
    postId: 'post01',
    createdAt: '1d',
  },
  {
    id: '2323',
    type: 'comment',
    user: {
      id: '123',
      username: 'supri',
      profilePhoto: '',
    },
    postId: 'post01',
    commentId: 'comment-1',
    text: 'commented: Wadidaw wkwk wkwk wk',
    createdAt: '1d',
  },
];

export default function Notifications() {
  return (
    <>
      <NotifBar />
      <NotifList notifData={notifData} />
    </>
  );
}
