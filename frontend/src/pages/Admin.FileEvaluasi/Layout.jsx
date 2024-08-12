import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  Image,
  Font,
} from "@react-pdf/renderer";
import styles from "./styles";
import Logo from "../../assets/images/logo_poli.png";

import { useEffect, useState } from "react";
import axios from "axios";
import { urlApi } from "../../config";
import { useParams } from "react-router-dom";

import Poppins from "../../assets/font/Poppins Regular 400.ttf";
import Poppins600 from "../../assets/font/Poppins SemiBold 600.ttf";
import Poppins500 from "../../assets/font/Poppins Medium 500.ttf";

Font.register({ family: "Poppins", src: Poppins });
Font.register({ family: "Poppins600", src: Poppins600 });
Font.register({ family: "Poppins500", src: Poppins500 });

// Komponen PDF
const Layout = () => {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [dataMahasiswa, setDataMahasiswa] = useState([]);
  const { id } = useParams();

  const _getMahasiswa = async () => {
    try {
      const res = await axios.get(`${urlApi}/mahasiswa/${id}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });

      setMahasiswa(res.data.result);
      setDataMahasiswa(res.data.result.user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    _getMahasiswa();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PDFViewer style={{ height: "100vh", width: "100%" }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <View style={styles.header}>
              <View style={styles.border}>
                <Image src={Logo} style={styles.image} />
                <Text style={styles.title}>POLITEKNIK NEGERI MANADO</Text>

                {/*Header*/}
                <View style={styles.header_head_dua}>
                  <Text style={styles.header_dua}>FORMULIR</Text>
                  <Text style={styles.header_dua}>FM-072 ed.A rev.2</Text>
                  <Text style={styles.header_dua}>ISSUE: A</Text>
                  <Text style={styles.header_dua}>Issued: 31-01-2007</Text>
                  <Text style={styles.header_dua}>UPDATE: 2</Text>
                  <Text style={[styles.header_dua, styles.fifthChild]}>
                    Updated: 09-11-2021
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.title_daftar}>
              <Text style={[styles.text]}>DAFTAR KONSULTASI</Text>
              <Text style={[styles.text]}>PEMBIMBING AKADEMIK</Text>
              <Text style={[styles.text_semester]}>
                Semesterr Ganjil/Genap TA 2024
              </Text>
            </View>

            <View style={styles.details}>
              <View>
                <Text style={[styles.text_detail, styles.width_text]}>
                  Nama Mahasiswa
                </Text>
                <Text style={[styles.text_detail, styles.width_text]}>NIM</Text>
                <Text style={[styles.text_detail, styles.width_text]}>
                  Tempat/Tanggal Lahir
                </Text>
                <Text style={[styles.text_detail, styles.width_text]}>
                  Alamat
                </Text>
                <Text style={[styles.text_detail, styles.width_text]}>
                  HP/WA
                </Text>
                <Text
                  style={[styles.text_detail, styles.width_text, styles.child]}
                >
                  Email
                </Text>
              </View>
              <View>
                <Text style={[styles.text_detail, styles.titik_dua]}>:</Text>
                <Text style={[styles.text_detail, styles.titik_dua]}>:</Text>
                <Text style={[styles.text_detail, styles.titik_dua]}>:</Text>
                <Text style={[styles.text_detail, styles.titik_dua]}>:</Text>
                <Text style={[styles.text_detail, styles.titik_dua]}>:</Text>
                <Text
                  style={[styles.text_detail, styles.titik_dua, styles.child]}
                >
                  :
                </Text>
              </View>
              <View>
                <Text style={[styles.text_detail, styles.width]}>
                  {mahasiswa.fullname === undefined
                    ? "Loading..."
                    : mahasiswa.fullname}
                </Text>
                <Text style={[styles.text_detail, styles.width]}>20024070</Text>
                <Text style={[styles.text_detail, styles.width]}>
                  {mahasiswa.kotaLahir === undefined
                    ? "Loading..."
                    : mahasiswa.kotaLahir}
                  ,{" "}
                  {mahasiswa.tglLahir === undefined
                    ? "Loading..."
                    : mahasiswa.tglLahir}
                </Text>
                <Text style={[styles.text_detail, styles.width]}>
                  {mahasiswa.alamatTerakhir === undefined
                    ? "Loading..."
                    : mahasiswa.alamatTerakhir}
                </Text>
                <Text style={[styles.text_detail, styles.width]}>
                  {dataMahasiswa.noHp === undefined
                    ? "Loading..."
                    : dataMahasiswa.noHp}
                </Text>
                <Text style={[styles.text_detail, styles.width, styles.child]}>
                  {dataMahasiswa.email === undefined
                    ? "Loading..."
                    : dataMahasiswa.email}
                </Text>
              </View>
            </View>

            <View style={styles.konsultasi}>
              <View style={styles.isi}>
                <Text style={[styles.section_title, styles.tanggal]}>
                  TANGGAL
                </Text>
                <Text style={[styles.section_title, styles.kegiatan]}>
                  KEGIATAN MAH. SAAT INI
                </Text>
                <Text style={[styles.section_title, styles.permasalahan]}>
                  PERMASALAHAN
                </Text>
                <Text style={[styles.section_title, styles.solusi]}>
                  SOLUSI
                </Text>
                <Text style={[styles.section_title, styles.tanda]}>
                  TANDA TANGAN MAH
                </Text>
              </View>
              <View style={styles.isi_content}>
                <View style={styles.content}>
                  <Text style={[styles.section_title, styles.isi_tanggal]}>
                    8/03/2024
                  </Text>
                </View>
                <View style={styles.content}>
                  <Text style={[styles.section_title, styles.isi_kegiatan]}>
                    Pembelajaran Daring
                  </Text>
                </View>
                <View style={styles.content}>
                  <Text style={[styles.section_title, styles.isi_permasalahan]}>
                    Jaringan yang tidak memadai
                  </Text>
                </View>
                <View style={styles.content}>
                  <Text style={[styles.section_title, styles.isi_solusi]}>
                    Mencarai tempat yang memiliki signal yang baik
                  </Text>
                </View>
                <View style={styles.content}>
                  <Text style={[styles.section_title, styles.isi_tanda]}></Text>
                </View>
              </View>
            </View>

            <View style={styles.date}>
              <Text style={styles.text_date}>Manado, 8 Maret 2024</Text>
            </View>

            <View style={styles.ttd}>
              <View style={styles.ttd_koor}>
                <Text style={styles.mengetahui}>Mengetahui :</Text>
                <Text style={styles.mengetahui}>Koord. Program Studi,</Text>

                <Text style={[styles.mengetahui, styles.name]}>
                  Harson Kapoh, ST,.MT
                </Text>
                <Text style={styles.mengetahui}>
                  Nip. 19710101 0999903 1 004
                </Text>
              </View>
              <View style={styles.ttd_dosen}>
                <Text style={[styles.pembimbing, styles.dosen_pembimbing]}>
                  Dosen Pembimbing,
                </Text>
                <Text style={[styles.pembimbing, styles.name_dosen]}>
                  Steven Johny Runtuwene, SST
                </Text>
                <Text style={styles.pembimbing}>Nip. 197507122002121001</Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default Layout;
