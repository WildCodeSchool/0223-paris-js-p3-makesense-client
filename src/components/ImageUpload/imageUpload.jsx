import React, { useState, useEffect } from "react";

const ImageUpload = ({ imageFromRedux, onChange }) => {
  const hiddenFileInput = React.useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (imageFromRedux) {
      setPreviewImage(imageFromRedux);
    }
  }, [imageFromRedux]);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    onChange(imageFile);
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
      <div className="image-preview-container">
        <img
          src={previewImage || "src/assets/inputImage.png"}
          className="preview-image"
          alt="Uploaded"
          onClick={handleClick}
        />
      </div>
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
