import "./style.scss";
import { BsDatabaseAdd } from "react-icons/bs";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { urlApi } from "../../config";

const Layout = () => {
  // Validasi dengan Yup
  const validationSchema = Yup.object().shape({
    fileEvaluasi: Yup.mixed()
      .required("File Evaluasi harus diisi")
      .test(
        "fileFormat",
        "Hanya file PDF yang diperbolehkan",
        (value) => value && value.type === "application/pdf"
      ),
    noTujuan: Yup.string()
      .matches(/^[0-9]{10,}$/, "Nomor tujuan tidak valid")
      .required("Nomor Tujuan harus diisi"),
  });

  // Handle file upload and WhatsApp message
  const handleUpload = async (values) => {
    const { fileEvaluasi, noTujuan } = values;

    if (!fileEvaluasi || !noTujuan) {
      alert("Please provide both file and WhatsApp number.");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileEvaluasi);

    try {
      const response = await axios.post(`${urlApi}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const filePath = response.data.filePath;
      const fileUrl = `${urlApi}/files/${filePath}`;

      // Kirim pesan ke WhatsApp tanpa baris baru
      const message = `Download file nya disini: ${fileUrl}`;

      // Tambahkan delay sebelum membuka URL WhatsApp
      setTimeout(() => {
        window.open(
          `https://wa.me/${noTujuan}?text=${encodeURIComponent(message)}`
        );
      }, 500); // Delay 500ms
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file.");
    }
  };

  return (
    <div className="send-evaluasi">
      <div className="container">
        <div className="content">
          <p className="title">Kirim Evaluasi</p>
          <Formik
            initialValues={{
              fileEvaluasi: null,
              noTujuan: "",
            }}
            onSubmit={handleUpload}
            validationSchema={validationSchema}
          >
            {({
              errors,
              touched,
              handleSubmit,
              handleChange,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit} className="form-send-evaluasi">
                <div className="form-content">
                  <div className="form-group">
                    <label htmlFor="fileEvaluasi">
                      File Evaluasi <span className="important">*</span>
                    </label>
                    <input
                      type="file"
                      id="fileEvaluasi"
                      name="fileEvaluasi"
                      accept=".pdf"
                      onChange={(event) =>
                        setFieldValue(
                          "fileEvaluasi",
                          event.currentTarget.files[0]
                        )
                      }
                    />
                    {touched.fileEvaluasi && errors.fileEvaluasi ? (
                      <div className="error-form">{errors.fileEvaluasi}</div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="noTujuan">
                      No Tujuan <span className="important">*</span>
                    </label>
                    <input
                      type="text"
                      id="noTujuan"
                      name="noTujuan"
                      placeholder="Enter WhatsApp number"
                      onChange={handleChange}
                    />
                    {touched.noTujuan && errors.noTujuan ? (
                      <div className="error-form">{errors.noTujuan}</div>
                    ) : null}
                  </div>
                </div>
                <div className="button-dua">
                  <button type="submit" className="button-simpan-rps">
                    <BsDatabaseAdd size={16} />
                    <span>Kirim</span>
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>

        <div className="desc">
          <p className="title"><span className="important">*</span>Info</p>
          <ul className="section-text">
            <li className="text-info">Pastikan untuk membuka <span className="wa-desktop">WhatsApp Desktop</span> terlebih dahulu sebelum mengirim evaluasi. Tidak menggunakan <span className="wa-web">WhatsApp Web</span>!</li>
            <li className="text-info wa">Untuk no WhatsApp diawali dengan no Negara (628).</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Layout;
