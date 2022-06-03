import { useCallback, useEffect, useRef, useState } from "react";
import UploadFile from "./UploadFile";
import Labels from "./Labels";
import { Label, Image, ImageSize } from "./types";
import "./styles.css";

export default function App() {
  const imageRef = useRef<HTMLImageElement>(null);
  const [image, setImage] = useState<Image>();
  const [imageSize, setImageSize] = useState<ImageSize>();
  const [labels, setLabels] = useState<Label[]>([] as Label[]);

  useEffect(() => {
    const onResize = () => {
      if (imageRef.current && imageSize) {
        const diffWidth = imageRef.current.width / imageSize.width;
        const diffHeight = imageRef.current.height / imageSize.height;

        setLabels((labels) =>
          labels.map((label) => {
            return {
              ...label,
              left: label.left * diffWidth,
              top: label.top * diffHeight
            };
          })
        );

        setImageSize({
          width: imageRef.current.width,
          height: imageRef.current.height
        });
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [imageSize]);

  useEffect(() => {
    if (imageRef.current) {
      setImageSize({
        width: imageRef.current.width,
        height: imageRef.current.height
      });
    }
  }, [image]);

  const addLabel = useCallback((e) => {
    setLabels((labels: Label[]) => [
      ...labels,
      {
        text: "Метка",
        editable: true,
        left: e.clientX,
        top: e.clientY
      }
    ]);
  }, []);

  return (
    <div className="App">
      {image ? (
        <>
          <img
            alt="uploadedFile"
            src={image.src}
            ref={imageRef}
            onClick={addLabel}
            style={{
              width: image.width,
              height: image.height
            }}
          />
          <Labels labels={labels} setLabels={setLabels} />
        </>
      ) : (
        <UploadFile setImage={setImage} />
      )}
    </div>
  );
}
