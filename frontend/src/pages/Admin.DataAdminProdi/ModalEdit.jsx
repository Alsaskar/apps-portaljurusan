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
  fullname: Yup.string().required("Nama harus diisi"),
  email: Yup.string().email("Email tidak valid").required("Email harus diisi"),
  noHp: Yup.string().required("No Hp harus diisi"),
  nip: Yup.string().required("NIP harus diisi"),
  nidn: Yup.string().required("NIDN harus diisi"),
  jenisKelamin: Yup.string().required("Jenis Kelamin harus diisi"),
  tempatLahir: Yup.string().required("Tempat Lahir harus diisi"),
  tglLahir: Yup.string().required("Tanggal Lahir harus diisi"),
  karpeg: Yup.string().required("Karpeg harus diisi"),
  cpns: Yup.string().required("CPNS harus diisi"),
  pns: Yup.string().required("PNS harus diisi"),
  jurusan: Yup.string().required("Jurusan harus diisi"),
  prodi: Yup.string().required("Prodi harus diisi"),
  pendidikanTerakhir: Yup.string().required("Pendidikan Terakhir harus diisi"),
  tahun: Yup.string().required("Tahun harus diisi"),
  gol: Yup.string().required("Gol harus diisi"),
  tmtGolongan: Yup.string().required("TMT Golongan harus diisi"),
  jabatan: Yup.string().required("Jabatan harus diisi"),
  agama: Yup.string().required("Agama harus diisi"),
});

const ModalEdit = ({ data, isOpen, handleClose }) => {
  const [loading, setLoading] = useState(false);

  const dataDefault = useMemo(() => {
    if (!data || !data.user || !data.detaildosens[0]) return {};

    return {
      userId: data.user.id,
      fullname: data.fullname,
      email: data.user.email,
      noHp: data.user.noHp,
      nip:  data.nip,
      nidn: data.nidn,
      jenisKelamin: data.jenisKelamin,
      tempatLahir: data.tempatLahir,
      tglLahir: data.tglLahir,
      karpeg: data.karpeg,
      cpns: data.cpns,
      pns: data.pns,
      jurusan: data.jurusan,
      prodi: data.prodi,
      pendidikanTerakhir: data.detaildosens[0].pendidikanTerakhir,
      tahun: data.detaildosens[0].tahun,
      gol: data.detaildosens[0].gol,
      tmtGolongan: data.detaildosens[0].tmtGolongan,
      jabatan: data.detaildosens[0].jabatan,
      tmtJabatan: data.detaildosens[0].tmtJabatan,
      agama: data.detaildosens[0].agama,
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const _handleSubmit = async (values) => {
    setLoading(true);

    setTimeout(async () => {
      try {
        const res = await axios.put(
          `${urlApi}/dosen/${dataDefault.userId}`,
          {
            fullname: values.fullname,
            email: values.email,
            noHp: values.noHp,
            nip: values.nip,
            nidn: values.nidn,
            jenisKelamin: values.jenisKelamin,
            tempatLahir: values.tempatLahir,
            tglLahir: values.tglLahir,
            karpeg: values.karpeg,
            cpns: values.cpns,
            pns: values.pns,
            jurusan: values.jurusan,
            prodi: values.prodi,
            pendidikanTerakhir: values.pendidikanTerakhir,
            tahun: values.tahun,
            gol: values.gol,
            tmtGolongan: values.tmtGolongan,
            jabatan: values.jabatan,
            tmtJabatan: values.tmtJabatan,
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
  };

  return (
    <>
      {isOpen && (
        <div className="edit-modal fade-in">
          <div className="modal-content-edit fade-in">
            <button onClick={handleClose} className="button-close-modal">
              <IoIosClose size={20} />
            </button>

            <div className="form-add">
              <div className="form-add-container">
                <h3 className="title-edit-dosen">Edit Dosen</h3>

                <Formik
                  initialValues={{
                    fullname: dataDefault.fullname,
                    email: dataDefault.email,
                    noHp: dataDefault.noHp,
                    nip: dataDefault.nip,
                    nidn: dataDefault.nidn,
                    jenisKelamin: dataDefault.jenisKelamin,
                    tempatLahir: dataDefault.tempatLahir,
                    tglLahir: dataDefault.tglLahir,
                    karpeg: dataDefault.karpeg,
                    cpns: dataDefault.cpns,
                    pns: dataDefault.pns,
                    jurusan: dataDefault.jurusan,
                    prodi: dataDefault.prodi,
                    pendidikanTerakhir: dataDefault.pendidikanTerakhir,
                    tahun: dataDefault.tahun,
                    gol: dataDefault.gol,
                    tmtGolongan: dataDefault.tmtGolongan,
                    jabatan: dataDefault.jabatan,
                    tmtJabatan: dataDefault.tmtJabatan,
                    agama: dataDefault.agama,
                  }}
                  onSubmit={_handleSubmit}
                  validationSchema={validationSchema}
                >
                  {({ errors, touched, handleSubmit, handleChange, values }) => (
                    <form method="post" onSubmit={handleSubmit} className="form-edit-dosen">
                      <div className="form-content">
                        <div className="form-group">
                          <label htmlFor="fullname">
                            Nama Lengkap <span className="important">*</span>
                          </label>
                          <input type="text" id="fullname" name="fullname" onChange={handleChange} value={values.fullname} />
                          {touched.fullname && errors.fullname ? <div className="error-form">{errors.fullname}</div> : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">
                            Email <span className="important">*</span>
                          </label>
                          <input type="email" id="email" name="email" onChange={handleChange} value={values.email} />
                          {touched.email && errors.email ? <div className="error-form">{errors.email}</div> : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="noHp">
                            No Hp <span className="important">*</span>
                          </label>
                          <input type="text" id="noHp" name="noHp" onChange={handleChange} value={values.noHp} />
                          {touched.noHp && errors.noHp ? <div className="error-form">{errors.noHp}</div> : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="nip">
                            NIP <span className="important">*</span>
                          </label>
                          <input type="text" id="nip" name="nip" onChange={handleChange} value={values.nip} />
                          {touched.nip && errors.nip ? <div className="error-form">{errors.nip}</div> : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="nidn">
                            NIDN <span className="important">*</span>
                          </label>
                          <input type="text" id="nidn" name="nidn" onChange={handleChange} value={values.nidn} />
                          {touched.nidn && errors.nidn ? <div className="error-form">{errors.nidn}</div> : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="jenisKelamin">
                            Jenis Kelamin <span className="important">*</span>
                          </label>
                          <select id="jenisKelamin" name="jenisKelamin" onChange={handleChange} value={values.jenisKelamin}>
                            {touched.jenisKelamin && errors.jenisKelamin ? <div className="error-form">{errors.jenisKelamin}</div> : null}
                            <option value="">...</option>
                            <option value="laki-laki">Laki-laki</option>
                            <option value="perempuan">Perempuan</option>
                          </select>
                          {touched.jenisKelamin && errors.jenisKelamin ? <div className="error-form">{errors.jenisKelamin}</div> : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="tempatLahir">
                            Tempat Lahir <span className="important">*</span>
                          </label>
                          <input type="text" id="tempatLahir" name="tempatLahir" onChange={handleChange} value={values.tempatLahir} />
                          {touched.tempatLahir && errors.tempatLahir ? <div className="error-form">{errors.tempatLahir}</div> : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="tglLahir">
                            Tanggal Lahir <span className="important">*</span>
                          </label>
                          <input type="date" id="tglLahir" name="tglLahir" onChange={handleChange} value={values.tglLahir} />
                          {touched.tglLahir && errors.tglLahir ? <div className="error-form">{errors.tglLahir}</div> : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="karpeg">
                            Karpeg <span className="important">*</span>
                          </label>
                          <input type="text" id="karpeg" name="karpeg" onChange={handleChange} value={values.karpeg} />
                          {touched.karpeg && errors.karpeg ? <div className="error-form">{errors.karpeg}</div> : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="cpns">
                            CPNS <span className="important">*</span>
                          </label>
                          <input type="text" id="cpns" name="cpns" onChange={handleChange} value={values.cpns} />
                          {touched.cpns && errors.cpns ? <div className="error-form">{errors.cpns}</div> : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="pns">
                            PNS <span className="important">*</span>
                          </label>
                          <input type="text" id="pns" name="pns" onChange={handleChange} value={values.pns} />
                          {touched.pns && errors.pns ? <div className="error-form">{errors.pns}</div> : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="jurusan">
                            Jurusan <span className="important">*</span>
                          </label>
                          <input type="text" id="jurusan" name="jurusan" onChange={handleChange} value={values.jurusan} />
                          {touched.jurusan && errors.jurusan ? <div className="error-form">{errors.jurusan}</div> : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="prodi">
                            Prodi <span className="important">*</span>
                          </label>
                          <select id="status" name="status" onChange={handleChange} value={values.prodi}>
                            <option value="">...</option>
                            <option value="D4 Teknik Informatika">D4 Teknik Informatika</option>
                            <option value="D3 Teknik Komputer">D3 Teknik Komputer</option>
                            <option value="D4 Teknik Listrik">D4 Teknik Listrik</option>
                            <option value="D3 Teknik Listrik">D3 Teknik Listrik</option>
                          </select>
                          {touched.prodi && errors.prodi ? <div className="error-form">{errors.prodi}</div> : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="pendidikanTerakhir">
                            Pendidikan Terakhir <span className="important">*</span>
                          </label>
                          <input type="text" id="pendidikanTerakhir" name="pendidikanTerakhir" onChange={handleChange} value={values.pendidikanTerakhir} />
                          {touched.pendidikanTerakhir && errors.pendidikanTerakhir ? <div className="error-form">{errors.pendidikanTerakhir}</div> : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="tahun">
                            Tahun <span className="important">*</span>
                          </label>
                          <input type="text" id="tahun" name="tahun" onChange={handleChange} value={values.tahun} />
                          {touched.tahun && errors.tahun ? <div className="error-form">{errors.tahun}</div> : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="gol">
                            Golongan <span className="important">*</span>
                          </label>
                          <input type="text" id="gol" name="gol" onChange={handleChange} value={values.gol} />
                          {touched.gol && errors.gol ? <div className="error-form">{errors.gol}</div> : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="tmtGolongan">
                            TMT Golongan <span className="important">*</span>
                          </label>
                          <input type="date" id="tmtGolongan" name="tmtGolongan" onChange={handleChange} value={values.tmtGolongan} />
                          {touched.tmtGolongan && errors.tmtGolongan ? <div className="error-form">{errors.tmtGolongan}</div> : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="jabatan">
                            Jabatan <span className="important">*</span>
                          </label>
                          <input type="text" id="jabatan" name="jabatan" onChange={handleChange} value={values.jabatan} />
                          {touched.jabatan && errors.jabatan ? <div className="error-form">{errors.jabatan}</div> : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="tmtJabatan">
                            TMT Jabatan <span className="important">*</span>
                          </label>
                          <input type="date" id="tmtJabatan" name="tmtJabatan" onChange={handleChange} value={values.tmtJabatan} />
                          {touched.tmtJabatan && errors.tmtJabatan ? <div className="error-form">{errors.tmtJabatan}</div> : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="agama">
                            Agama <span className="important">*</span>
                          </label>
                          <select id="agama" name="agama" onChange={handleChange} value={values.agama}>
                            <option value="">...</option>
                            <option value="Kristen Protestan">Kristen Protestan</option>
                            <option value="Katolik">Katolik</option>
                            <option value="Islam">Islam</option>
                            <option value="Hindu">Hindu</option>
                            <option value="Buddha">Buddha</option>
                            <option value="Konghucu">Konghucu</option>
                          </select>
                          {touched.agama && errors.agama ? <div className="error-form">{errors.agama}</div> : null}
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
};

export default ModalEdit;
