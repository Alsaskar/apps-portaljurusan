import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  bodyText: {
    fontFamily: 'Poppins',
  },

  content_rps: {
    marginTop: 10,
    borderRight: "1 solid black",
    borderTop: "1 solid black",
    borderLeft: "1 solid black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  head_text: {
    backgroundColor: "#d1d1d1",
  },
  title_content: {
    fontFamily: "Poppins500",
    textAlign: "center",
    marginTop: 2,
    fontSize: 14,
    borderBottom: "1 solid black",
  },
  menu_title: {
    backgroundColor: "#d1d1d1",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  menu_title_tgl_penyusunan: {
    // marginTop: 6,
    // display: "flex",
    // alignItems: "center",
    // flexDirection: "row",
  },
  sub_title: {
    // backgroundColor: "red",
    fontFamily: "Poppins600",
    width: 130,
    textAlign: "center",
    borderRight: "1 solid black",
    borderBottom: "1 solid black",
    fontSize: 8,
    padding: 5,
  },
  sub_title_tgl_penyusunan: {
    fontFamily: "Poppins600",
    backgroundColor: "#d1d1d1",
    width: 130,
    textAlign: "center",
    borderRight: "1 solid black",
    borderBottom: "1 solid black",
    fontSize: 8,
    padding: 5,
  },
  sub_title_kode: {
    width: 80,
  },
  sub_title_rumpun: {
    width: 180,
  },
  sub_title_bobot: {
    width: 170,
  },
  sub_title_semester: {
    width: 100,
  },
  sub_title_tgl_penyusunan_dua: {
    borderRight: "none",
    width: 120,
  },
  isi_sub: {
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  isi_sub_tgl_penyusunan: {
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  isi: {
    fontFamily: "Poppins",
    width: 130,
    height: 25,
    textAlign: "center",
    borderRight: "1 solid black",
    fontSize: 8,
  },
  isi_dua: {
    fontFamily: "Poppins",
    width: 130,
    height: 25,
    textAlign: "center",
    borderRight: "1 solid black",
    fontSize: 8,
  },
  isi_tgl_penyusunan: {
    fontFamily: "Poppins",
    width: 130,
    height: "auto",
    textAlign: "center",
    borderRight: "1 solid black",
    fontSize: 8,
  },
  isi_kode: {
    width: 80,
  },
  isi_rumpun: {
    width: 180,
  },
  isi_bobot: {
    width: 170,
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
  },
  isi_child_bobot_satu: {
    borderRight: "1 solid black",
    backgroundColor: "#d1d1d1",
    width: 90,
  },
  isi_child_bobot_dua: {
    borderRight: "1 solid black",
    backgroundColor: "white",
    width: 90,
  },
  isi_child_bobot_tiga: {
    borderRight: "1 solid black",
    backgroundColor: "#d1d1d1",
    width: 90,
  },
  isi_child_bobot_empat: {
    backgroundColor: "white",
    width: 90,
  },
  isi_semester: {
    width: 100,
  },
  isi_tgl_penyusunan_dua: {
    width: 120,
    borderRight: "none",
    textAlign: "left",
    paddingHorizontal: 10,
  },
  content_rps_dua: {
    borderBottom: "1 solid black",
    borderTop: "1 solid black",
    backgroundColor: "#d1d1d1",
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  content_rps_tiga: {
    borderTop: "1 solid black",
    borderBottom: "1 solid black",
    backgroundColor: "#d1d1d1",
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  sub_title_dua: {
    fontFamily: "Poppins600",
    padding: 5,
    width: 130,
    textAlign: "center",
    borderRight: "1 solid black",
    fontSize: 8,
  },
  sub_title_tiga: {
    fontFamily: "Poppins600",
    padding: 5,
    width: 130,
    textAlign: "center",
    borderRight: "1 solid black",
    fontSize: 8,
  },
  isi_pembuat: {
    width: 80,
  },
  isi_pengampu: {
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: "left",
    width: 180,
  },
  isi_koordinator: {
    width: 170,
  },
  isi_kor: {
    width: 100,
  },
  sub_title_pembuat: {
    width: 80,
  },
  sub_title_pengampu: {
    width: 180,
  },
  sub_title_koordinator: {
    width: 170,
  },
  sub_title_kor: {
    width: 100,
  },
  rps: {
    display: "flex",
    flexDirection: "row",
  },
  sub_title_capaian: {
    width: "50%",
  },
  sub_title_prodi_yang_diberikan: {
    borderRight: "none",
    width: "50%",
  },
  isi_rps_tiga: {
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  isi_tiga: {
    // padding: 10,
    width: "50%",
    textAlign: "center",
    borderRight: "1 solid black",
    fontSize: 8,
  },
  isi_title_prodi_yang_diberikan: {
    borderRight: "none",
  },
  isi_title_capaian: {
    fontFamily: "Poppins",
    textAlign: "left",
    paddingHorizontal: 10,
    height: 25,
    borderBottom: "1 solid black",
  },
  isi_cpl_prodi: {
    width: 65,
    textAlign: "center",
    borderRight: "1 solid black",
    fontSize: 8,
  },
  isi_cpl: {
    height: 25,
    borderBottom: "1 solid black",
    textAlign: "left",
    paddingHorizontal: 10,
  },
  isi_cpl_prodi_dua: {
    width: 325,
    textAlign: "center",
    borderRight: "none",
    fontSize: 8,
  },
  isi_kemampuan_empat: {
    width: 325,
    textAlign: "center",
    borderRight: "1 solid black",
    fontSize: 8,
  },
  isi_cpl_dua: {
    fontFamily: "Poppins",
    height: 25,
    borderBottom: "1 solid black",

    textAlign: "left",
    paddingHorizontal: 10,
  },
  isi_cpl_tiga: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  content_rps_empat: {
    borderBottom: "1 solid black",
    backgroundColor: "#d1d1d1",
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  sub_title_empat: {
    fontFamily: "Poppins600",
    padding: 5,
    width: 130,
    textAlign: "center",
    borderRight: "1 solid black",
    fontSize: 8,
  },
  isi_rps_empat: {
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },

});

export default styles;
