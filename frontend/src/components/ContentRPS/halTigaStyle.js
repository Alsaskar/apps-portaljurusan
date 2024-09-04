import { StyleSheet } from "@react-pdf/renderer";

const halTiga = StyleSheet.create({
  bodyText: {
    fontFamily: "Poppins",
  },

  content_rps: {
    borderRight: "1 solid black",
    borderLeft: "1 solid black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  content_rps_dp: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  desc_section: {
    flexDirection: "row",
    display: "flex",
  },
  
  mt: {
    borderTop: "1 solid black",
    marginTop: 20,
  },

  desc_title: {
    width: 140,
    backgroundColor: "#d1d1d1",
    borderBottom: "1 solid black",
  },

  desc_b: {
    borderLeft: "1 solid black",
  },

  desc_title_text: {
    fontSize: 8,
    fontFamily: "Poppins600",
    marginLeft: 5,
  },

  desc_h_satu: {
    height: 50,
  },

  desc_h_dua: {
    height: 120,
    maxWidth: 110,
  },

  desc_h_tiga: {
    height: 180,
  },

  desc_h_empat: {
    height: 20,
  },

  desc_h_lima: {
    height: 30,
    maxWidth: 110,
  },


  desc_content: {
    width: "100%",
    borderLeft: "1 solid black",
    backgroundColor: "#fff",
  },

  desc_text: {
    borderBottom: "1 solid black",
  },

  desc_text_b: {
    borderRight: "1 solid black",
  },

  desc_content_text: {
    fontSize: 8,
    paddingHorizontal: 5,
  },

  desc_utama: {
    fontFamily: "Poppins600",
  },

  desc_list: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
  },

  h_satu: {
    height: 50,
  },

  h_dua: {
    height: 120,
  },

  h_tiga: {
    height: 180,
  },

  h_empat: {
    height: 20,
  },

  h_lima: {
    height: 30,
  },
});

export default halTiga;
