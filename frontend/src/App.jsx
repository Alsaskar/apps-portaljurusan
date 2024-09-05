import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./pages/PrivateRoutes";
import { Toaster } from "react-hot-toast";

import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./pages/Admin.Dashboard";
import AdminAddMahasiswa from "./pages/Admin.AddMahasiswa";
import AdminDataMahasiswa from "./pages/Admin.DataMahasiswa";
import AdminDataKelas from "./pages/Admin.DataKelas";
import AdminAddDosen from "./pages/Admin.AddDosen";
import AdminDataDosen from "./pages/Admin.DataDosen";
import AdminAddRPS from "./pages/Admin.AddRPS";
import AdminDaftarRPS from "./pages/Admin.DaftarRPS";
import AdminAddJadwal from "./pages/Admin.AddJadwal";
import AdminDataJadwal from "./pages/Admin.DataJadwal";
import AdminDetailsMahasiswa from "./pages/Admin.DataMahasiswa/detailsMahasiswa";
import AdminDetailsDosen from "./pages/Admin.DataDosen/detailsDosen";
import AdminAddBimbingan from "./pages/Admin.AddBimbingan";
import AdminDataBimbingan from "./pages/Admin.DataBimbingan";
import AdminEvaluasi from "./pages/Admin.Evaluasi";
import AdminFileEvaluasi from "./pages/Admin.FileEvaluasi";
import AdminSendEvaluasi from "./pages/Admin.SendEvaluasi";
import AdminProfileHME from "./pages/Admin.ProfileHME";
import AdminPendaftaranHME from "./pages/Admin.PendaftaranHME";
import AdminAnggotaHME from "./pages/Admin.AnggotaHME";
import AdminKegiatanHME from "./pages/Admin.KegiatanHME";
import AdminMonitoringLogin from "./pages/Admin.MonitoringLogin";
import AdminDaftarIP from "./pages/Admin.DaftarIP";
import AdminDataMatkul from "./pages/Admin.DataMatkul";
import AdminJadwal from "./pages/Admin.Jadwal";
import AdminLihatJadwalKelas from "./pages/Admin.LihatJadwalKelas";

import MahasiswaLayout from "./layout/MahasiswaLayout";
import MahasiswaDashboard from "./pages/Mahasiswa.Dashboard";
import MahasiswaProfile from "./pages/Mahasiswa.Profile";
import MahasiswaBimbingan from "./pages/Mahasiswa.Bimbingan";
import BuatEvaluasi from "./pages/Mahasiswa.Bimbingan/BuatEvaluasi";
import LihatEvaluasiBimbingan from "./pages/Mahasiswa.Bimbingan/LihatFileEvaluasi";
import LihatData from "./pages/Mahasiswa.Bimbingan/LihatData";
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
import MahasiswaDataProfileHME from "./pages/Mahasiswa.ProfileHME/DataProfile";
import MahasiswaGaleriHME from "./pages/Mahasiswa.GaleriHME";
import DataGaleri from "./pages/Mahasiswa.GaleriHME/DataGaleri";
import MahasiswaBuatProgramKerjaHME from "./pages/Mahsiswa.BuatProgramKerjaHME";
import DataProgramKerjaHME from "./pages/Mahsiswa.BuatProgramKerjaHME/DataProgramKerjaHME";

import DosenLayout from "./layout/DosenLayout";
import DosenDashboard from "./pages/Dosen.Dashboard";
import DosenAddAbsensi from "./pages/Dosen.AddAbsensi";
import DosenDataAbsensi from "./pages/Dosen.DataAbsensi";
import DosenAddRPS from "./pages/Dosen.AddRPS";
import DosenDaftarRPS from "./pages/Dosen.DaftarRPS";
import DosenInputRPS from "./pages/Dosen.InputRPS";
import DosenDataDosen from "./pages/Dosen.DataDosen";
import DosenBimbinganChat from "./pages/Dosen.BimbinganChat";
import DosenBimbingan from "./pages/Dosen.Bimbingan";
import DosenJadwal from "./pages/Dosen.Jadwal";
import Jadwal from "./pages/Dosen.Jadwal/Jadwal";
import SelectMahasiswa from "./pages/Dosen.BimbinganChat/SelectMahasiswa";
import SelectMahasiswaEvaluasi from "./pages/Dosen.Bimbingan/SelectMahasiswaEvaluasi";

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
import TVLayout from "./layout/TVLayout";
import TVHome from "./pages/TV.Home";
import TVHomeMenu from "./pages/TV.HomeMenu";
import { LoadingProvider } from "./context/LoadingContext";
import TVProfile from "./pages/TV.Profile";
import TVAbsensi from "./pages/TV.Absensi";
import TVHME from "./pages/TV.HME";
import TVJadwal from "./pages/TV.Jadwal";
import HimajuLayoutDosen from "./layout/HimajuLayoutDosen";
import RPSTest from "./pages/RPS";

// import AdminBesarLayout from "./layout/AdminBesarLayout";
// import AdminBesarDashboard from "./pages/Admin.BesarDashboard";
// import AdminAddAdminProdi from "./pages/Admin.AddAdminProdi";
// import AdminDataAdminProdi from "./pages/Admin.DataAdminProdi";
const App = () => {
  return (
    <LoadingProvider>
      <Toaster />
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            {/*Layout Admin Besar*/}
            {/* <Route element={<AdminBesarLayout />}>
              <Route
                element={<AdminBesarDashboard />}
                path="/admin/jurusan"
                exact
              />
              <Route
                element={<AdminAddAdminProdi />}
                path="/add/admin/prodi"
                exact
              />
              <Route
                element={<AdminDataAdminProdi />}
                path="/data/admin/prodi"
                exact
              />

              <Route
                element={<AdminMonitoringLogin />}
                path="/admin/jurusan/monitoring/login"
                exact
              />
            </Route> */}

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

              <Route
                element={<AdminDataJadwal />}
                path="/admin/data/jadwal"
                exact
              />

              <Route
                element={<AdminDataMatkul />}
                path="/admin/data/matkul"
                exact
              />

              <Route element={<AdminJadwal />} path="/admin/jadwal" exact />
              <Route
                element={<AdminLihatJadwalKelas />}
                path="/admin/lihat/jadwal/kelas/:namaKelas"
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
              <Route
                element={<AdminDataKelas />}
                path="/admin/data/kelas"
                exact
              />

              {/*Management Dosen*/}
              <Route
                element={<AdminAddDosen />}
                path="/admin/add/dosen"
                exact
              />
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
              <Route
                element={<AdminDaftarIP />}
                path="/admin/daftar/ip"
                exact
              />
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
                element={<BuatEvaluasi />}
                path="/mahasiswa/buat/evaluasi"
                exact
              />
              <Route
                element={<LihatEvaluasiBimbingan />}
                path="/mahasiswa/lihat/evaluasi/bimbingan"
                exact
              />
              <Route
                element={<LihatData />}
                path="/mahasiswa/lihat/data/evaluasi/bimbingan"
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

              <Route
                element={<MahasiswaDataHME />}
                path="/mahasiswa/data/hme"
              />
              <Route
                element={<MahasiswaProfileHME />}
                path="/mahasiswa/profile/hme"
              />
              <Route
                element={<MahasiswaDataProfileHME />}
                path="/mahasiswa/data/profile/hme"
              />
              <Route
                element={<MahasiswaGaleriHME />}
                path="/mahasiswa/galeri/hme"
              />
              <Route element={<DataGaleri />} path="/mahasiswa/data/galeri" />
              <Route
                element={<MahasiswaBuatProgramKerjaHME />}
                path="/mahasiswa/buat/program/kerja/hme"
              />
              <Route
                element={<DataProgramKerjaHME />}
                path="/mahasiswa/data/program/kerja/hme"
              />
            </Route>

            {/*Layout Dosen*/}
            <Route element={<DosenLayout />}>
              <Route element={<DosenDashboard />} path="/dosen" exact />
              <Route
                element={<DosenBimbinganChat />}
                path="/dosen/bimbingan/chat/:mahasiswaId"
                exact
              />
              <Route
                element={<DosenBimbingan />}
                path="/dosen/bimbingan/:idMahasiswa"
                exact
              />
              <Route
                element={<SelectMahasiswaEvaluasi />}
                path="/dosen/select/mahasiswa/evaluasi"
                exact
              />
              <Route
                element={<SelectMahasiswa />}
                path="/dosen/select/mahasiswa"
                exact
              />
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
                element={<DosenInputRPS />}
                path="/dosen/input/rps"
                exact
              />
              <Route
                element={<DosenDataDosen />}
                path="/dosen/data/dosen"
                exact
              />

              {/*Jadwal*/}
              <Route element={<DosenJadwal />} path="/dosen/jadwal" exact />

              <Route
                element={<Jadwal />}
                path="/dosen/lihat/jadwal/kelas/:namaKelas"
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
            <Route element={<HimajuLayoutDosen />} path="/dosen/hme"></Route>
            <Route
              element={<DepartmentDetail />}
              path="/departemen/hme/:title"
            />
            <Route element={<VisiMisi />} path="/hme/visi/misi" />
            <Route element={<Galeri />} path="/hme/galeri" />
            <Route element={<AllGaleri />} path="/hme/all/galeri" />
            <Route element={<ProgramKerja />} path="/program/kerja/hme" />
          </Route>
          <Route element={<Login />} path="/" />
          <Route element={<LupaPassword />} path="/lupa/password" />
          <Route element={<Surat />} path="/surat" />
          <Route element={<RpsSurat />} path="/rps-surat" />
          <Route element={<RPSTest />} path="/rps" />

          {/*TV Layout*/}
          <Route element={<TVLayout />}>
            <Route element={<TVHome />} path="/tv/home" />
            <Route element={<TVHomeMenu />} path="/tv/home/menu" />
            <Route element={<TVProfile />} path="/tv/profile" />
            <Route element={<TVAbsensi />} path="/tv/absensi" />
            <Route element={<TVHME />} path="/tv/hme" />
            <Route element={<TVJadwal />} path="/tv/jadwal" />
          </Route>
        </Routes>
      </Router>
    </LoadingProvider>
  );
};

export default App;
