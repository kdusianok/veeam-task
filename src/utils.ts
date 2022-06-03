import { Image } from "./types";

export const getImageData = (imageSrc: string) => {
  const image = new Image();
  image.src = imageSrc;
  return new Promise<Image>((resolve) => {
    image.onload = function () {
      const imageData = {
        src: image.src,
        width: "auto",
        height: "auto"
      };
      if (image.width > image.height) {
        imageData.width = "100%";
      } else {
        imageData.height = "100%";
      }

      image.remove();
      resolve(imageData);
    };
  });
};
