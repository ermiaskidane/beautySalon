import { create } from 'zustand'

interface useUserRoleState {
  roleUser: string,
  setRoleUser: (roleUser: string) => void
}

const useUserRoleStore = create<useUserRoleState>()((set) => ({
  roleUser: "GUEST",
  setRoleUser: (roleUser: string) => set({roleUser}),
}))


export default useUserRoleStore;