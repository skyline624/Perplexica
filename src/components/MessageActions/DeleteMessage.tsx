import { Trash2 } from 'lucide-react';
import { useState } from 'react';

const DeleteMessage = ({
  deleteMessage,
  messageId,
}: {
  deleteMessage: (messageId: string) => void;
  messageId: string;
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    if (showConfirm) {
      deleteMessage(messageId);
      setShowConfirm(false);
    } else {
      setShowConfirm(true);
      setTimeout(() => setShowConfirm(false), 3000);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="p-2 text-black/70 dark:text-white/70 rounded-full hover:bg-light-secondary dark:hover:bg-dark-secondary transition duration-200 hover:text-red-500 dark:hover:text-red-400"
      title={showConfirm ? 'Click again to confirm delete' : 'Delete message'}
    >
      <Trash2 size={16} />
    </button>
  );
};

export default DeleteMessage;
