import { create } from 'zustand';
import { axiosInStance } from '../lib/axios';
import toast from 'react-hot-toast';
import io from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigninUp: false,
    isLoggingIng: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,



    checkAuth: async () => {
        try {
            const response = await axiosInStance.get('/auth/check');

            set({ authUser: response.data });
            get().connectSocket();

        } catch (error) {
            console.log("Error in checkAuth: ", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signUp: async (data) => {
        set({ isSigninUp: true });
        try {
            const response = await axiosInStance.post('/auth/signup', data);
            set({ authUser: response.data });
            toast.success("Account created successfully");
            get().connectSocket();
        } catch (error) {
            toast.error(error.response?.data?.message);
        } finally {
            set({ isSigninUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIng: true });
        try {
            const response = await axiosInStance.post('/auth/login', data);
            set({ authUser: response.data });
            toast.success("Logged in successfully");

            get().connectSocket();
        } catch (error) {
            toast.error(error.response?.data?.message);
        } finally {
            set({ isLoggingIng: false });
        }
    },

    logout: async () => {
        try {
            const response = await axiosInStance.post('/auth/logout');
            set({ authUser: null });
            toast.success("Logged out successfully");
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    },

    uploadProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const response = await axiosInStance.put('/auth/upload-profile', data);
            set({ authUser: response.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("Error in uploadProfile: ", error);
            toast.error(error.response?.data?.message);
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: async () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;

        const socket = io(SOCKET_URL, {
            query: {
                userId: authUser._id,
            }
        })
        socket.connect();

        set({ socket });

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },

    disconnectSocket: async () => {
        if (get().socket?.connected) get().socket.disconnect();
    },
}));