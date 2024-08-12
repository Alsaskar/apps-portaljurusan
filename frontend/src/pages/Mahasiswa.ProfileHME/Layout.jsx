import "./style.scss";
import { useState } from "react";
import { HiTrash } from "react-icons/hi";
import { MdAddCircle } from "react-icons/md";
import { BsFillSendPlusFill } from "react-icons/bs";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Field, Formik, FieldArray } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import axios from "axios";
import { urlApi } from "../../config";
import { MdRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";

// Define validation schema
const validationSchema = Yup.object().shape({
  visi: Yup.string().required("Visi is required"),
  misi: Yup.array()
    .of(Yup.string().required("Misi is required"))
    .min(1, "At least one Misi is required"),
});

const Layout = () => {
  const [isLoading, setIsLoading] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
  });

  const _handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);

    // Gabungkan array misi menjadi string tunggal
    const concatenatedMisi = values.misi.join("| ");

    try {
      const { data } = await axios.post(
        `${urlApi}/himaju/addProfil`,
        {
          visi: values.visi,
          misi: concatenatedMisi,
          deskripsi: editor.getHTML(),
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      if (!data.success) {
        // Jika server mengirim pesan bahwa data sudah ada
        Swal.fire({
          title: "Data Sudah Ada",
          text: data.message,
          icon: "warning",
          confirmButtonText: "Ok",
        });
      } else {
        // Jika data berhasil ditambahkan
        Swal.fire({
          title: "Berhasil",
          text: data.message,
          icon: "success",
          confirmButtonText: "Ok",
        });

        window.location.reload();
      }
    } catch (err) {
      console.error("Terjadi kesalahan:", err.response?.data || err.message);
      Swal.fire({
        title: "Gagal",
        text: err.response?.data?.message || "Terjadi kesalahan",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="tentang-profile-hme">
      <Formik
        initialValues={{
          visi: "",
          misi: [""],
        }}
        onSubmit={_handleSubmit}
        validationSchema={validationSchema}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <form
            className="container"
            method="post"
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit();
            }}
          >
            <div className="editor">
              <Link to="/mahasiswa/data/profile/hme" className="see">
                <MdRemoveRedEye size={18} />
                Lihat Data Profile
              </Link>
              <div className="text-editor">
                <p className="title-desc">Buat Deskripsi</p>
                <div className="my-custom-editor">
                  <EditorContent editor={editor} />
                </div>
                {touched.deskripsi && errors.deskripsi && (
                  <div className="error-form">{errors.deskripsi}</div>
                )}
              </div>
            </div>

            <div className="visi-misi-form">
              <div className="form-buat-visi-misi">
                <p className="title-visi">Buat Visi</p>

                <div className="form-content">
                  <div className="form-group">
                    <Field
                      type="text"
                      id="visi"
                      name="visi"
                      onChange={handleChange}
                      value={values.visi}
                      placeholder="Masukkan visi"
                    />
                    {touched.visi && errors.visi && (
                      <div className="error-form">{errors.visi}</div>
                    )}
                  </div>
                </div>

                <p className="title-misi">Buat Misi</p>
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
                            {touched.misi?.[index] && errors.misi?.[index] && (
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

                <button type="submit" className="btn blue">
                  <BsFillSendPlusFill size={18} />
                  {isLoading ? "Loading..." : "Submit"}
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Layout;
