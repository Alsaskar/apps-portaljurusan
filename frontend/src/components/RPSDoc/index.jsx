import { PDFViewer, Document, Page, View, Text, Font } from "@react-pdf/renderer";
import styles from "./styles";
import HeaderRPS from "../HeaderRPS";
import ContentRPS from "../ContentRPS";
import CapaianRPS from "../ContentRPS/Capaian";
import Poppins from '../../assets/font/Poppins Regular 400.ttf';
import Poppins600 from '../../assets/font/Poppins SemiBold 600.ttf';
import Poppins500 from '../../assets/font/Poppins Medium 500.ttf';
import Poppins600Italic from '../../assets/font/Poppins SemiBold Italic 600.ttf';
import HalTigaRPS from "../ContentRPS/halTiga";
import HalTigaDPRPS from "../ContentRPS/halTigaDP";
import HalEmpatRPS from "../ContentRPS/halEmpat";

Font.register({ family: 'Poppins', src: Poppins });
Font.register({ family: 'Poppins600', src: Poppins600 });
Font.register({ family: 'Poppins500', src: Poppins500 });
Font.register({ family: 'Poppins600Italic', src: Poppins600Italic });


const PDFDocument = () => {
  return (
    <PDFViewer style={{ height: "100vh", width: "100%" }}>
      <Document>
        <Page size="A4" orientation="landscape" style={styles.page}>
          <View style={styles.body}>
            {/* Header RPS */}
            <HeaderRPS />

            {/* Content RPS */}
            <ContentRPS />
          </View>

          {/* Footer */}
      <View style={styles.footer}>
        <Text>FM-072 ed.A rev. 2</Text>
      </View>
        </Page>
        <Page size="A4" orientation="landscape" style={styles.page}>
          <View style={styles.body}>
            {/* Header RPS */}
            <HeaderRPS />

            {/* Capaian RPS */}
            <CapaianRPS />
            <HalTigaRPS />
          </View>
        </Page>


        <Page size="A4" orientation="landscape" style={styles.page}>
          <View style={styles.body}>
            {/* Header RPS */}
            <HeaderRPS />

            <HalTigaDPRPS />
          </View>
        </Page>

        {/*Hal 4*/}
        <Page size="A4" orientation="landscape" style={styles.page}>
          <View style={styles.body}>
            {/* Header RPS */}
            <HeaderRPS />

            <HalEmpatRPS />
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default PDFDocument;
