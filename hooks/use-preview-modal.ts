import { create } from "zustand";

// import { Product } from "@/types"

interface PreviewModalStore {
  isOpen: boolean;
  data?: any;
  onOpen: (data: any) => void;
  onClose: () => void
}

const usePreviewModal = create<PreviewModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: any) => set({data, isOpen: true}),
  onClose: () => set({isOpen: false})
}))

export default usePreviewModal;