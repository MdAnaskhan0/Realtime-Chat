import React from 'react'
import { useChatStore } from '../store/useChatStore';

const ChatContainer = () => {
  const { message, getMessage, isMessageLoading, selectedUser } = useChatStore();

  useEffect(() => {
    getMessage(selectedUser._id);
  }, [selectedUser._id, getMessage])

  if (isMessageLoading) return <div>Loading...</div>

  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />

      <p>Messages...</p>

      <MessageInput />
    </div>
  )
}

export default ChatContainer