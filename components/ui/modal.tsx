"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  info?: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> =({
  title,
  description,
  isOpen,
  info,
  onClose,
  children
}) => {
  const onChange = (open: boolean) => {
    if(!open){
      onClose();
    }
  };

  return  (
    <Dialog open={isOpen} onOpenChange={onChange} >
      <DialogContent className={`${info ? "bg-[#00ffff]" : "bg-white"} `}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <div>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}