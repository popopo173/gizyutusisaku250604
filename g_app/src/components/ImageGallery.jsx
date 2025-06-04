// src/components/ImageGallery.jsx
const ImageGallery = ({ images }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
    {images.map((url, idx) => (
      <img key={idx} src={url} alt={`Generated ${idx}`} className="rounded-xl shadow-md" />
    ))}
  </div>
);

export default ImageGallery;
