import { create } from 'zustand';
import { axiosInStance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigninUp: false,
    isLoggingIng: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const response = await axiosInStance.get('/auth/check');

            set({ authUser: response.data });
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
        } catch (error) {
            toast.error(error.response?.data?.message);
        } finally {
            set({ isSigninUp: false });
        }
    },

    logout: async () =>{
        try {
            const response = await axiosInStance.post('/auth/logout');
            set({ authUser: null });
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }
}));