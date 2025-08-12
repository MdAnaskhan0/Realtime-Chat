import { create } from 'zustand';
import toast from 'react-hot-toast';
import { axiosInStance } from '../lib/axios';
import { useAuthStore } from './useAuthStore';


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

    subScribeToMessage: async () => {
        const { selectedUser } = get();
        if (!selectedUser?._id) return;

        const socket = useAuthStore.getState().socket;

        // Todo: Optimize this one later
        socket.on("newMessage", (newMessage) => {
            set({
                message: [...get().message, newMessage]
            })
        })
    },

    unSubscribeFromMessage: async () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },

    // todo: Optimize this one later
    setSelectedUser: (selectedUser) => set({ selectedUser }),

}));