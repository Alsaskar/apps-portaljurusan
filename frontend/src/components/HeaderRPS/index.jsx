import { View, Text, Image, Font } from "@react-pdf/renderer";
import styles from "./styles";
import Logo from "../../assets/images/logo_poli.png";

import Poppins from '../../assets/font/Poppins Regular 400.ttf';
import Poppins600 from '../../assets/font/Poppins SemiBold 600.ttf';
import Poppins500 from '../../assets/font/Poppins Medium 500.ttf';

Font.register({ family: 'Poppins', src: Poppins });
Font.register({ family: 'Poppins600', src: Poppins600 });
Font.register({ family: 'Poppins500', src: Poppins500 });


const HeaderRPS = () => (
  <View style={styles.header}>
    <View style={styles.header_border}>
      <Image src={Logo} style={styles.image} />
      <Text style={styles.title}>Politeknik Negeri Manado</Text>
      <Text style={styles.title_jurusan}>Jurusan Teknik Elektro</Text>
      <Text style={styles.title_prodi}>Program Studi Sarjana Terapan Teknik Informatika</Text>

      <View style={styles.header_head_dua}>
        <Text style={styles.header_dua}>FORMULIR</Text>
        <Text style={styles.header_dua}>FM-072 ed.A rev.2</Text>
        <Text style={styles.header_dua}>ISSUE: A</Text>
        <Text style={styles.header_dua}>Issued: 31-01-2007</Text>
        <Text style={styles.header_dua}>UPDATE: 2</Text>
        <Text style={[styles.header_dua, styles.fifthChild]}>Updated: 09-11-2021</Text>
      </View>
    </View>
  </View>
);

export default HeaderRPS;
