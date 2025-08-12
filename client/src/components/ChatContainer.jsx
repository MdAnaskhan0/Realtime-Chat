import React from 'react'
import { useEffect, useRef } from 'react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './skeleton/MessageSkeleton';
import Avater from '../assets/Avater.png';
import { formatMessageTime } from '../lib/utils';

const ChatContainer = () => {
  const { message, getMessages, isMessageLoading, selectedUser, subScribeToMessage, unSubscribeFromMessage } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subScribeToMessage();
    return () => {
      unSubscribeFromMessage();
    }
  }, [selectedUser._id, getMessages, subScribeToMessage, unSubscribeFromMessage])

  useEffect(() => {
    if (messageEndRef.current && message) {
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [message])

  if (isMessageLoading) return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />
      <MessageSkeleton />
      <MessageInput />
    </div>
  )

  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />

      {/* Chat Messages */}
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {message.map((message) => (
          <div key={message._id} className={`chat ${message.senderID === authUser._id ? "chat-end" : "chat-start"}`} ref={messageEndRef}>
            <div className='chat-image avatar'>
              <div className='size-10 rounded-full border'>
                <img
                  src={message.senderID === authUser._id ? authUser.profilePic || Avater : selectedUser.profilePic || Avater}
                  alt="avatar"
                />
              </div>
            </div>
            <div className='chat-header mb-1'>
              <time dateTime={message.createdAt} className='text-xs opacity-50 ml-1'>
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className='chat-bubble flex flex-col'>
              {message.image && (
                <img src={message.image} alt="Attachment" className='sm:max-w-[100px] rounded-md mb-2' />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}

      </div>

      <MessageInput />
    </div>
  )
}

export default ChatContainer