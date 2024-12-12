import React, { useState } from 'react';

const UploadImage = ({ onImageUpload }) => {
    const [previewImages, setPreviewImages] = useState([]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        if (files.length + previewImages.length > 4) {
            alert('You can upload a maximum of 4 images.');
            return;
        }

        const imageUrls = files.map((file) => {
            const imageUrl = URL.createObjectURL(file);
            onImageUpload(imageUrl); // Notify the parent component about the uploaded image
            return imageUrl;
        });

        setPreviewImages((prev) => [...prev, ...imageUrls]);
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">Upload Images</label>
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="add-product-InputCSS"
            />
            <div className="image-preview grid grid-cols-2 gap-2 mt-4">
                {previewImages.map((src, index) => (
                    <img key={index} src={src} alt={`Preview ${index + 1}`} className="h-20 w-20 object-cover" />
                ))}
            </div>
        </div>
    );
};

export default UploadImage;
