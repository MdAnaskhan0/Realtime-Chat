import { create } from 'zustand';
import { axiosInStance } from '../lib/axios';

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

    signUp: async(data)=>{

    }
}));