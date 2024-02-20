import React, {ChangeEvent, ComponentProps} from "react";
import imageIcon from "@/../public/assets/icons/imageIcon.png";
import Image from "next/image";

type ImgPicker = {
  prevH?: number;
  prevW?: number;
  onChange: (b64: string) => void;
};

function ImagePicker({
  src,
  id,
  height,
  width,
  onChange,
}: ComponentProps<"img"> & ImgPicker) {
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <label htmlFor={id} style={{height, width}}>
        <Image
          src={(src as string) || imageIcon}
          height={+height!}
          width={+width!}
          alt="Placeholder"
          className="inline rounded-lg"
        />
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
