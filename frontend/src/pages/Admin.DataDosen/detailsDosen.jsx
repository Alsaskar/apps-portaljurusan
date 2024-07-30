import "./detailsDosen.scss";
import axios from "axios";
import ProfilNoImage from "../../assets/images/profile_no_image.png";
import { urlApi } from "../../config";
import { Field, Formik } from "formik";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { formatTanggal } from "../../hooks/mainHooks";

const AdminDetailsDosen = () => {
  const [dosen, setDosen] = useState([]);
  const [user, setUser] = useState([]);
  const [detailDosen, setDetailDosen] = useState([]);
  const { id } = useParams();

  const _getDosen = useCallback(async () => {
    try {
      const res = await axios.get(`${urlApi}/dosen/${id}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });

      setDosen(res.data.result);
      setUser(res.data.result.user);
      setDetailDosen(res.data.result.detaildosens[0]);
    } catch (err) {
      console.log(err);
    }
  }, [id]); 

  useEffect(() => {
    _getDosen();
  }, [_getDosen]);

  return (
    <div className="detail-dosen">
      <div className="profile-dosen">
        <img src={ProfilNoImage} alt="profile-dosen" className="img-dosen" />
        <div className="profile-content">
          <div className="profile-detail">
            <p className="label-name">Nama</p>
            <p className="content-name">{dosen.fullname === undefined ? "Loading..." : dosen.fullname}</p>
          </div>
          <div className="profile-detail">
            <p className="label-name">NIP</p>
            <p className="content-name">{dosen.nip === undefined ? "Loading..." : dosen.nip}</p>
          </div>
          <div className="profile-detail">
            <p className="label-name">NIDN</p>
            <p className="content-name">{dosen.nidn === undefined ? "Loading..." : dosen.nidn}</p>
          </div>
          <div className="profile-detail">
            <p className="label-name">Email</p>
            <p className="content-name">{user.email === undefined ? "Loading..." : user.email}</p>
          </div>
          <div className="profile-detail">
            <p className="label-name">Prodi</p>
            <p className="content-name">{dosen.prodi === undefined ? "Loading..." : dosen.prodi}</p>
          </div>
          <div className="profile-detail">
            <p className="label-name">Jenis Kelamin</p>
            <p className="content-name">{dosen.jenisKelamin === undefined ? "Loading..." : dosen.jenisKelamin}</p>
          </div>
          <div className="profile-detail">
            <p className="label-name">Tempat Tanggal Lahir</p>
            <p className="content-name">
              {dosen.tempatLahir === undefined ? "Loading..." : dosen.tempatLahir}, {dosen.tglLahir === undefined ? "Loading..." : formatTanggal(dosen.tglLahir)}
            </p>
          </div>
        </div>
      </div>

      {/*form details dosen*/}
      <div className="details-dosen">
        <div className="form-add">
          <div className="form-add-container">
            <h3>Details Dosen</h3>

            <Formik
              initialValues={{}}
              onSubmit={() => {
                console.log("Prong");
              }}
            >
              {({ handleSubmit }) => (
                <form method="post" onSubmit={handleSubmit} className="form-add-dosen">
                  <div className="form-content">
                    <div className="form-group">
                      <label htmlFor="noHp">
                        No Hp <span className="important">*</span>
                      </label>
                      <Field type="text" id="noHp" name="noHp" onChange={() => {}} value={user.noHp} disabled />
                    </div>
                    <div className="form-group">
                      <label htmlFor="tglLahir">
                        Tanggal Lahir <span className="important">*</span>
                      </label>
                      <Field type="date" id="tglLahir" name="tglLahir" onChange={() => {}} value={dosen.tglLahir} disabled />
                    </div>
                    <div className="form-group">
                      <label htmlFor="karpeg">
                        Karpeg <span className="important">*</span>
                      </label>
                      <Field type="text" id="karpeg" name="karpeg" onChange={() => {}} value={dosen.karpeg} disabled />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cpns">
                        CPNS <span className="important">*</span>
                      </label>
                      <Field type="text" id="cpns" name="cpns" onChange={() => {}} value={dosen.cpns} disabled />
                    </div>
                    <div className="form-group">
                      <label htmlFor="pns">
                        PNS <span className="important">*</span>
                      </label>
                      <Field type="text" id="pns" name="pns" onChange={() => {}} value={dosen.pns} disabled />
                    </div>
                    <div className="form-group">
                      <label htmlFor="jurusan">
                        Jurusan <span className="important">*</span>
                      </label>
                      <Field type="text" id="jurusan" name="jurusan" onChange={() => {}} value={dosen.jurusan} disabled />
                    </div>
                    <div className="form-group">
                      <label htmlFor="pendidikanTerakhir">
                        Pendidikan Terakhir <span className="important">*</span>
                      </label>
                      <Field type="text" id="pendidikanTerakhir" name="pendidikanTerakhir" onChange={() => {}} value={detailDosen.pendidikanTerakhir} disabled />
                    </div>
                    <div className="form-group">
                      <label htmlFor="tahun">
                        Tahun <span className="important">*</span>
                      </label>
                      <Field type="text" id="tahun" name="tahun" onChange={() => {}} value={detailDosen.tahun} disabled />
                    </div>
                    <div className="form-group">
                      <label htmlFor="gol">
                        Gol <span className="important">*</span>
                      </label>
                      <Field type="text" id="gol" name="gol" onChange={() => {}} value={detailDosen.gol} disabled />
                    </div>
                    <div className="form-group">
                      <label htmlFor="tmtGolongan">
                        TMT Golongan <span className="important">*</span>
                      </label>
                      <Field type="email" id="tmtGolongan" name="tmtGolongan" onChange={() => {}} value={detailDosen.tmtGolongan} disabled />
                    </div>
                    <div className="form-group">
                      <label htmlFor="tmtJabatan">
                        TMT Jabatan <span className="important">*</span>
                      </label>
                      <Field type="text" id="tmtJabatan" name="tmtJabatan" onChange={() => {}} value={detailDosen.tmtJabatan} disabled />
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDetailsDosen;
