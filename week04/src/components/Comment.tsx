interface CommentProps {
  comment: {
    id: number;
    author: {
      name: string;
      avatar: string;
    };
    createdAt: string;
    content: string;
  };
}

const Comment = ({ comment }: CommentProps) => {
  return (
    <div className="border-b border-gray-700 py-3">
      <div className="flex items-center gap-3 mb-1">
        <img
          src={comment.author.avatar}
          alt="댓글 작성자 프로필"
          className="w-6 h-6 rounded-full"
        />
        <span className="font-medium">{comment.author.name}</span>
        <span className="text-xs text-gray-400 ml-auto">
          {new Date(comment.createdAt).toLocaleString()}
        </span>
      </div>
      <p className="text-sm">{comment.content}</p>
    </div>
  );
};

export default Comment;
