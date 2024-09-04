import { Text, View, Font } from "@react-pdf/renderer";
import halTiga from "./halTigaStyle";
import Poppins from "../../assets/font/Poppins Regular 400.ttf";
import Poppins600 from "../../assets/font/Poppins SemiBold 600.ttf";
import Poppins500 from "../../assets/font/Poppins Medium 500.ttf";

Font.register({ family: "Poppins", src: Poppins });
Font.register({ family: "Poppins600", src: Poppins600 });
Font.register({ family: "Poppins500", src: Poppins500 });

const HalTigaRPS = () => (
  <View style={halTiga.content_rps}>
    <View>
      <View style={halTiga.desc_section}>
        <View>
          <View style={halTiga.desc_title}>
            <Text style={[halTiga.desc_title_text, halTiga.desc_h_satu]}>DESKRIPSI SINGKAT M.K</Text>
          </View>
          <View style={halTiga.desc_title}>
            <Text style={[halTiga.desc_title_text, halTiga.desc_h_dua]}>BAHAN KAJIAN/MATERI PEMBELAJARAN</Text>
          </View>
        </View>

        <View style={halTiga.desc_content}>
          <View style={halTiga.desc_text}>
            <Text style={[halTiga.desc_content_text, halTiga.h_satu]}></Text>
          </View>
          <View style={halTiga.desc_text}>
            <Text style={[halTiga.desc_content_text, halTiga.h_dua]}></Text>
          </View>
        </View>
      </View>
    </View>
  </View>
);

export default HalTigaRPS;
