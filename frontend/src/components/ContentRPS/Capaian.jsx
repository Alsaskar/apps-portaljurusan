import { Text, View, Font } from "@react-pdf/renderer";
import styles from "./styles";
import Poppins from '../../assets/font/Poppins Regular 400.ttf';
import Poppins600 from '../../assets/font/Poppins SemiBold 600.ttf';
import Poppins500 from '../../assets/font/Poppins Medium 500.ttf';

Font.register({ family: 'Poppins', src: Poppins });
Font.register({ family: 'Poppins600', src: Poppins600 });
Font.register({ family: 'Poppins500', src: Poppins500 });

const CapaianRPS = () => (

  <View style={styles.content_rps}>
    {/*CAPAIAN*/}
    <View>
      <View style={[styles.content_rps_empat]}>
        <Text style={[styles.sub_title_empat, styles.sub_title_capaian]}>CAPAIAN PEMBELAJARAN MATA KULIAH (CPMK)</Text>
        <Text style={[styles.sub_title_empat, styles.sub_title_prodi_yang_diberikan]}>KEMAMPUAN AKHIR TIAP TAHAP BELAJAR (SUB CPMK)</Text>
      </View>

      <View style={[styles.isi_rps_empat]}>
        <view style={[styles.isi_capaian_empat]}>
          <View style={[styles.isi_empat]}>
            <Text style={[styles.isi_cpmk]}></Text>
            <Text style={[styles.isi_cpmk]}></Text>
            <Text style={[styles.isi_cpmk]}></Text>
            <Text style={[styles.isi_cpmk]}></Text>
          </View>

          <View style={[styles.isi_kemampuan_empat]}>
            <Text style={[styles.isi_title_cpmk]}></Text>
            <Text style={[styles.isi_title_cpmk]}></Text>
            <Text style={[styles.isi_title_cpmk]}></Text>
            <Text style={[styles.isi_title_cpmk]}></Text>
          </View>
        </view>
        <View style={[styles.isi_cpmk_empat, styles.kemampuan_akhir]}>
          <View style={[styles.isi_capaian_cpmk]}>
            <Text style={[styles.isi_cpmk]}></Text>
            <Text style={[styles.isi_cpmk]}></Text>
            <Text style={[styles.isi_cpmk]}></Text>
            <Text style={[styles.isi_cpmk]}></Text>
          </View>

          <View style={[styles.isi_cpl_prodi_dua]}>
            <Text style={[styles.isi_cpl_dua]}></Text>
            <Text style={[styles.isi_cpl_dua]}></Text>
            <Text style={[styles.isi_cpl_dua]}></Text>
            <Text style={[styles.isi_cpl_dua]}></Text>
          </View>
        </View>
      </View>
    </View>
  </View>
);

export default CapaianRPS;
