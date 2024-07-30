import "./style.scss";
import { BsDatabaseAdd } from "react-icons/bs";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { urlApi } from "../../config";

const validationSchema = Yup.object().shape({
  fullname: Yup.string().required("Nama harus diisi"),
  email: Yup.string().email("Email tidak valid").required("Email harus diisi"),
  password: Yup.string().min(6, "Password minimal 6 karakter").required("Password harus diisi"),
  noHp: Yup.string().required("No Hp harus diisi"),
  username: Yup.string().required("Username harus diisi"),
  nip: Yup.string().required("NIP harus diisi"),
  nidn: Yup.string().required("NIDN harus diisi"),
  tempatLahir: Yup.string().required("Tempat Lahir harus diisi"),
  tglLahir: Yup.string().required("Tanggal Lahir harus diisi"),
  karpeg: Yup.string().required("Karpeg harus diisi"),
  cpsn: Yup.string().required("CPNS harus diisi"),
  pns: Yup.string().required("PNS harus diisi"),
  jurusan: Yup.string().required("Jurusan harus diisi"),
  prodi: Yup.string().required("Prodi harus diisi"),
  pendidikanTerakhir: Yup.string().required("Pendidikan Terakhir harus diisi"),
  tahun: Yup.string().required("Tahun harus diisi"),
  gol: Yup.string().required("Golongan harus diisi"),
  tmtGolongan: Yup.string().required("TMT Golongan Satu harus diisi"),
  tmtJabatan: Yup.string().required("TMT Jabatan harus diisi"),
  jabatan: Yup.string().required("Jabatan harus diisi"),
  agama: Yup.string().required("Agama harus diisi"),
});

const Layout = () => {
  const [loading, setLoading] = useState(false);

  const _handleSubmit = async (values, { resetForm }) => {
    setLoading(true);

    setTimeout(async () => {
      try {
        const res = await axios.post(
          `${urlApi}/dosen`,
          {
            fullname: values.fullname,
            email: values.email,
            password: values.password,
            noHp: values.noHp,
            username: values.username,
            nip: values.nip,
            nidn: values.nidn,
            jenisKelamin: values.jenisKelamin,
            tempatLahir: values.tempatLahir,
            tglLahir: values.tglLahir,
            karpeg: values.karpeg,
            cpsn: values.cpns,
            pns: values.pns,
            jurusan: values.jurusan,
            prodi: values.prodi,
            pendidikanTerakhir: values.pendidikanTerakhir,
            tahun: values.tahun,
            gol: values.gol,
            tmtGolongan: values.tmtGolongan,
            tmtJabatan: values.tmtJabatan,
            jabatan: values.jabatan,
            agama: values.agama,
          },
          { headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` } }
        );

        Swal.fire({
          title: "Berhasil",
          text: res.data.message,
          icon: "success",
          confirmButtonText: "Ok",
        });

        setLoading(false);
        resetForm();
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
  };

  return (
    <div className="form-add">
      <div className="form-add-container">
        <h3>Tambah Dosen</h3>

        <Formik
          initialValues={{
            fullname: "",
            email: "",
            password: "",
            noHp: "",
            username: "",
            nip: "",
            nidn: "",
            jenisKelamin: "",
            tempatLahir: "",
            tglLahir: "",
            karpeg: "",
            cpsn: "",
            pns: "",
            jurusan: "",
            prodi: "",
            pendidikanTerakhir: "",
            tahun: "",
            gol: "",
            tmtGolongan: "",
            tmtJabatan: "",
            jabatan: "",
            agama: "",
          }}
          onSubmit={_handleSubmit}
          validationSchema={validationSchema}
        >
          {({ errors, touched, handleSubmit, handleChange }) => (
            <form method="post" onSubmit={handleSubmit} className="form-add-dosen">
              <div className="form-content">
                <div className="form-group">
                  <label htmlFor="fullname">
                    Nama Lengkap <span className="important">*</span>
                  </label>
                  <Field type="text" id="fullname" name="fullname" onChange={handleChange} />
                  {touched.fullname && errors.fullname ? <div className="error-form">{errors.fullname}</div> : null}
                </div>
                <div className="form-group">
                  <label htmlFor="email">
                    Email <span className="important">*</span>
                  </label>
                  <Field type="email" id="email" name="email" onChange={handleChange} />
                  {touched.email && errors.email ? <div className="error-form">{errors.email}</div> : null}
                </div>
                <div className="form-group">
                  <label htmlFor="password">
                    Password <span className="important">*</span>
                  </label>
                  <Field type="text" id="password" name="password" onChange={handleChange} />
                  {touched.password && errors.password ? <div className="error-form">{errors.password}</div> : null}
                </div>
                <div className="form-group">
                  <label htmlFor="noHp">
                    No Hp <span className="important">*</span>
                  </label>
                  <Field type="text" id="noHp" name="noHp" onChange={handleChange} />
                  {touched.noHp && errors.noHp ? <div className="error-form">{errors.noHp}</div> : null}
                </div>
                <div className="form-group">
                  <label htmlFor="username">
                    Username <span className="important">*</span>
                  </label>
                  <Field type="text" id="username" name="username" onChange={handleChange} />
                  {touched.username && errors.username ? <div className="error-form">{errors.username}</div> : null}
                </div>
                <div className="form-group">
                  <label htmlFor="nip">
                    NIP <span className="important">*</span>
                  </label>
                  <Field type="text" id="nip" name="nip" onChange={handleChange} />
                  {touched.nip && errors.nip ? <div className="error-form">{errors.nip}</div> : null}
                </div>
                <div className="form-group">
                  <label htmlFor="nidn">
                    NIDN <span className="important">*</span>
                  </label>
                  <Field type="text" id="nidn" name="nidn" onChange={handleChange} />
                  {touched.nidn && errors.nidn ? <div className="error-form">{errors.nidn}</div> : null}
                </div>
                <div className="form-group">
                  <label htmlFor="jenisKelamin">
                    Jenis Kelamin <span className="important">*</span>
                  </label>
                  <Field as="select" id="jenisKelamin" name="jenisKelamin" onChange={handleChange}>
                    <option value="">...</option>
                    <option value="laki-laki">Laki-Laki</option>
                    <option value="perempuan">Perempuan</option>
                  </Field>
                  {touched.jenisKelamin && errors.jenisKelamin ? <div className="error-form">{errors.jenisKelamin}</div> : null}
                </div>
                <div className="form-group">
                  <label htmlFor="tempatLahir">
                    Tempat Lahir <span className="important">*</span>
                  </label>
                  <Field type="text" id="tempatLahir" name="tempatLahir" onChange={handleChange} />
                  {touched.tempatLahir && errors.tempatLahir ? <div className="error-form">{errors.tempatLahir}</div> : null}
                </div>
                <div className="form-group">
                  <label htmlFor="tglLahir">
                    Tanggal Lahir <span className="important">*</span>
                  </label>
                  <Field type="date" id="tglLahir" name="tglLahir" onChange={handleChange} />
                  {touched.tglLahir && errors.tglLahir ? <div className="error-form">{errors.tglLahir}</div> : null}
                </div>
                <div className="form-group">
                  <label htmlFor="karpeg">
                    Karpeg <span className="important">*</span>
                  </label>
                  <Field type="text" id="karpeg" name="karpeg" onChange={handleChange} />
                  {touched.karpeg && errors.karpeg ? <div className="error-form">{errors.karpeg}</div> : null}
                </div>
                <div className="form-group">
                  <label htmlFor="cpsn">
                    CPNS <span className="important">*</span>
                  </label>
                  <Field type="text" id="cpsn" name="cpsn" onChange={handleChange} />
                  {touched.cpsn && errors.cpsn ? <div className="error-form">{errors.cpsn}</div> : null}
                </div>
                <div className="form-group">
                  <label htmlFor="pns">
                    PNS <span className="important">*</span>
                  </label>
                  <Field type="text" id="pns" name="pns" onChange={handleChange} />
                  {touched.pns && errors.pns ? <div className="error-form">{errors.pns}</div> : null}
                </div>
                <div className="form-group">
                  <label htmlFor="jurusan">
                    Jurusan <span className="important">*</span>
                  </label>
                  <Field type="text" id="jurusan" name="jurusan" onChange={handleChange} />
                  {touched.jurusan && errors.jurusan ? <div className="error-form">{errors.jurusan}</div> : null}
                </div>
                <div className="form-group">
                  <label htmlFor="prodi">
                    Prodi <span className="important">*</span>
                  </label>
                  <Field as="select" id="prodi" name="prodi" onChange={handleChange}>
                    <option value="">...</option>
                    <option value="D4 Teknik Informatika">D4 Teknik Informatika</option>
                    <option value="D3 Teknik Komputer">D3 Teknik Komputer</option>
                    <option value="D4 Teknik Listrik">D4 Teknik Listrik</option>
                    <option value="D3 Teknik Listrik">D3 Teknik Listrik</option>
                  </Field>
                  {touched.prodi && errors.prodi ? <div className="error-form">{errors.prodi}</div> : null}
                </div>
                <div className="form-group">
                  <label htmlFor="pendidikanTerakhir">
                    Pendidikan Terakhir <span className="important">*</span>
                  </label>
                  <Field type="text" id="pendidikanTerakhir" name="pendidikanTerakhir" onChange={handleChange} />
                  {touched.pendidikanTerakhir && errors.pendidikanTerakhir ? <div className="error-form">{errors.pendidikanTerakhir}</div> : null}
                </div>
                <div className="form-group">
                  <label htmlFor="tahun">
                    Tahun <span className="important">*</span>
                  </label>
                  <Field type="text" id="tahun" name="tahun" onChange={handleChange} />
                  {touched.tahun && errors.tahun ? <div className="error-form">{errors.tahun}</div> : null}
                </div>
                <div className="form-group">
                  <label htmlFor="gol">
                    Gol <span className="important">*</span>
                  </label>
                  <Field type="text" id="gol" name="gol" onChange={handleChange} />
                  {touched.gol && errors.gol ? <div className="error-form">{errors.gol}</div> : null}
                </div>
                <div className="form-group">
                  <label htmlFor="tmtGolongan">
                    TMT Golongan <span className="important">*</span>
                  </label>
                  <Field type="date" id="tmtGolongan" name="tmtGolongan" onChange={handleChange} />
                  {touched.tmtGolongan && errors.tmtGolongan ? <div className="error-form">{errors.tmtGolongan}</div> : null}
                </div>
                <div className="form-group">
                  <label htmlFor="tmtJabatan">
                    TMT Jabatan <span className="important">*</span>
                  </label>
                  <Field type="date" id="tmtJabatan" name="tmtJabatan" onChange={handleChange} />
                  {touched.tmtJabatan && errors.tmtJabatan ? <div className="error-form">{errors.tmtJabatan}</div> : null}
                </div>
                <div className="form-group">
                  <label htmlFor="jabatan">
                    Jabatan <span className="important">*</span>
                  </label>
                  <Field type="text" id="jabatan" name="jabatan" onChange={handleChange} />
                  {touched.jabatan && errors.jabatan ? <div className="error-form">{errors.jabatan}</div> : null}
                </div>
                <div className="form-group">
                  <label htmlFor="agama">
                    Agama <span className="important">*</span>
                  </label>
                  <Field as="select" id="agama" name="agama" onChange={handleChange}>
                    <option value="">...</option>
                    <option value="Kristen">Kristen</option>
                    <option value="Katolik">Katolik</option>
                    <option value="Islam">Islam</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Buddha">Buddha</option>
                    <option value="Konghucu">Konghucu</option>
                  </Field>
                  {touched.agama && errors.agama ? <div className="error-form">{errors.agama}</div> : null}
                </div>
              </div>
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
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Layout;
