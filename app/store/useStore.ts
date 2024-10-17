import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StoreState {
  firstName: string;
  setFirstName: (name: string) => void;
}

const useStore = create(
  persist<StoreState>(
    (set) => ({
      firstName: '',
      setFirstName: (name: string) => set({ firstName: name }),
    }),
    {
      name: 'user-storage', // name of the item in the storage (must be unique)
    }
  )
);

export default useStore;
