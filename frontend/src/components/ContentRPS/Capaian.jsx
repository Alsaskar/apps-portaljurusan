import { Text, View, Font } from "@react-pdf/renderer";
import capaian from "./capaianStyle";
import Poppins from '../../assets/font/Poppins Regular 400.ttf';
import Poppins600 from '../../assets/font/Poppins SemiBold 600.ttf';
import Poppins500 from '../../assets/font/Poppins Medium 500.ttf';

Font.register({ family: 'Poppins', src: Poppins });
Font.register({ family: 'Poppins600', src: Poppins600 });
Font.register({ family: 'Poppins500', src: Poppins500 });

const CapaianRPS = () => (

  <View style={capaian.content_rps}>
    {/*CAPAIAN*/}
    <View>
      <View style={[capaian.content_rps_empat]}>
        <Text style={[capaian.sub_title_empat, capaian.sub_title_capaian]}>CAPAIAN PEMBELAJARAN MATA KULIAH (CPMK)</Text>
        <Text style={[capaian.sub_title_empat, capaian.sub_title_prodi_yang_diberikan]}>KEMAMPUAN AKHIR TIAP TAHAP BELAJAR (SUB CPMK)</Text>
      </View>

      <View style={[capaian.isi_rps_empat]}>
        <view style={[capaian.isi_capaian_empat]}>
          <View style={[capaian.isi_empat]}>
            <Text style={[capaian.isi_cpmk]}>test</Text>
            <Text style={[capaian.isi_cpmk]}>test</Text>
            <Text style={[capaian.isi_cpmk]}>test</Text>
            <Text style={[capaian.isi_cpmk]}>test</Text>
            <Text style={[capaian.isi_cpmk]}>test</Text>
            <Text style={[capaian.isi_cpmk]}>test</Text>
          </View>

          <View style={[capaian.isi_kemampuan_empat]}>
            <Text style={[capaian.isi_title_cpmk]}>test</Text>
            <Text style={[capaian.isi_title_cpmk]}>test</Text>
            <Text style={[capaian.isi_title_cpmk]}>test</Text>
            <Text style={[capaian.isi_title_cpmk]}>test</Text>
            <Text style={[capaian.isi_title_cpmk]}>test</Text>
            <Text style={[capaian.isi_title_cpmk]}>test</Text>
          </View>
        </view>
        <View style={[capaian.isi_cpmk_empat]}>
          <View style={[capaian.isi_capaian_cpmk]}>
            <Text style={[capaian.isi_cpmk]}>test</Text>
            <Text style={[capaian.isi_cpmk]}>test</Text>
            <Text style={[capaian.isi_cpmk]}>test</Text>
            <Text style={[capaian.isi_cpmk]}>test</Text>
            <Text style={[capaian.isi_cpmk]}>test</Text>
            <Text style={[capaian.isi_cpmk]}>test</Text>
          </View>

          <View style={[capaian.isi_cpl_prodi_dua]}>
            <Text style={[capaian.isi_cpl_dua]}>test</Text>
            <Text style={[capaian.isi_cpl_dua]}>test</Text>
            <Text style={[capaian.isi_cpl_dua]}>test</Text>
            <Text style={[capaian.isi_cpl_dua]}>test</Text>
            <Text style={[capaian.isi_cpl_dua]}>test</Text>
            <Text style={[capaian.isi_cpl_dua]}>test</Text>
          </View>
        </View>
      </View>
    </View>
  </View>
);

export default CapaianRPS;
