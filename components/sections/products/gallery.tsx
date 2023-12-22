"use client";

import { Tab } from "@headlessui/react";

import GalleryTab from "./gallery-tab";
import Image from "next/image";

interface GalleryProps {
  // images: Image[];
  images: string
}

const Gallery: React.FC<GalleryProps> = ({
  images = ""
}) => {
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA", images)
  return ( 
    <Tab.Group as="div" className="flex flex-col-reverse">
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <Tab.List className="grid grid-cols-4 gap-6">
          {/* {images.map((image) => ( */}
            <GalleryTab  image={images} />
          {/* ))} */}
        </Tab.List>
      </div>
      <Tab.Panels className="aspect-square w-full">
        {/* {images.map((image) => ( */}
          <Tab.Panel >
            <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
              <Image
                fill
                src={images}
                // src="/images/service/2.jpg"
                alt="Image"
                className="object-cover object-center"
              />
            </div>
          </Tab.Panel>
        {/* ))} */}
      </Tab.Panels>
    </Tab.Group>
  );
}
 
export default Gallery;