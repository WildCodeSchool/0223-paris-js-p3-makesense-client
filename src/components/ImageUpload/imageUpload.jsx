import React, { useState } from "react";
import FormPost from "../FormPost/FormPost";

const ImageUpload = ({onChange}) => {
  const hiddenFileInput = React.useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    onChange(e)

    if (imageFile) {
      setSelectedImage(imageFile);

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(imageFile);
    }
  };

  return (
    <div>
      {!previewImage ? (
        <img
          src="src/assets/inputImage.png"
          className="clickUpload"
          alt="click upload image"
          onClick={handleClick}
        />
      ) : (
        <div className="image-preview-container">
          <img
            src={previewImage}
            className="preview-image"
            alt="click upload image"
            onClick={handleClick}
          />
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        ref={hiddenFileInput}
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default ImageUpload;
