import { StyleSheet } from "@react-pdf/renderer";

const capaian = StyleSheet.create({
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
 
  sub_title_capaian: {
    width: "50%",
  },
  sub_title_prodi_yang_diberikan: {
    borderRight: "none",
    width: "50%",
  },
  isi_title_prodi_yang_diberikan: {
    borderRight: "none",
  },
  isi_cpl_prodi_dua: {
    width: 325,
    textAlign: "center",
    borderRight: "none",
    fontSize: 8,
  },
  isi_cpl_dua: {
    fontFamily: "Poppins",
    height: 25,
    borderBottom: "1 solid black",

    textAlign: "left",
    paddingHorizontal: 10,
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
  isi_title_cpmk: {
    fontFamily: "Poppins",
    textAlign: "left",
    paddingHorizontal: 10,
    height: 25,
    borderBottom: "1 solid black",
  },
  isi_cpmk_empat: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  isi_rps_empat: {
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  isi_empat: {
    // padding: 10,
    width: 65,
    textAlign: "center",
    borderRight: "1 solid black",
    fontSize: 8,
  },
  isi_capaian_empat: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  isi_kemampuan_empat: {
    width: 325,
    textAlign: "center",
    borderRight: "1 solid black",
    fontSize: 8,
  },
  isi_capaian_cpmk: {
    width: 65,
    textAlign: "center",
    borderRight: "1 solid black",
    fontSize: 8,
  },
  isi_cpmk: {
    height: 25,
    fontFamily: "Poppins",
    borderBottom: "1 solid black",
    textAlign: "left",
    paddingHorizontal: 10,
  },
});

export default capaian;
