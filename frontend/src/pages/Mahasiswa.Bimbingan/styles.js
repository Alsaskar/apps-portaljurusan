import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    paddingVertical: 40,
    paddingHorizontal: 30,
  },

  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    // backgroundColor: "red",
  },

  //header
  header: {
    padding: 0.4,
    border: "1 solid black",
    height: 80,
  },

  border: {
    position: "relative",
    // padding: 10,
    height: 80,
    border: "1 solid black",
  },

  image: {
    position: "absolute",
    width: 50,
    paddingTop: 5,
    paddingLeft: 10,
  },

  title: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 25,
  },

  header_head_dua: {
    marginTop: 12,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  header_dua: {
    borderTop: "1 solid black",
    borderRight: "1 solid black",
    padding: 5,
    backgroundColor: "#a9a9a9",
    fontSize: 10,
    textAlign: "center",
    fontFamily: "Poppins500",
  },

  fifthChild: {
    width: 125,
    borderRight: "none",
  },

  title_daftar: {
    display: "flex",
    alignItems: "center",
    gap: 3,
    marginTop: 25,
  },

  text: {
    fontSize: 14,
  },

  text_semester: {
    fontSize: 8,
  },

  details: {
    display: "flex",
    flexDirection: "row",
    marginTop: 25,
    border: "0.8 solid black",
  },

  titik_dua: {
    borderRight: "0.8 solid black",
    borderLeft: "0.8 solid black",
    borderBottom: "0.8 solid black",
    // marginLeft: 20,
    paddingLeft: 5,
    paddingRight: 3,
  },

  child: {
    borderBottom: "none",
  },

  text_detail: {
    borderBottom: "0.8 solid black",
    paddingHorizontal: 5,
    paddingVertical: 2,
    fontSize: 8,
  },

  width_text: {
    width: 108,
  },

  width: {
    width: 375,
  },

  konsultasi: {
    marginTop: 20,
  },

  isi: {
    flexDirection: "row",
  },

  section_title: {
    fontSize: 8,
    // border: "1 solid black",
  },

  tanggal: {
    paddingVertical: 10,
    textAlign: "center",
    width: 70,
    backgroundColor: "#c2d0ff",
    borderTop: "1 solid black",
    borderLeft: "1 solid black",
    borderRight: "1 solid black",
    borderBottom: "1 solid black",
  },

  isi_tanggal: {
    width: 68.5,
    height: 40,
    padding: 5,
    borderTop: "none",
    borderLeft: "1 solid black",
    borderBottom: "1 solid black",
  },

  kegiatan: {
    paddingVertical: 10,
    textAlign: "center",
    width: 120,
    backgroundColor: "#c2d0ff",
    borderTop: "1 solid black",
    borderRight: "1 solid black",
    borderBottom: "1 solid black",
  },

  isi_kegiatan: {
    width: 119,
    height: 40,
    padding: 5,
    borderTop: "none",
    borderLeft: "1 solid black",
    borderBottom: "1 solid black",
  },

  permasalahan: {
    paddingVertical: 10,
    textAlign: "center",
    width: 100,
    backgroundColor: "#c2d0ff",
    borderTop: "1 solid black",
    borderRight: "1 solid black",
    borderBottom: "1 solid black",
  },

  isi_permasalahan: {
    width: 99,
    height: 40,
    padding: 5,
    borderTop: "none",
    borderLeft: "1 solid black",
    borderBottom: "1 solid black",
  },

  solusi: {
    paddingVertical: 10,
    textAlign: "center",
    width: 110,
    backgroundColor: "#c2d0ff",
    borderTop: "1 solid black",
    borderRight: "1 solid black",
    borderBottom: "1 solid black",
  },

  isi_solusi: {
    width: 109,
    height: 40,
    padding: 5,
    borderTop: "none",
    borderLeft: "1 solid black",
    borderBottom: "1 solid black",
  },

  tanda: {
    paddingVertical: 10,
    textAlign: "center",
    width: 100,
    backgroundColor: "#c2d0ff",
    borderTop: "1 solid black",
    borderBottom: "1 solid black",
    borderRight: "1 solid black",
  },

  isi_tanda: {
    width: 100,
    height: 40,
    padding: 5,
    borderTop: "none",
    borderLeft: "1 solid black",
    borderRight: "1 solid black",
    borderBottom: "1 solid black",
  },

  isi_content: {
    flexDirection: "row",
  },

  date: {
    marginTop: 20,
  },

  text_date: {
    textAlign: "right",
    fontSize: 8,
  },

  ttd: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  ttd_koor: {
    display: "flex",
    gap: 2,
  },

  mengetahui: {
    fontSize: 8,
  },

  name: {
    marginTop: 50,
  },

  ttd_dosen: {},

  pembimbing: {
    fontSize: 8,
  },

  dosen_pembimbing: {
    marginTop: 10,
  },

  name_dosen: {
    marginTop: 50,
  },

  row: {
    flexDirection: "row",
    borderWidth: 1,
    alignItems: "center",
    height: 24,
    fontSize: 10,
  },

  cell: {
    padding: 5,
  },
});

export default styles;
