import List from '@mui/material/List';
import Comment from './Comment';

export default function CommentList({ comments }) {
  return (
    <List>
      {comments.map((c, i) => (
        <>
          <Comment comment={c} index={i} parentComment={c.id} key={i} />
          {c.replies.length > 0 ? (
            <List sx={{ marginLeft: 5 }}>
              {c.replies.map((r, i) => (
                <Comment comment={r} index={i} parentComment={c.id} key={i} />
              ))}
            </List>
          ) : (
            ''
          )}
        </>
      ))}
    </List>
  );
}
