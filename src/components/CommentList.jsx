import List from '@mui/material/List';
import Comment from './Comment';

export default function CommentList({ comments }) {
  return (
    <List>
      {comments.map((e, i) => (
        <>
          <Comment comment={e} index={i} />
          <List sx={{ marginLeft: 5 }}>
            <Comment comment={e} index={i} />
          </List>
        </>
      ))}
    </List>
  );
}
