import React, {ChangeEvent, ComponentProps} from "react";
import imageIcon from "@/../public/assets/icons/imageIcon.png";
import Image from "next/image";

type ImgPicker = {
  onChange: (b64: string) => void;
  disabled?: boolean;
};

function ImagePicker({
  src,
  id,
  height,
  width,
  onChange,
  disabled = false,
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
      <label htmlFor={id}>
        <Image
          src={(src as string) || imageIcon.src}
          height={+height!}
          width={+width!}
          priority
          alt="Placeholder"
          className="inline object-cover rounded-lg cursor-pointer"
        />
      </label>
      <input
        type="file"
        id={id}
        disabled={disabled}
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </>
  );
}

export default ImagePicker;
