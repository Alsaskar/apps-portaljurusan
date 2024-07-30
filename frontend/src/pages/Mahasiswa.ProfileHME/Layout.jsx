import "./style.scss";
import { useState } from "react";
import { HiTrash } from "react-icons/hi2";
import { MdAddCircle } from "react-icons/md";
import { BsFillSendPlusFill } from "react-icons/bs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import axios from "axios";
import { urlApi } from "../../config";

const validationSchema = Yup.object().shape({
  desc: Yup.string().required("Deskripsi harus diisi"),
  visi: Yup.string().required("Visi harus diisi"),
});

const modules = {
  toolbar: [
    // [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    // [
    //   { list: "ordered" },
    //   { list: "bullet" },
    //   { indent: "-1" },
    //   { indent: "+1" },
    // ],
    ["link"],
  ],
};

const Layout = () => {
  const [desc, setDesc] = useState("");
  const [misi, setMisi] = useState([""]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChangeMisi = (index, event) => {
    const newMisi = misi.slice();
    newMisi[index] = event.target.value;
    setMisi(newMisi);
  };

  const handleMisi = () => {
    setMisi([...misi, ""]);
  };

  const handleRemoveMisi = (index) => {
    const newMisi = misi.slice();
    newMisi.splice(index, 1);
    setMisi(newMisi);
  };

  const _handleSubmit = () => {
    setIsLoading(true);

    setTimeout(async (values) => {
      try {
        const res = await axios.post(
          `${urlApi}/himaju/addProfile`,
          {
            visi: values.visi,
            misi: values.misi,
            deskripsi: values.desc,
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

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        Swal.fire({
          title: "Gagal",
          text: err.response.data.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    }, 1500);

    const misiString = misi.join(",");

    console.log(misiString);
  };

  return (
    <div className="tentang-hme">
      <Formik
        initialValues={{
          desc: "",
          visi: "",
          misi: "",
        }}
        onSubmit={_handleSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, handleChange }) => (
          <form className="container" onSubmit={handleSubmit}>
            <div className="editor">
              <div className="text-editor">
                <p className="title-desc">Buat Deskripsi</p>
                <ReactQuill
                  theme="snow"
                  value={desc}
                  id="desc"
                  name="desc"
                  onChange={setDesc}
                  modules={modules}
                  className="text"
                />
              </div>

              <div className="hasil">
                <p className="title-prev">Preview Deskripsi</p>
                <div
                  className="preview"
                  dangerouslySetInnerHTML={{ __html: desc }}
                />
              </div>
            </div>

            <div className="visi-misi-form">
              <div className="form-buat-visi">
                <p className="title-visi">Buat Visi</p>

                <div className="form-content">
                  <div className="form-group">
                    <Field
                      type="text"
                      id="visi"
                      name="visi"
                      onChange={handleChange}
                    />
                    {/* {touched.visi && errors.visi ? (
                      <div className="error-form">{errors.visi}</div>
                    ) : null} */}
                  </div>
                </div>

                <p className="title-misi">Buat Misi</p>
                {misi.map((mision, index) => (
                  <div key={index} className="form-content">
                    <div className="form-group">
                      <Field
                        type="text"
                        id="misi"
                        name="misi"
                        value={mision}
                        onChange={(event) =>
                          handleInputChangeMisi(index, event)
                        }
                        placeholder={`Misi ${index + 1}`}
                      />
                      {/* {touched.misi && errors.misi ? (
                        <div className="error-form">{errors.misi}</div>
                      ) : null} */}
                      {misi.length > 1 && (
                        <button
                          type="button"
                          className="btn-hapus"
                          onClick={() => handleRemoveMisi(index)}
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
                    onClick={handleMisi}
                  >
                    <MdAddCircle size={18} /> Tambah Misi
                  </button>
                </div>
                <button type="submit" className="btn blue">
                  <BsFillSendPlusFill size={18} />
                  {isLoading ? "Loading..." : "submit"}
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
