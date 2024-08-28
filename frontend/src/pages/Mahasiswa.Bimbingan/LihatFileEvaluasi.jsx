import {
  pdf,
  Document,
  Page,
  Text,
  View,
  Image,
  Font,
} from "@react-pdf/renderer";
import styles from "./styles"; // Adjust the import path as necessary
import Logo from "../../assets/images/logo_poli.png"; // Update path as needed

Font.register({
  family: "Poppins",
  src: "path-to-your-fonts/Poppins Regular 400.ttf",
});
Font.register({
  family: "Poppins600",
  src: "path-to-your-fonts/Poppins SemiBold 600.ttf",
});
Font.register({
  family: "Poppins500",
  src: "path-to-your-fonts/Poppins Medium 500.ttf",
});

const generatePdfBlob = async (
  result,
  user,
  evaluasiMahasiswa,
  formatDate,
  dosen,
  ttdUrl
) => {
  return pdf(
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.header}>
            <View style={styles.border}>
              <Image src={Logo} style={styles.image} />
              <Text style={styles.title}>POLITEKNIK NEGERI MANADO</Text>

              {/* Header */}
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
              Semester Ganjil/Genap TA 2024
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
              <Text style={[styles.text_detail, styles.width_text]}>HP/WA</Text>
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
                {result.fullname}
              </Text>
              <Text style={[styles.text_detail, styles.width]}>
                {result.nim}
              </Text>
              <Text style={[styles.text_detail, styles.width]}>
                {result.kotaLahir}, {formatDate(result.tglLahir)}
              </Text>
              <Text style={[styles.text_detail, styles.width]}>
                {result.alamatTerakhir}
              </Text>
              <Text style={[styles.text_detail, styles.width]}>
                {user.noHp}
              </Text>
              <Text style={[styles.text_detail, styles.width, styles.child]}>
                {user.email}
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
              <Text style={[styles.section_title, styles.solusi]}>SOLUSI</Text>
              <Text style={[styles.section_title, styles.tanda]}>
                TANDA TANGAN MAH
              </Text>
            </View>
            {evaluasiMahasiswa.map((val) => (
              <View style={styles.isi_content} key={val.id}>
                <View style={styles.content}>
                  <Text style={[styles.section_title, styles.isi_tanggal]}>
                    {formatDate(val.tgl)}
                  </Text>
                </View>
                <View style={styles.content}>
                  <Text style={[styles.section_title, styles.isi_kegiatan]}>
                    {val.kegiatan}
                  </Text>
                </View>
                <View style={styles.content}>
                  <Text style={[styles.section_title, styles.isi_permasalahan]}>
                    {val.permasalahan}
                  </Text>
                </View>
                <View style={styles.content}>
                  <Text style={[styles.section_title, styles.isi_solusi]}>
                    {val.solusi}
                  </Text>
                </View>
                <View style={styles.content}>
                  <View style={[styles.section_title, styles.isi_tanda]}>
                    <Image src={val.ttd} style={styles.image_tanda} />
                  </View>
                </View>
              </View>
            ))}
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
              <Text style={styles.mengetahui}>Nip. 19710101 0999903 1 004</Text>
            </View>
            <View style={styles.ttd_dosen}>
              <Text style={[styles.pembimbing, styles.dosen_pembimbing]}>
                Dosen Pembimbing,
              </Text>

              {ttdUrl ? (
                <Image src={ttdUrl} style={styles.image_ttd_dospem} />
              ) : (
                <Text style={styles.no_image}></Text>
              )}
              <Text style={[styles.pembimbing, styles.name_dosen]}>
                {dosen.fullname}
              </Text>
              <Text style={styles.pembimbing}>Nip. {dosen.nip}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  ).toBlob();
};

export default generatePdfBlob;
