import { create } from 'zustand';

interface UserState {
  firstName: string;
  setFirstName: (firstName: string) => void;
}

const useStore = create<UserState>((set) => ({
  firstName: '',
  setFirstName: (firstName: string) => set({ firstName }),
}));

export default useStore;
