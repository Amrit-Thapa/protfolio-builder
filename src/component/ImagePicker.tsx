import React, {ChangeEvent, ComponentProps} from "react";
import Image from "next/image";
import classNames from "classnames";

type ImgPicker = {
  onChange: (b64: string) => void;
};

const ImagePicker = ({
  src,
  id,
  height,
  width,
  onChange,
}: ComponentProps<"img"> & ImgPicker) => {
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
          src={src || ""}
          height={+height!}
          width={+width!}
          priority
          alt="Placeholder"
          className={classNames(
            "inline object-cover rounded cursor-pointer max-h-[295px] max-w-[295px]",
            {
              "!rounded-2xl": +height! > 50,
            },
          )}
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
};

export default ImagePicker;
