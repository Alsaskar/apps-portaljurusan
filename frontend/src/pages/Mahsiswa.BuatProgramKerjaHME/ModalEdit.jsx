import PropTypes from "prop-types";
import { IoIosClose } from "react-icons/io";
import { BsDatabaseAdd } from "react-icons/bs";
import { Formik } from "formik";
import * as Yup from "yup";
import "./modal.scss";
import "./EditForm.scss";
import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { urlApi } from "../../config";

const validationSchema = Yup.object().shape({
  namaKegiatan: Yup.string().required("Nama Kegiatan harus diisi"),
  deskripsiKegiatan: Yup.string().required("Deskripsi Kegiatan harus diisi"),
  tglKegiatan: Yup.string().required("Tanggal Kegiatan harus diisi"),
  jamMulai: Yup.string().required("Jam Mulai harus diisi"),
  jamSelesai: Yup.string().required("Jam Selesai harus diisi"),
  lokasi: Yup.string().required("Lokasi harus diisi"),
});

const ModalEdit = ({ data, dataUser, isOpen, handleClose }) => {
  const [loading, setLoading] = useState(false);

  const dataDefault = useMemo(() => {
    if (!data) return {};

    return {
      userId: data.userId,
      namaKegiatan: data.namaKegiatan,
      deskripsiKegiatan: dataUser.deskripsiKegiatan,
      tglKegiatan: dataUser.tglKegiatan,
      jamMulai: data.jamMulai,
      jamSelesai: data.jamSelesai,
      lokasi: data.lokasi,
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, dataUser]);

  const _handleSubmit = async (values) => {
    setLoading(true);

    setTimeout(async () => {
      try {
        const res = await axios.put(
          `${urlApi}/mahasiswa/${dataDefault.userId}`,
          {
            namaKegiatan: values.namaKegiatan,
            deskripsiKegiatan: values.deskripsiKegiatan,
            tglKegiatan: values.tglKegiatan,
            jamMulai: values.jamMulai,
            jamSelesai: values.jamSelesai,
            lokasi: values.lokasi,
          },
          { headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` } }
        );

        Swal.fire({
          title: "Berhasil",
          text: res.data.message,
          icon: "success",
          confirmButtonText: "Ok",
        });

        setTimeout(() => {
          window.location.reload();
        }, 2000)

        setLoading(false);
      } catch (err) {
        setLoading(false);
        Swal.fire({
          title: "Gagal",
          text: err.response.data.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    }, 1500);
    console.log(_handleSubmit);
  };

  return (
    <>
      {isOpen && (
        <div className="edit-modal fade-in">
          <div className="modal-content-edit fade-in">
            <button onClick={handleClose} className="button-close-modal">
              <IoIosClose size={20} />
            </button>

            <div className="form-edit-data-program-kerja-hme">
              <div className="form-edit-container">
                <h3 className="title-edit-dosen">Edit Mahasiswa</h3>

                <Formik
                  initialValues={{
                    namaKegiatan: dataDefault.namaKegiatan,
                    deskripsiKegiatan: dataDefault.deskripsiKegiatan,
                    tglKegiatan: dataDefault.tglKegiatan,
                    jamMulai: dataDefault.jamMulai,
                    jamSelesai: dataDefault.jamSelesai,
                    lokasi: dataDefault.lokasi,
                  }}
                  onSubmit={_handleSubmit}
                  validationSchema={validationSchema}
                >
                  {({ errors, touched, handleSubmit, handleChange, values }) => (
                    <form method="post" onSubmit={handleSubmit} className="form-edit-mahasiswa">
                      <div className="form-content">
                        <div className="form-group">
                          <label htmlFor="namaKegiatan">
                            Nama Kegiatan <span className="important">*</span>
                          </label>
                          <input type="text" id="namaKegiatan" name="namaKegiatan" onChange={handleChange} value={values.namaKegiatan} />
                          {touched.namaKegiatan && errors.namaKegiatan ? <div className="error-form">{errors.namaKegiatan}</div> : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="deskripsiKegiatan">
                            Deskripsi Kegiatan <span className="important">*</span>
                          </label>
                          <input type="text" id="deskripsiKegiatan" name="deskripsiKegiatan" onChange={handleChange} value={values.deskripsiKegiatan} />
                          {touched.deskripsiKegiatan && errors.deskripsiKegiatan ? <div className="error-form">{errors.deskripsiKegiatan}</div> : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="tglKegiatan">
                            Tanggal <span className="important">*</span>
                          </label>
                          <input type="date" id="tglKegiatan" name="tglKegiatan" onChange={handleChange} value={values.tglKegiatan} />
                          {touched.tglKegiatan && errors.tglKegiatan ? <div className="error-form">{errors.tglKegiatan}</div> : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="jamMulai">
                            Jam Mulai <span className="important">*</span>
                          </label>
                          <input type="time" id="jamMulai" name="jamMulai" onChange={handleChange} value={values.jamMulai} />
                          {touched.jamMulai && errors.jamMulai ? <div className="error-form">{errors.jamMulai}</div> : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="jamSelesai">
                            Jam Selesai <span className="important">*</span>
                          </label>
                          <input type="time" id="jamSelesai" name="jamSelesai" onChange={handleChange} value={values.jamSelesai} />
                          {touched.jamSelesai && errors.jamSelesai ? <div className="error-form">{errors.jamSelesai}</div> : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="lokasi">
                            Tempat <span className="important">*</span>
                          </label>
                          <input type="time" id="lokasi" name="lokasi" onChange={handleChange} value={values.lokasi} />
                          {touched.lokasi && errors.lokasi ? <div className="error-form">{errors.lokasi}</div> : null}
                        </div>
                      </div>
                      <div className="button-simkel">
                        {loading ? (
                          <button disabled>
                            <BsDatabaseAdd size={16} />
                            <span>Loading...</span>
                          </button>
                        ) : (
                          <button type="submit">
                            <BsDatabaseAdd size={16} />
                            <span>Simpan</span>
                          </button>
                        )}

                        <button type="button" onClick={handleClose} className="button-keluar">
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

ModalEdit.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  dataUser: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default ModalEdit;
