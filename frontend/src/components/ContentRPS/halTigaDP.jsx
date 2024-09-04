import { Text, View, Font } from "@react-pdf/renderer";
import halTiga from "./halTigaStyle";
import Poppins from "../../assets/font/Poppins Regular 400.ttf";
import Poppins600 from "../../assets/font/Poppins SemiBold 600.ttf";
import Poppins500 from "../../assets/font/Poppins Medium 500.ttf";

Font.register({ family: "Poppins", src: Poppins });
Font.register({ family: "Poppins600", src: Poppins600 });
Font.register({ family: "Poppins500", src: Poppins500 });

const HalTigaDPRPS = () => (
  <View style={halTiga.content_rps_dp}>
    <View>
      <View style={[halTiga.desc_section, halTiga.mt]}>
        <View>
          <View style={[halTiga.desc_title, halTiga.desc_b]}>
            <Text style={[halTiga.desc_title_text, halTiga.desc_h_tiga]}>DAFTAR PUSTAKA</Text>
          </View>
          <View style={[halTiga.desc_title, halTiga.desc_b]}>
            <Text style={[halTiga.desc_title_text, halTiga.desc_h_empat]}>DOSEN PENGAMPU</Text>
          </View>
          <View style={[halTiga.desc_title, halTiga.desc_b]}>
            <Text style={[halTiga.desc_title_text, halTiga.desc_h_lima]}>MATA KULIAH PRASYARAT (JIKA ADA)</Text>
          </View>
        </View>

        <View style={halTiga.desc_content}>
          <View style={[halTiga.desc_text, halTiga.desc_text_b]}>
            <View style={[halTiga.desc_content_text, halTiga.h_tiga]}>
              <Text style={[halTiga.desc_utama]}>Utama:</Text>

              <View style={halTiga.desc_list}>
                <Text>1. Test</Text>
                <Text>2. Test</Text>
                <Text>3. Test</Text>
                <Text>4. Test</Text>
                <Text>5. Test</Text>
                <Text>6. Test</Text>
              </View>
              <Text style={[halTiga.desc_utama]}>Pendukung:</Text>
              <View style={halTiga.desc_list}>
                <Text>1. Test</Text>
                <Text>2. Test</Text>
              </View>
            </View>
          </View>
          <View style={[halTiga.desc_text, halTiga.desc_text_b]}>
            <Text style={[halTiga.desc_content_text, halTiga.h_empat]}></Text>
          </View>
          <View style={[halTiga.desc_text, halTiga.desc_text_b]}>
            <Text style={[halTiga.desc_content_text, halTiga.h_lima]}></Text>
          </View>
        </View>
      </View>
    </View>
  </View>
);

export default HalTigaDPRPS;
