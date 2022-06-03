import React, { useCallback, useRef } from "react";
import UploadIcon from "./UploadIcon";
import { getImageData } from "./utils";

interface UploadFileProps {
  setImage: Function;
}

const UploadFile: React.FC<UploadFileProps> = ({ setImage }) => {
  const file = useRef<HTMLInputElement>(null);
  const uploadArea = useRef<HTMLLabelElement>(null);

  const onChooseFile = useCallback(() => {
    if (file.current) {
      file.current.click();
    }
  }, []);

  const onUploadFile = useCallback(
    (e) => {
      if (e.target.files && e.target.files[0]) {
        getImageData(window.URL.createObjectURL(e.target.files[0])).then(
          (imageData) => {
            setImage(imageData);
          }
        );
      }
    },
    [setImage]
  );

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      if (e.dataTransfer.items && e.dataTransfer.items[0]) {
        getImageData(
          window.URL.createObjectURL(e.dataTransfer.items[0].getAsFile())
        ).then((imageData) => {
          setImage(imageData);
        });
      }
    },
    [setImage]
  );

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    if (uploadArea.current) {
      uploadArea.current.style.background = "#B0E0E6";
    }
  }, []);

  const onDragLeave = useCallback((e) => {
    e.preventDefault();
    if (uploadArea.current) {
      uploadArea.current.style.background = "#ffffff";
    }
  }, []);

  return (
    <div className="upload-file">
      <label
        ref={uploadArea}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={onChooseFile}
      >
        <UploadIcon size={96} />
        Переташите файл в область или кликните
      </label>
      <input hidden ref={file} id="file" type="file" onChange={onUploadFile} />
    </div>
  );
};

export default UploadFile;
