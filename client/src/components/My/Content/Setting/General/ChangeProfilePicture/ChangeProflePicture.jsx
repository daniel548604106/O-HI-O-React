import React, { useState, useEffect } from 'react';
import classes from './ChangeProfilePicture.module.scss';
import { apiPatchMyPhoto } from '../../../../../../api/index';
import { useSelector } from 'react-redux';

const ChangeProflePicture = () => {
  const [uploadPicture, setUploadPicture] = useState('');
  const user = useSelector((state) => state.user.currentUser);
  const handleUpload = (e) => {
    console.log('e', e);
    const image = e.target.files[0];
    const reader = new FileReader();
    console.log('image=>', image);
    reader.onload = (e) => {
      //啟用 reader 讀取 image 資料
      setUploadPicture(e.target.result);
    };
    reader.readAsDataURL(image);
  };

  useEffect(() => {
    const patchMyPhoto = async () => {
      try {
        const { data } = await apiPatchMyPhoto(uploadPicture);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    console.log('picture', uploadPicture);
    patchMyPhoto();
  }, [uploadPicture]);
  return (
    <>
      <div className={classes.profile}>
        <h2>Change Profile Picture</h2>
        <div className={classes.uploadPhoto}>
          <img src={uploadPicture || user.picture} alt="" />
          <div>
            <span>Optimal Size : 600 * 600px</span>
            <form action="/my/photo" method="post" encType="multipart/form-data">
              <label onChange={(e) => handleUpload(e)}>
                <input style={{ display: 'none' }} name="avatar" accept="image/*" type="file" />
                <span className={classes.uploadPhotoBtn}>Upload Photo</span>
              </label>
            </form>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default ChangeProflePicture;
