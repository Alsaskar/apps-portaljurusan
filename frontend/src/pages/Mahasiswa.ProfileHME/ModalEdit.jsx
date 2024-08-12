import PropTypes from "prop-types";
import { IoIosClose } from "react-icons/io";
import { BsDatabaseAdd } from "react-icons/bs";
import { HiTrash } from "react-icons/hi";
import { MdAddCircle } from "react-icons/md";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./modal.scss";
import "./EditForm.scss";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { urlApi } from "../../config";

const validationSchema = Yup.object().shape({
  visi: Yup.string().required("Nama harus diisi"),
  misi: Yup.array()
    .of(Yup.string().required("Misi is required"))
    .min(1, "At least one Misi is required"),
});

const ModalEdit = ({ data, isOpen, handleClose }) => {
  const [loading, setLoading] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
  });

  const dataDefault = useMemo(() => {
    if (!data) return {};

    return {
      userId: data.userId,
      visi: data.visi,
      misi: data.misi,
    };

  }, [data]);

  const _handleSubmit = async (values) => {
    setLoading(true);

    setTimeout(async () => {
      try {
        const res = await axios.put(
          `${urlApi}/himaju/${dataDefault.userId}`,
          {
            deskripsi: values.deskripsi,
            visi: values.visi,
            misi: values.misi,
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );

        Swal.fire({
          title: "Berhasil",
          text: res.data.message,
          icon: "success",
          confirmButtonText: "Ok",
        });

        setTimeout(() => {
          window.location.reload();
        }, 2000);

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
          <div className="modal-content-edit-profile fade-in">
            <button onClick={handleClose} className="button-close-modal">
              <IoIosClose size={20} />
            </button>

            <div className="form-edit-profile-hme">
              <div className="form-edit-profile-hme-container">
                <h3 className="title-edit-profile-hme">Edit Profile</h3>

                <Formik
                  initialValues={{
                    visi: dataDefault.visi,
                    misi: dataDefault.misi,
                  }}
                  onSubmit={_handleSubmit}
                  validationSchema={validationSchema}
                >
                  {({
                    errors,
                    touched,
                    handleSubmit,
                    handleChange,
                    values,
                    setFieldValue,
                  }) => (
                    <form
                      method="post"
                      onSubmit={handleSubmit}
                      className="form-edit-profile-hme"
                    >
                      <div className="form-content">
                        <div className="my-custom-editor">
                          <EditorContent editor={editor} />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            id="visi"
                            name="visi"
                            placeholder="Masukkan visi"
                            onChange={handleChange}
                            value={values.fullname}
                          />
                          {touched.visi && errors.visi ? (
                            <div className="error-form">{errors.visi}</div>
                          ) : null}
                        </div>

                        <FieldArray name="misi">
                          {({ remove, push }) => (
                            <>
                              {values.misi.map((mision, index) => (
                                <div key={index} className="form-content">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      id={`misi-${index}`}
                                      name={`misi.${index}`}
                                      value={mision}
                                      onChange={(event) => {
                                        setFieldValue(
                                          `misi.${index}`,
                                          event.target.value
                                        );
                                      }}
                                      placeholder={`Misi ${index + 1}`}
                                    />
                                    {touched.misi?.[index] &&
                                      errors.misi?.[index] && (
                                        <div className="error-form">
                                          {errors.misi[index]}
                                        </div>
                                      )}
                                    {values.misi.length > 1 && (
                                      <button
                                        type="button"
                                        className="btn-hapus"
                                        onClick={() => remove(index)}
                                      >
                                        <HiTrash size={18} />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              ))}
                              <div className="btn-section">
                                <button
                                  type="button"
                                  className="btn orange"
                                  onClick={() => push("")}
                                >
                                  <MdAddCircle size={18} /> Tambah Misi
                                </button>
                              </div>
                            </>
                          )}
                        </FieldArray>
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

ModalEdit.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default ModalEdit;
