"use client";

import React, { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "@/lib/firebase";

interface PhotoUploaderProps {
  onClose: () => void;
  onPhotoAdd: (url: string) => void;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({ onClose, onPhotoAdd }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    try {
      const storage = getStorage(app);
      const storageRef = ref(storage, `photos/${Date.now()}-${file.name}`);
      await uploadBytes(storageRef, file);

      const downloadURL = await getDownloadURL(storageRef);
      onPhotoAdd(downloadURL);
      onClose();
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload photo.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-bold mb-4">Upload a Photo</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <div className="mt-4 flex gap-2">
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={onClose}
          disabled={uploading}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleUpload}
          disabled={!file || uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
};
