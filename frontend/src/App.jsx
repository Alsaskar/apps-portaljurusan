import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./pages/PrivateRoutes";

import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./pages/Admin.Dashboard";
import AdminAddMahasiswa from "./pages/Admin.AddMahasiswa";
import AdminDataMahasiswa from "./pages/Admin.DataMahasiswa";
import AdminAddDosen from "./pages/Admin.AddDosen";
import AdminDataDosen from "./pages/Admin.DataDosen";
import AdminAddRPS from "./pages/Admin.AddRPS";
import AdminDaftarRPS from "./pages/Admin.DaftarRPS";
import AdminAddJadwal from "./pages/Admin.AddJadwal";
import AdminDetailsMahasiswa from "./pages/Admin.DataMahasiswa/detailsMahasiswa";
import AdminDetailsDosen from "./pages/Admin.DataDosen/detailsDosen";
import AdminAddBimbingan from "./pages/Admin.AddBimbingan/Layout";
import AdminDataBimbingan from "./pages/Admin.DataBimbingan";
import AdminAddEvaluasi from "./pages/Admin.AddEvaluasi/Layout";
import AdminEvaluasi from "./pages/Admin.Evaluasi";
import AdminFileEvaluasi from "./pages/Admin.FileEvaluasi";
import AdminSendEvaluasi from "./pages/Admin.SendEvaluasi";
import AdminProfileHME from "./pages/Admin.ProfileHME";
import AdminPendaftaranHME from "./pages/Admin.PendaftaranHME";
import AdminAnggotaHME from "./pages/Admin.AnggotaHME";
import AdminKegiatanHME from "./pages/Admin.KegiatanHME";
import AdminMonitoringLogin from "./pages/Admin.MonitoringLogin";
import AdminDaftarIP from "./pages/Admin.DaftarIP";

import MahasiswaLayout from "./layout/MahasiswaLayout";
import MahasiswaDashboard from "./pages/Mahasiswa.Dashboard";
import MahasiswaProfile from "./pages/Mahasiswa.Profile";
import MahasiswaBimbingan from "./pages/Mahasiswa.Bimbingan";
import MahasiswaAbsensi from "./pages/Mahasiswa.Absensi";
import MahasiswaUbahPassword from "./pages/Mahasiswa.UbahPassword";
import MahasiswaPilihKelas from "./pages/Mahasiswa.PilihKelas";
import MahasiswaJadwal from "./pages/Mahasiswa.Jadwal";
import MahasiswaJadwalKu from "./pages/Mahasiswa.JadwalKu";
import DepartmentDetail from "./pages/Mahasiswa.Himaju/Departemen/DetailsDepartemen";
import VisiMisi from "./pages/Mahasiswa.Himaju/VisiMisi/VisiMisi";
import Galeri from "./pages/Mahasiswa.Himaju/Galeri/Galeri";
import AllGaleri from "./pages/Mahasiswa.Himaju/Galeri/allGaleri";
import ProgramKerja from "./pages/Mahasiswa.Himaju/ProgramKerja/ProgramKerja";
import MahasiswaDataHME from "./pages/Mahasiswa.DataHME";
import MahasiswaProfileHME from "./pages/Mahasiswa.ProfileHME";

import DosenLayout from "./layout/DosenLayout";
import DosenDashboard from "./pages/Dosen.Dashboard";
import DosenAddAbsensi from "./pages/Dosen.AddAbsensi";
import DosenDataAbsensi from "./pages/Dosen.DataAbsensi";
import DosenAddRPS from "./pages/Dosen.AddRPS";
import DosenDaftarRPS from "./pages/Dosen.DaftarRPS";
import DosenDataDosen from "./pages/Dosen.DataDosen";

import KaprodiLayout from "./layout/KaprodiLayout";
import KaprodiRPS from "./pages/Kaprodi.RPS";
import KaprodiDashboard from "./pages/Kaprodi.Dashboard";
import ViewRPS from "./pages/Kaprodi.RPS/ViewRPS";

import Login from "./pages/Login";
import LupaPassword from "./pages/LupaPassword";
import Surat from "./components/RPSDoc";
import RpsSurat from "./components/RPS/RpsSurat";
import "./App.scss";
import HimajuLayout from "./layout/HimajuLayout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          {/*Layout Admin*/}
          <Route element={<AdminLayout />}>
            <Route element={<AdminDashboard />} path="/admin" exact />

            {/*Management RPS*/}
            <Route element={<AdminAddRPS />} path="/admin/add/rps" exact />
            <Route
              element={<AdminDaftarRPS />}
              path="/admin/daftar/rps"
              exact
            />

            {/*Management Jadwal*/}
            <Route
              element={<AdminAddJadwal />}
              path="/admin/add/jadwal"
              exact
            />

            {/*Management Mahasiswa*/}
            <Route
              element={<AdminAddMahasiswa />}
              path="/admin/add/mahasiswa"
              exact
            />
            <Route
              element={<AdminDataMahasiswa />}
              path="/admin/data/mahasiswa"
              exact
            />
            <Route
              element={<AdminDetailsMahasiswa />}
              path="/admin/details/mahasiswa/:id"
              exact
            />

            {/*Management Dosen*/}
            <Route element={<AdminAddDosen />} path="/admin/add/dosen" exact />
            <Route
              element={<AdminDataDosen />}
              path="/admin/data/dosen"
              exact
            />
            <Route
              element={<AdminDetailsDosen />}
              path="/admin/details/dosen/:id"
              exact
            />

            {/*Evaluasi Akademik*/}
            <Route
              element={<AdminAddEvaluasi />}
              path="/admin/add/evaluasi/:id"
              exact
            />
            <Route element={<AdminEvaluasi />} path="/admin/evaluasi" exact />
            <Route
              element={<AdminFileEvaluasi />}
              path="/admin/file/evaluasi/:id"
              exact
            />
            <Route
              element={<AdminSendEvaluasi />}
              path="/admin/send/evaluasi"
              exact
            />

            {/*Management Bimbingan*/}
            <Route
              element={<AdminAddBimbingan />}
              path="/admin/add/bimbingan"
              exact
            />
            <Route
              element={<AdminDataBimbingan />}
              path="/admin/data/bimbingan"
              exact
            />

            {/*Management HME*/}
            <Route
              element={<AdminProfileHME />}
              path="/admin/profile/hme"
              exact
            />
            <Route
              element={<AdminPendaftaranHME />}
              path="/admin/pendaftaran/hme"
              exact
            />
            <Route
              element={<AdminAnggotaHME />}
              path="/admin/anggota/hme"
              exact
            />
            <Route
              element={<AdminKegiatanHME />}
              path="/admin/buat/program/kerja"
              exact
            />

            {/*Management Monitoring Login*/}
            <Route
              element={<AdminMonitoringLogin />}
              path="/admin/monitoring/login"
              exact
            />
            <Route element={<AdminDaftarIP />} path="/admin/daftar/ip" exact />
          </Route>

          {/*Layout Mahasiswa*/}
          <Route element={<MahasiswaLayout />}>
            <Route element={<MahasiswaDashboard />} path="/mahasiswa" exact />
            <Route
              element={<MahasiswaProfile />}
              path="/mahasiswa/profile"
              exact
            />
            <Route
              element={<MahasiswaBimbingan />}
              path="/mahasiswa/bimbingan/dosenwali"
              exact
            />
            <Route
              element={<MahasiswaAbsensi />}
              path="/mahasiswa/absensi"
              exact
            />
            <Route
              element={<MahasiswaUbahPassword />}
              path="/mahasiswa/ubah/password"
              exact
            />
            <Route
              element={<MahasiswaPilihKelas />}
              path="/mahasiswa/pilih/kelas"
              exact
            />
            <Route
              element={<MahasiswaJadwal />}
              path="/mahasiswa/jadwal"
              exact
            />
            <Route
              element={<MahasiswaJadwalKu />}
              path="/mahasiswa/jadwalku"
              exact
            />

            <Route element={<MahasiswaDataHME />} path="/mahasiswa/data/hme" />
            <Route element={<MahasiswaProfileHME />} path="/mahasiswa/profile/hme" />
          </Route>

          {/*Layout Dosen*/}
          <Route element={<DosenLayout />}>
            <Route element={<DosenDashboard />} path="/dosen" exact />
            <Route
              element={<DosenAddAbsensi />}
              path="/dosen/add/absensi"
              exact
            />
            <Route
              element={<DosenDataAbsensi />}
              path="/dosen/data/absensi"
              exact
            />
            <Route element={<DosenAddRPS />} path="/dosen/add/rps" exact />
            <Route
              element={<DosenDaftarRPS />}
              path="/dosen/daftar/mata/kuliah"
              exact
            />
            <Route
              element={<DosenDataDosen />}
              path="/dosen/data/dosen"
              exact
            />
          </Route>

          {/*Layout Kaprodi*/}
          <Route element={<KaprodiLayout />}>
            <Route element={<KaprodiDashboard />} path="/kaprodi" exact />
            <Route element={<KaprodiRPS />} path="/kaprodi/rps" exact />
            <Route
              element={<DosenDataAbsensi />}
              path="/dosen/data/absensi"
              exact
            />
            <Route element={<ViewRPS />} path="/kaprodi/view/rps" exact />
          </Route>

          {/*Layout Himaju*/}
          <Route element={<HimajuLayout />} path="/mahasiswa/hme"></Route>
          <Route element={<DepartmentDetail />} path="/departemen/hme/:title" />
          <Route element={<VisiMisi />} path="/hme/visi/misi" />
          <Route element={<Galeri />} path="/hme/galeri" />
          <Route element={<AllGaleri />} path="/hme/all/galeri" />
          <Route element={<ProgramKerja />} path="/program/kerja/hme" />
        </Route>
        <Route element={<Login />} path="/" />
        <Route element={<LupaPassword />} path="/lupa/password" />
        <Route element={<Surat />} path="/surat" />
        <Route element={<RpsSurat />} path="/rps-surat" />
      </Routes>
    </Router>
  );
};

export default App;
