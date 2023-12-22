"use client";

import { useEffect, useState } from "react";

import PreviewModal from "@/components/preview-modal";
// import ProductModal from "@/components/product-modal";
// import ProductModals from "@/components/product-modal";
 
const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return ( 
    <>
      {/* <ProductModals/> */}
      <PreviewModal />
    </>
   );
}
 
export default ModalProvider;