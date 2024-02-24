// userResultStore.js

import { create } from 'zustand'

const useUserResultStore = create((set) => ({
  userResults: [],
  loading: false, // Initial loading state
  setUserResults: (results) => set({ userResults: results, loading: false }),
  clearUserResults: () => set({ userResults: [] }),

  totalUsers: [],
  setTotalUsers : (results) => set({totalUsers: results, loading: false}),
  clearTotalUsers : () => set({totalUsers: []}),

  
  setLoading: (isLoading) => set({ loading: isLoading }),

}));

export default useUserResultStore;
