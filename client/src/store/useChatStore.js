import { create } from 'zustand';
import toast from 'react-hot-toast';
import { axiosInStance } from '../lib/axios';


export const useChatStore = create((set, get) => ({
    message: [],
    users: [],
    selectedUser: null,
    isUserLoadeing: false,
    isMessageLoading: false,


    getUsers: async () => {
        try {
            const response = await axiosInStance.get("/messages/users");
            set({ users: response.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUserLoadeing: false });
        }
    },

    getMessages: async (userId) => {
        try {
            const response = await axiosInStance.get(`/messages/${userId}`);
            set({ message: response.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isMessageLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, message } = get();
        try {
            const response = await axiosInStance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({ message: [...message, response.data] });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isMessageLoading: false });
        }
    },

    // todo: Optimize this one later
    setSelectedUser: (selectedUser) => set({ selectedUser }),

}));