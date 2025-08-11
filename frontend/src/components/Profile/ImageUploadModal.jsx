import React, { useState, useRef, useCallback } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { uploadProfilePhoto } from '../../api/authApi';

export default function ImageUploadModal({ open, changeProfilePhoto, onClose }) {
  const [imageUrl, setImageUrl] = useState();
  const inputRef = useRef(null);
  const [file, setFile] = useState();

  const handleSelect = () => {
    inputRef.current?.click();
  };

  const handleFileChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
    setFile(file);
  }, []);

  const handleClose = useCallback(() => {
    setImageUrl(undefined);
    onClose();
  }, [onClose]);

  const handleUpload = useCallback(() => {
    if (!file) return;
    uploadProfilePhoto(file).then((res) => {
      changeProfilePhoto(res.data.image);
      handleClose();
    });
  }, [file, handleClose, changeProfilePhoto]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Profile Image Upload</DialogTitle>
      <DialogContent>
        <DialogContentText style={{ marginBottom: 10 }}>
          Select profile image from your computer
        </DialogContentText>
        <div className="flex justify-center items-center mb-10">
          {imageUrl && <img src={imageUrl} alt="profile" />}
        </div>
        <Button onClick={handleSelect} fullWidth variant="contained" size="large">
          Select
        </Button>
        <input onChange={handleFileChange} ref={inputRef} type="file" hidden />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleUpload}>Upload</Button>
      </DialogActions>
    </Dialog>
  );
}
