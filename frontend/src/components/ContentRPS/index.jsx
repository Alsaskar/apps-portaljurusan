import { Text, View, Font } from "@react-pdf/renderer";
import styles from "./styles";
import Poppins from '../../assets/font/Poppins Regular 400.ttf';
import Poppins600 from '../../assets/font/Poppins SemiBold 600.ttf';
import Poppins500 from '../../assets/font/Poppins Medium 500.ttf';

Font.register({ family: 'Poppins', src: Poppins });
Font.register({ family: 'Poppins600', src: Poppins600 });
Font.register({ family: 'Poppins500', src: Poppins500 });

const ContentRPS = () => (

  <View style={styles.content_rps}>
    <View style={[styles.head_text]}>
      <Text style={styles.title_content}>RENCANA PEMBELAJARAN SEMESTER</Text>
    </View>
    <View style={[styles.rps]}>
      <View>
        <View>
          <View style={styles.menu_title}>
            <Text style={styles.sub_title}>NAMA MATA KULIAH</Text>
            <Text style={[styles.sub_title, styles.sub_title_kode]}>KODE</Text>
            <Text style={[styles.sub_title, styles.sub_title_rumpun]}>RUMPUN M.K</Text>
            <Text style={[styles.sub_title, styles.sub_title_bobot]}>BOBOT (SKS)</Text>
            <Text style={[styles.sub_title, styles.sub_title_semester]}>SEMESETER</Text>
          </View>
          <View style={[styles.isi_sub]}>
            <Text style={[styles.isi, styles.isi_mata_kuliah]}>STATISTISTIK TEKNIK</Text>
            <Text style={[styles.isi, styles.isi_kode]}>3422333</Text>
            <Text style={[styles.isi, styles.isi_rumpun]}></Text>
            <View style={[styles.isi, styles.isi_bobot]}>
              <Text style={[styles.isi_child_bobot_satu]}>T</Text>
              <Text style={[styles.isi_child_bobot_dua]}>2</Text>
              <Text style={[styles.isi_child_bobot_tiga]}>P</Text>
              <Text style={[styles.isi_child_bobot_empat]}></Text>
            </View>
            <Text style={[styles.isi, styles.isi_semester]}>3</Text>
          </View>
        </View>

        <View style={[styles.content_rps_dua]}>
          <Text style={[styles.sub_title_dua]}>OTORISASI</Text>
          <Text style={[styles.sub_title_dua, styles.sub_title_pembuat]}>PEMBUAT RP</Text>
          <Text style={[styles.sub_title_dua, styles.sub_title_pengampu]}>PENGAMPU M.K</Text>
          <Text style={[styles.sub_title_dua, styles.sub_title_koordinator]}>KOORDINATOR MK</Text>
          <Text style={[styles.sub_title_dua, styles.sub_title_kor]}>KOR. PRODI</Text>
        </View>

        <View style={[styles.isi_sub]}>
          <Text style={[styles.isi_dua, styles.isi_otorisasi]}></Text>
          <Text style={[styles.isi_dua, styles.isi_pembuat]}>Harson Kapoh</Text>
          <Text style={[styles.isi_dua, styles.isi_pengampu]}>Harson Kapoh, Maksy Sendiang dan Toban Pairunan</Text>
          <Text style={[styles.isi_dua, styles.isi_koordinator]}>Harson Kapoh</Text>
          <Text style={[styles.isi_dua, styles.isi_kor]}>Harson Kapoh</Text>
        </View>
      </View>
      <View style={styles.menu_title_tgl_penyusunan}>
        <Text style={[styles.sub_title_tgl_penyusunan, styles.sub_title_tgl_penyusunan_dua]}>TANGGAL PENYUSUNAN</Text>

        <View style={[styles.isi_sub_tgl_penyusunan]}>
          <Text style={[styles.isi_tgl_penyusunan, styles.isi_tgl_penyusunan_dua]}>17 Januari 2017</Text>
          <Text style={[styles.isi_tgl_penyusunan, styles.isi_tgl_penyusunan_dua]}>17 Januari 2017</Text>
        </View>
      </View>
    </View>

    <View>
      <View style={[styles.content_rps_tiga]}>
        <Text style={[styles.sub_title_tiga, styles.sub_title_capaian]}>CAPAIAN PEMBELAJARAN</Text>
        <Text style={[styles.sub_title_tiga, styles.sub_title_prodi_yang_diberikan]}>C.P.L PRODI YANG DIBERIKAN PADAD M.K</Text>
      </View>

      <View style={[styles.isi_rps_tiga]}>
        <View style={[styles.isi_tiga]}>
          <Text style={[styles.isi_title_capaian]}></Text>
          <Text style={[styles.isi_title_capaian]}></Text>
          <Text style={[styles.isi_title_capaian]}></Text>
          <Text style={[styles.isi_title_capaian]}></Text>
          <Text style={[styles.isi_title_capaian]}></Text>
          <Text style={[styles.isi_title_capaian]}></Text>
        </View>
        <View style={[styles.isi_cpl_tiga, styles.isi_title_prodi_yang_diberikan]}>
          <View style={[styles.isi_cpl_prodi]}>
            <Text style={[styles.isi_cpl]}>C.P.L-1</Text>
            <Text style={[styles.isi_cpl]}>C.P.L-2</Text>
            <Text style={[styles.isi_cpl]}>C.P.L-3</Text>
            <Text style={[styles.isi_cpl]}>C.P.L-4</Text>
            <Text style={[styles.isi_cpl]}>C.P.L-5</Text>
            <Text style={[styles.isi_cpl]}>C.P.L-6</Text>
          </View>

          <View style={[styles.isi_cpl_prodi_dua]}>
            <Text style={[styles.isi_cpl_dua]}>Bertakwa kepada Tuhan yang Mahas Esa</Text>
            <Text style={[styles.isi_cpl_dua]}>Memiliki moral, etika dan kepribadian yang baik di dalam menyelesaikan tugasnya</Text>
            <Text style={[styles.isi_cpl_dua]}>Mampu melakukan pekerjaan dengan memanfaatkan keahlian dan teknologi informasi sesuai kaidah dan standar yang berlaku</Text>
            <Text style={[styles.isi_cpl_dua]}>Menginternalisasi nilai, norma, dan etika akademik;</Text>
            <Text style={[styles.isi_cpl_dua]}>Menunjukan sikap bertanggungjawab atas pekerjaan di bidang keahliannya secara mandiri; dan</Text>
            <Text style={[styles.isi_cpl_dua]}>Menjunjung tinggi dan menerapkan etika profesi bidang IT</Text>
          </View>
        </View>
      </View>
    </View>
  </View>
);

export default ContentRPS;
