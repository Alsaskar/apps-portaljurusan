import { StyleSheet } from "@react-pdf/renderer";

const halEmpat = StyleSheet.create({
  bodyText: {
    fontFamily: "Poppins",
  },

  content_rps: {
    marginTop: 20,
    borderTop: "1 solid black",
    borderRight: "1 solid black",
    borderLeft: "1 solid black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  title_section_flex: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
  },
  
  no: {
    backgroundColor: "#f1f1f1",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },

  no_section: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    textAlign: "center",
    fontSize: 10,
    fontFamily: "Poppins600",
  },

  title_no: {
    fontFamily: "Poppins600",
    borderTop: "1 solid black",
    borderRight: "1 solid black",
    paddingHorizontal: 5,
  },

  no_penilaian_satu: {
    width: 96,
    borderBottom: "1 solid black",
  },

  no_penilaian_dua: {
    width: 75,
    borderBottom: "1 solid black",
  },

  no_penilaian_tiga: {
    width: 45,
    borderBottom: "1 solid black",
    borderRight: "none",
  },

  no_satu: {
    width: 54,
    borderBottom: "1 solid black",
  },
  no_dua: {
    width: 148,
    borderBottom: "1 solid black",
  },
  no_tiga: {
    width: 105,
    borderBottom: "1 solid black",
  },
  no_empat: {
    width: 113,
    borderBottom: "1 solid black",
  },
  no_lima: {
    width: 59,
    borderBottom: "1 solid black",
  },
  no_enam: {
    width: 110,
    borderBottom: "1 solid black",
  },

  title_section: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    textAlign: "center",
    fontSize: 10,
    fontFamily: "Poppins600",
  },

  title_text: {
    borderRight: "1 solid black",
    height: 80,
    paddingHorizontal: 5,
  },

  text_blue_color: {
    color: "blue",
  },

  text_penilaian_center: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
  },

  title_text_penilaian: {
    fontFamily: "Poppins600",
    fontSize: 10,
    borderBottom: "1 solid black",
    width: 218,
    textAlign: "center",
  },

  penilaian: {
    fontFamily: "Poppins600",
    fontSize: 10,
    height: 64,

    display: "flex",
    justifyContent: "center",
    // alignItems: "center",
    flexDirection: "row",
  },

  text_penilaian: {
    textAlign: "center",
    borderRight: "1 solid black",
  },

  kriteria: {
    width: 100,
  },

  indikator: {
    width: 75,
  },

  bobot: {
    textAlign: "center",
    width: 50,
    borderRight: "none",
  },

  title_t_satu: {
    maxWidth: 60,
  },

  title_t_dua: {
    maxWidth: 160,
  },

  title_t_tiga: {
    maxWidth: 110,
  },

  title_t_empat: {
    maxWidth: 110,
  },

  title_t_lima: {
    maxWidth: 80,
  },

  title_t_enam: {
    maxWidth: 110,
  },

  content_section_flex: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
  },

  content_section_minggu: {
    width: 52,
    textAlign: "center",

    
  },

  content_minggu_delapan: {
    display: "flex",
    flexDirection: "row",
  },
  
  content_text: {
    borderBottom: "1 solid black",
    borderRight: "1 solid black",
    fontSize: 10,
    height: "auto",
  },

  minggu_delapan: {
    fontSize: 10,
    width: 728,
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",

    borderBottom: "1 solid black",
  },

  isi_section_sub_cpmk: {
    fontSize: 10,
    width: 142,
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",

    borderBottom: "1 solid black",
    borderRight: "1 solid black",
  },

  isi_section_bahan: {
    fontSize: 10,
    width: 101,

    display: "flex",
    justifyContent: "center",
    flexDirection: "row",

    borderBottom: "1 solid black",
    borderRight: "1 solid black",
  },

  isi_section_bentuk: {
    fontSize: 10,
    width: 110,

    display: "flex",
    justifyContent: "center",
    flexDirection: "row",

    borderBottom: "1 solid black",
    borderRight: "1 solid black",
  },

  isi_section_estimasi: {
    fontSize: 10,
    width: 56,

    display: "flex",
    justifyContent: "center",
    flexDirection: "row",

    borderBottom: "1 solid black",
    borderRight: "1 solid black",
  },

  isi_section_pengalaman: {
    fontSize: 10,
    width: 106,

    display: "flex",
    justifyContent: "center",
    flexDirection: "row",

    borderBottom: "1 solid black",
    borderRight: "1 solid black",
  },

  isi_section_text: {
    
  },

  bg_ujian: {
    backgroundColor: "#f1f1f1",
  },
  

  content_penilaian_flex: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
  },

  isi_penilaian_kriteria: {
    fontSize: 10,
    width: 95,
    textAlign: "center",

    borderBottom: "1 solid black",
    borderRight: "1 solid black",
  },

  isi_penilaian_indikator: {
    fontSize: 10,
    width: 76,
    textAlign: "center",

    borderBottom: "1 solid black",
    borderRight: "1 solid black",
  },

  isi_penilaian_bobot: {
    fontSize: 10,
    width: 45,
    textAlign: "center",

    borderBottom: "1 solid black",
    borderRight: "none",
  },
});

export default halEmpat;
