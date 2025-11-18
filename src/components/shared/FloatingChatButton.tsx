import React from 'react';

interface FloatingChatButtonProps {
  onClick?: () => void;
}

const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-24 right-4 w-14 h-14 bg-indigo-500 text-white rounded-full shadow-lg hover:bg-indigo-600 transition-colors flex items-center justify-center z-40"
    >
      <span className="text-2xl">💬</span>
    </button>
  );
};

export default FloatingChatButton;