import React from 'react'
import { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import SidebarSkeleton from './skeleton/SidebarSkeleton.jsx'
import { Users } from 'lucide-react'
import Avater from "../assets/Avater.png"

const Sidebar = () => {
    const { getUsers, users, selectedUser, getSelectedUser, isUserLoadeing } = useChatStore();

    const onlineUsers = [];

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    if (isUserLoadeing) return <SidebarSkeleton />

    return (
        <aside className='h-full w-20 lg-w-72 border-r border-base-300 flex flex-col transition-all duration-200'>
            <div className='border-b border-base-300 w-full p-5'>
                <div className='flex items-center gap-2'>
                    <Users className='size-6' />
                    <span className='font-medium hidden lg:block'>Contacts</span>
                </div>
                {/* Todo: Online Filter */}
            </div>

            <div className='overflow-y-auto w-full py-3'>
                {users.map((user) => (
                    <button key={user.id} className={`w-full p-3 flex items-center gap-3 hover::bg-base-300 transition-colors ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}`} onClick={() => setlSelectedUser(user)}>
                        <div className='relative mx-auto lg:mx-0'>
                            <img src={user.profilePic || Avater} alt={user.name} className='size-12 object-cover rounded-full' />
                            {onlineUsers.includes(user._id) && (
                                <span className='absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-zinc-900'
                                />
                            )}
                        </div>

                        {/* user info skeleton - only visible on larger screens */}

                    </button>
                ))}

            </div>
        </aside>
    )
}

export default Sidebar