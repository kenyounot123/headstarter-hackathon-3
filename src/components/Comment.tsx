export default function CommentSection() {
  type Comment = {
    username: string;
    userComment: string;
    highlightedText: string;
  };
  
  // Sample dummy comments
  const dummyComments: Comment[] = [
    {
      username: 'Alice',
      userComment: 'Great point on increasing sales during the holiday season!',
      highlightedText: 'Increase sales during the holiday season',
    },
    {
      username: 'Bob',
      userComment: 'I think the pricing strategy needs more clarity.',
      highlightedText: 'Pricing strategy',
    },
    {
      username: 'Charlie',
      userComment: 'Could you provide more details on customer feedback?',
      highlightedText: 'Customer feedback',
    },
    {
      username: 'Dana',
      userComment: 'The new product launch timeline looks promising.',
      highlightedText: 'New product launch timeline',
    },
    {
      username: 'Eva',
      userComment: 'I agree, the market analysis should be more detailed.',
      highlightedText: 'Market analysis',
    },
  ];
  

  return (
    <div className="flex flex-col h-[720px] bg-white border border-gray-300 rounded-lg shadow-md">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {dummyComments.map((comment, index) => (
          <div key={index} className="p-4 rounded-lg shadow-sm bg-gray-100">
            <div className="font-semibold text-blue-800 mb-2">{comment.username}</div>
            <div className="mb-2">
              <span className="font-bold text-gray-700">Highlighted:</span> {comment.highlightedText}
            </div>
            <div className="text-gray-800">
              <span className="font-bold text-gray-700">Comment:</span> {comment.userComment}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
}