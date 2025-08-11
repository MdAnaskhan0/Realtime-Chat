import React from 'react'
import { useState, useRef } from 'react'
import { useChatStore } from '../store/useChatStore';
import { X, Image } from 'lucide-react';

const MessageInput = () => {
    const [text, setText] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const { sendMessage } = useChatStore();

    // Image preview
    const handleImageChange = (e) => {

    }

    // Remove image
    const removeImage = () => {

    }

    // Submit message
    const handleSubmitMessage = (e) => {

    }

    return (
        <div className='p-4 w-full'>{
            imagePreview && (
                <div className='mb-3 flex items-center gap-2'>
                    <div className='relative'>
                        <img src={imagePreview} alt="Preview" className='w-16 h-16 rounded-full' />
                        <button onClick={removeImage} className='absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center' type='button'>
                            <X className='size-3' />
                        </button>
                    </div>
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmitMessage} className='flex items-center gap-2'>
                <div className='flex-1 flex gap-2'>
                    {/* Text input */}
                    <input type="text" className='w-full input-bordered rounded-full input-sm sm:input-md' placeholder='Type a message...' value={text} onChange={(e) => setText(e.target.value)} />

                    {/* Image input */}
                    <input type="file" accept='image/*' className='hidden' ref={fileInputRef} onChange={handleImageChange} />

                    {/* Submit button */}
                    <button
                        type="button"
                        className={`hidden sm:flex btn btn-circle ${imagePreview ? "text-emerald-500" : "text-zinc-500"}`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Image size={20} />
                    </button>



                </div>
            </form>
        </div>
    )
}

export default MessageInput