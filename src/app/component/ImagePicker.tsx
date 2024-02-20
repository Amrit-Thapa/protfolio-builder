import React, {useState, ChangeEvent, ComponentProps} from "react";
import classNames from "classnames";
import imageIcon from "../../../public/assets/icons/imageIcon.png";
import {twMerge} from "tailwind-merge";
import Image from "next/image";

function ImagePicker({
  id,
  prevH,
  prevW,
  className,
  height,
  width,
}: ComponentProps<"img"> & {id: string; prevH?: number; prevW?: number}) {
  const [selectedImage, setSelectedImage] = useState<string | undefined>();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <label
        htmlFor={id}
        className={twMerge(
          classNames("rounded", {
            "border-dashed border border-[#AEAEAE] flex justify-center items-center bg-[#EFEFEF]":
              !selectedImage,
          }),
          className,
        )}
        style={{height, width}}
      >
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Selected"
            className={twMerge("w-full, h-full", className)}
          />
        ) : (
          <Image
            src={imageIcon}
            alt="Placeholder"
            className="inline rounded"
            height={prevH}
            width={prevW}
          />
        )}
      </label>
      <input
        type="file"
        id={id}
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </>
  );
}

export default ImagePicker;
