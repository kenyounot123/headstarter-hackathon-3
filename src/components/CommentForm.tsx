import React, { useState } from 'react';
import { Button } from './ui/button';

interface CommentFormProps {
  onSubmit: (comment: string) => void;
  onCancel: () => void;
}

function CommentForm({ onSubmit, onCancel }: CommentFormProps) {
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(comment);
    setComment('');
  };

  return (
    <div className="absolute bg-white p-4 border rounded shadow-lg">
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter your comment"
          rows={4}
          className="w-full p-2 border border-gray-300 rounded"
          style={{zIndex: 99999}}
        />
        <div className="mt-2 flex justify-end">
          <Button
            type="submit"
            className="mr-2"
          >
            Add Comment
          </Button>
          <Button
            type="button"
            variant={'outline'}
            className='text-primary hover:text-primary'
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;