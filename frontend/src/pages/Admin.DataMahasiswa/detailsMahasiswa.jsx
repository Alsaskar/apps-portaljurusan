import "./detailsMahasiswa.scss";
import ProfilNoImage from "../../assets/images/profile_no_image.png";
import Swal from "sweetalert2";
import axios from "axios";
import { urlApi, urlStatic } from "../../config";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { useEffect, useState, useCallback } from "react";
import { BsDatabaseAdd } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { MdEditSquare  } from "react-icons/md";
import ModalEditDetails from "./ModalEditDetails";
import useFormatDate from "../../hooks/useFormatDateHooks";

const validationSchema = Yup.object().shape({
  statusMahasiswa: Yup.string().required("Status Mahasiswa harus diisi"),
  tahunTamatSmta: Yup.string().required("Tahun Tamat SMTA harus diisi"),
  jurusanDiSmta: Yup.string().required("Jurusan Di SMTA harus diisi"),
  tglIjazahSmta: Yup.string().required("Tanggal Ijazah SMTA harus diisi"),
  nilaiUjianAkhirSmta: Yup.string().required("Nilai Ujian Akhir SMTA harus diisi"),
  namaOrtuWali: Yup.string().required("Nama Orangtua Wali harus diisi"),
  pendapatanOrtuWali: Yup.string().required("Pendapatan Orangtua Wali harus diisi"),
  alamatWali: Yup.string().required("Alamat Wali harus diisi"),
  kotaWali: Yup.string().required("Kota Wali harus diisi"),
  kodePosWali: Yup.string().required("Kode Pos Wali harus diisi"),
  noHpWali: Yup.string().required("No Hp Wali harus diisi"),
  emailWali: Yup.string().required("Email Wali harus diisi").email("Email tidak valid"),
});

const AdminDetailsMahasiswa = () => {
  const [loading, setLoading] = useState(false);
  const [mahasiswa, setMahasiswa] = useState([]);
  const [user, setUser] = useState([]);
  const [detailMahasiswa, setDetailMahasiswa] = useState([]);
  const [cekDetail, setCekDetail] = useState(0);
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { formatDate } = useFormatDate();

  const handleEditDetailsClick = () => {
    // console.log('Edit Modal')
    setIsModalOpen(true);
  };

  const handleCloseEditDetailsModal = () => {
    setIsModalOpen(false);
  };



  const _getMahasiswa = useCallback(async () => {
    try {
      const res = await axios.get(`${urlApi}/mahasiswa/${id}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });

      setMahasiswa(res.data.result);
      setUser(res.data.result.user);
      setDetailMahasiswa(res.data.result.detailmahasiswas[0]);
      setCekDetail(res.data.result.detailmahasiswas.length);
      console.log(res.data.result);
    } catch (err) {
      console.log(err);
    }
  }, [id]); 

  useEffect(() => {
    _getMahasiswa();
  }, [_getMahasiswa]);

  const _handleSubmit = async (values) => {
    setLoading(true);

    setTimeout(async () => {
      try {
        const res = await axios.post(
          `${urlApi}/mahasiswa/add-detail?idMahasiswa=${id}`,
          {
            statusMahasiswa: values.statusMahasiswa,
            tahunTamatSmta: values.tahunTamatSmta,
            jurusanDiSmta: values.jurusanDiSmta,
            tglIjazahSmta: values.tglIjazahSmta,
            nilaiUjianAkhirSmta: values.nilaiUjianAkhirSmta,
            namaOrtuWali: values.namaOrtuWali,
            pendapatanOrtuWali: values.pendapatanOrtuWali,
            alamatWali: values.alamatWali,
            kotaWali: values.kotaWali,
            kodePosWali: values.kodePosWali,
            noHpWali: values.noHpWali,
            emailWali: values.emailWali,
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
    <div className="detail-mahasiswa">
      <div className="profile-mahasiswa">
        {mahasiswa.foto === undefined ? "Loading..." : <img src={mahasiswa.foto === "" ? ProfilNoImage : `${urlStatic}/img-mahasiswa/${mahasiswa.foto}`} alt="profile-mahasiswa" className="img-mahasiswa" />}

        <div className="profile-content">
          <div className="profile-detail">
            <p className="label-name">Nama</p>
            <p className="content-name">{mahasiswa.fullname === undefined ? "Loading..." : mahasiswa.fullname}</p>
          </div>
          <div className="profile-detail">
            <p className="label-name">NIM</p>
            <p className="content-name">{mahasiswa.nim === undefined ? "Loading..." : mahasiswa.nim}</p>
          </div>
          <div className="profile-detail">
            <p className="label-name">Email</p>
            <p className="content-name">{user.email === undefined ? "Loading..." : user.email}</p>
          </div>
          <div className="profile-detail">
            <p className="label-name">Prodi</p>
            <p className="content-name">{mahasiswa.prodi === undefined ? "Loading..." : mahasiswa.prodi}</p>
          </div>
          <div className="profile-detail">
            <p className="label-name">No Telephone</p>
            <p className="content-name">{user.noHp === undefined ? "Loading..." : user.noHp}</p>
          </div>
          <div className="profile-detail">
            <p className="label-name">Jenis Kelamin</p>
            <p className="content-name">{mahasiswa.jenisKelamin === undefined ? "Loading..." : mahasiswa.jenisKelamin}</p>
          </div>
          <div className="profile-detail">
            <p className="label-name">Tempat Tanggal Lahir</p>
            <p className="content-name">
              {mahasiswa.kotaLahir === undefined ? "Loading..." : mahasiswa.kotaLahir}, {mahasiswa.tglLahir === undefined ? "Loading..." : formatDate(mahasiswa.tglLahir)}
            </p>
          </div>
        </div>
      </div>
      
      {/*modal*/}
      <ModalEditDetails isOpen={isModalOpen} handleClose={handleCloseEditDetailsModal} data={detailMahasiswa} />

      {/*form details mahasiswa*/}
      <div className="details-mahasiswa">
        <div className="form-add">
          <div className="form-add-container">
            <h3>Details Mahasiswa</h3>

            {cekDetail > 0 ? ( // jika data sudah ada
              <form method="post" className="form-add-mahasiswa">
                <div className="form-content">
                  <div className="form-group">
                    <label htmlFor="statusMahasiswa">
                      Status Mahasiswa <span className="important">*</span>
                    </label>
                    <select id="statusMahasiswa" name="statusMahasiswa" onChange={() => {}} value={detailMahasiswa.statusMahasiswa} disabled>
                      <option value="">...</option>
                      <option value="Aktif">Aktif</option>
                      <option value="Tidak Aktif">Tidak Aktif</option>
                      <option value="Cuti">Cuti</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="tahunTamatSmta">
                      Tahun Tamat Smta <span className="important">*</span>
                    </label>
                    <input type="text" id="tahunTamatSmta" name="tahunTamatSmta" onChange={() => {}} value={detailMahasiswa.tahunTamatSmta} disabled />
                  </div>
                  <div className="form-group">
                    <label htmlFor="jurusanDiSmta">
                      Jurusan SMTA <span className="important">*</span>
                    </label>
                    <input type="text" id="jurusanDiSmta" name="jurusanDiSmta" onChange={() => {}} value={detailMahasiswa.jurusanDiSmta} disabled />
                  </div>
                  <div className="form-group">
                    <label htmlFor="tglIjazahSmta">
                      Tanggal Ijazah Smta <span className="important">*</span>
                    </label>
                    <input type="date" id="tglIjazahSmta" name="tglIjazahSmta" onChange={() => {}} value={detailMahasiswa.tglIjazahSmta} disabled />
                  </div>
                  <div className="form-group">
                    <label htmlFor="nilaiUjianAkhirSmta">
                      Nilai Ujian Akhir Smta <span className="important">*</span>
                    </label>
                    <input type="text" id="nilaiUjianAkhirSmta" name="nilaiUjianAkhirSmta" onChange={() => {}} value={detailMahasiswa.nilaiUjianAkhirSmta} disabled />
                  </div>
                  <div className="form-group">
                    <label htmlFor="namaOrtuWali">
                      Nama Orangtua Wali <span className="important">*</span>
                    </label>
                    <input type="text" id="namaOrtuWali" name="namaOrtuWali" onChange={() => {}} value={detailMahasiswa.namaOrtuWali} disabled />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pendapatanOrtuWali">
                      Pendapatan Orangtua Wali <span className="important">*</span>
                    </label>
                    <input type="text" id="pendapatanOrtuWali" name="pendapatanOrtuWali" onChange={() => {}} value={detailMahasiswa.pendapatanOrtuWali} disabled />
                  </div>
                  <div className="form-group">
                    <label htmlFor="alamatWali">
                      Alamat Wali <span className="important">*</span>
                    </label>
                    <input type="text" id="alamatWali" name="alamatWali" onChange={() => {}} value={detailMahasiswa.alamatWali} disabled />
                  </div>
                  <div className="form-group">
                    <label htmlFor="kotaWali">
                      Kota Wali <span className="important">*</span>
                    </label>
                    <input type="text" id="kotaWali" name="kotaWali" onChange={() => {}} value={detailMahasiswa.kotaWali} disabled />
                  </div>
                  <div className="form-group">
                    <label htmlFor="kodePosWali">
                      Kode Pos Wali <span className="important">*</span>
                    </label>
                    <input type="text" id="kodePosWali" name="kodePosWali" onChange={() => {}} value={detailMahasiswa.kodePosWali} disabled />
                  </div>
                  <div className="form-group">
                    <label htmlFor="noHpWali">
                      No Hp Wali <span className="important">*</span>
                    </label>
                    <input type="text" id="noHpWali" name="noHpWali" onChange={() => {}} value={detailMahasiswa.noHpWali} disabled />
                  </div>
                  <div className="form-group">
                    <label htmlFor="emailWali">
                      Email Wali <span className="important">*</span>
                    </label>
                    <input type="email" id="emailWali" name="emailWali" onChange={() => {}} value={detailMahasiswa.emailWali} disabled />
                  </div>
                </div>

                <div onClick={handleEditDetailsClick} className="button-edit-detail">
                 <MdEditSquare size={18} /> Edit
                </div>
              </form>
            ) : (
              // jika data belum data

              <Formik
                initialValues={{
                  statusMahasiswa: "",
                  tahunTamatSmta: "",
                  jurusanDiSmta: "",
                  tglIjazahSmta: "",
                  nilaiUjianAkhirSmta: "",
                  namaOrtuWali: "",
                  pendapatanOrtuWali: "",
                  alamatWali: "",
                  kotaWali: "",
                  kodePosWali: "",
                  noHpWali: "",
                  emailWali: "",
                }}
                onSubmit={_handleSubmit}
                validationSchema={validationSchema}
              >
                {({ errors, touched, handleSubmit, handleChange }) => (
                  <form method="post" onSubmit={handleSubmit} className="form-add-mahasiswa">
                    <div className="form-content">
                      <div className="form-group">
                        <label htmlFor="statusMahasiswa">
                          Status Mahasiswa <span className="important">*</span>
                        </label>
                        <Field as="select" id="statusMahasiswa" name="statusMahasiswa" onChange={handleChange}>
                          <option value="">...</option>
                          <option value="Aktif">Aktif</option>
                          <option value="Tidak Aktif">Tidak Aktif</option>
                          <option value="Cuti">Cuti</option>
                        </Field>
                        {touched.statusMahasiswa && errors.statusMahasiswa ? <div className="error-form">{errors.statusMahasiswa}</div> : null}
                      </div>
                      <div className="form-group">
                        <label htmlFor="tahunTamatSmta">
                          Tahun Tamat Smta <span className="important">*</span>
                        </label>
                        <Field type="text" id="tahunTamatSmta" name="tahunTamatSmta" onChange={handleChange} />
                        {touched.tahunTamatSmta && errors.tahunTamatSmta ? <div className="error-form">{errors.tahunTamatSmta}</div> : null}
                      </div>
                      <div className="form-group">
                        <label htmlFor="jurusanDiSmta">
                          Jurusan SMTA <span className="important">*</span>
                        </label>
                        <Field type="text" id="jurusanDiSmta" name="jurusanDiSmta" onChange={handleChange} />
                        {touched.jurusanDiSmta && errors.jurusanDiSmta ? <div className="error-form">{errors.jurusanDiSmta}</div> : null}
                      </div>
                      <div className="form-group">
                        <label htmlFor="tglIjazahSmta">
                          Tanggal Ijazah Smta <span className="important">*</span>
                        </label>
                        <Field type="date" id="tglIjazahSmta" name="tglIjazahSmta" onChange={handleChange} />
                        {touched.tglIjazahSmta && errors.tglIjazahSmta ? <div className="error-form">{errors.tglIjazahSmta}</div> : null}
                      </div>
                      <div className="form-group">
                        <label htmlFor="nilaiUjianAkhirSmta">
                          Nilai Ujian Akhir Smta <span className="important">*</span>
                        </label>
                        <Field type="text" id="nilaiUjianAkhirSmta" name="nilaiUjianAkhirSmta" onChange={handleChange} />
                        {touched.nilaiUjianAkhirSmta && errors.nilaiUjianAkhirSmta ? <div className="error-form">{errors.nilaiUjianAkhirSmta}</div> : null}
                      </div>
                      <div className="form-group">
                        <label htmlFor="namaOrtuWali">
                          Nama Orangtua Wali <span className="important">*</span>
                        </label>
                        <Field type="text" id="namaOrtuWali" name="namaOrtuWali" onChange={handleChange} />
                        {touched.namaOrtuWali && errors.namaOrtuWali ? <div className="error-form">{errors.namaOrtuWali}</div> : null}
                      </div>
                      <div className="form-group">
                        <label htmlFor="pendapatanOrtuWali">
                          Pendapatan Orangtua Wali <span className="important">*</span>
                        </label>
                        <Field type="text" id="pendapatanOrtuWali" name="pendapatanOrtuWali" onChange={handleChange} />
                        {touched.pendapatanOrtuWali && errors.pendapatanOrtuWali ? <div className="error-form">{errors.pendapatanOrtuWali}</div> : null}
                      </div>
                      <div className="form-group">
                        <label htmlFor="alamatWali">
                          Alamat Wali <span className="important">*</span>
                        </label>
                        <Field type="text" id="alamatWali" name="alamatWali" onChange={handleChange} />
                        {touched.alamatWali && errors.alamatWali ? <div className="error-form">{errors.alamatWali}</div> : null}
                      </div>
                      <div className="form-group">
                        <label htmlFor="kotaWali">
                          Kota Wali <span className="important">*</span>
                        </label>
                        <Field type="text" id="kotaWali" name="kotaWali" onChange={handleChange} />
                        {touched.kotaWali && errors.kotaWali ? <div className="error-form">{errors.kotaWali}</div> : null}
                      </div>
                      <div className="form-group">
                        <label htmlFor="kodePosWali">
                          Kode Pos Wali <span className="important">*</span>
                        </label>
                        <Field type="text" id="kodePosWali" name="kodePosWali" onChange={handleChange} />
                        {touched.kodePosWali && errors.kodePosWali ? <div className="error-form">{errors.kodePosWali}</div> : null}
                      </div>
                      <div className="form-group">
                        <label htmlFor="noHpWali">
                          No Hp Wali <span className="important">*</span>
                        </label>
                        <Field type="text" id="noHpWali" name="noHpWali" onChange={handleChange} />
                        {touched.noHpWali && errors.noHpWali ? <div className="error-form">{errors.noHpWali}</div> : null}
                      </div>
                      <div className="form-group">
                        <label htmlFor="emailWali">
                          Email Wali <span className="important">*</span>
                        </label>
                        <Field type="email" id="emailWali" name="emailWali" onChange={handleChange} />
                        {touched.emailWali && errors.emailWali ? <div className="error-form">{errors.emailWali}</div> : null}
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDetailsMahasiswa;
