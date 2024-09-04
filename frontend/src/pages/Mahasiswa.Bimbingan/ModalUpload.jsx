import PropTypes from 'prop-types';
import { IoIosClose } from 'react-icons/io';
import { BsDatabaseAdd } from 'react-icons/bs';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import './ModalUpload.scss';
import './UploadForm.scss';
import { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { urlApi } from '../../config';
import { MahasiswaContext } from "../../context/MahasiswaContext";

const validationSchema = Yup.object().shape({
  fileName: Yup.string().matches(/^\S*$/, 'Tidak boleh ada spasi').required('File Name harus diisi'),
  fileUrl: Yup.mixed().required('File harus diisi'),
});

const ModalUpload = ({ isOpen, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const { result } = useContext(MahasiswaContext) || {};

  const idMahasiswa = result ? result.id : null;

  const _handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
  
    const formData = new FormData();
    formData.append('fileName', values.fileName);
    formData.append('fileUrl', values.fileUrl);
    formData.append('idMahasiswa', idMahasiswa);
  
    try {
      const res = await axios.post(
        `${urlApi}/evaluasimahasiswa/upload-pdf`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      );
  
      Swal.fire({
        title: 'Berhasil',
        text: res.data.message,
        icon: 'success',
        confirmButtonText: 'Ok',
      });
  
      setLoading(false);
      resetForm();
      setTimeout(() => {
        window.location.reload();
      }, 1500);

    } catch (err) {
      setLoading(false);
      Swal.fire({
        title: 'Gagal',
        text: err.response?.data?.message || 'Terjadi Kesalahan',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };
  

  return (
    <>
      {isOpen && (
        <div className="upload-modal fade-in">
          <div className="modal-content-upload fade-in">
            <button onClick={handleClose} className="button-close-modal">
              <IoIosClose size={20} />
            </button>

            <div className="form-upload-pdf">
              <div className="form-upload-pdf-container">
                <h3 className="title-upload-pdf">Upload PDF Evaluasi</h3>
                <p className="desc-upload-pdf">Nama file tidak boleh ada spasi</p>

                <Formik
                  initialValues={{
                    fileName: '',
                    fileUrl: null,
                  }}
                  onSubmit={_handleSubmit}
                  validationSchema={validationSchema}
                >
                  {({ errors, touched, handleSubmit, setFieldValue, setFieldTouched }) => (
                    <form
                      onSubmit={handleSubmit}
                      className="form-upload-pdf-data"
                    >
                      <div className="form-content-upload">
                        <div className="form-group">
                          <label htmlFor="fileName">
                            Nama File <span className="important">*</span>
                          </label>
                          <Field
                            type="text"
                            id="fileName"
                            name="fileName"
                            onChange={(event) => {
                              // Menghapus spasi dan set nilai
                              const value = event.target.value.replace(/\s+/g, '');
                              setFieldValue('fileName', value);
                            }}
                            onBlur={() => setFieldTouched('fileName')}
                          />
                          {touched.fileName && errors.fileName ? (
                            <div className="error-form">{errors.fileName}</div>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="fileUrl">
                            File <span className="important">*</span>
                          </label>
                          <input
                            type="file"
                            id="fileUrl"
                            name="fileUrl"
                            onChange={(event) => {
                              setFieldValue('fileUrl', event.currentTarget.files[0]);
                            }}
                          />
                          {touched.fileUrl && errors.fileUrl ? (
                            <div className="error-form">{errors.fileUrl}</div>
                          ) : null}
                        </div>
                      </div>
                      <div className="button-simkel">
                        {loading ? (
                          <button disabled className="btn-loading-upload">
                            <BsDatabaseAdd size={16} />
                            <span>Loading...</span>
                          </button>
                        ) : (
                          <button type="submit" className="btn-upload">
                            <BsDatabaseAdd size={16} />
                            <span>Upload</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={handleClose}
                          className="button-keluar"
                        >
                          <BsDatabaseAdd size={16} />
                          <span>Keluar</span>
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

ModalUpload.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ModalUpload;