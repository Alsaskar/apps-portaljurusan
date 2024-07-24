import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  //header
  header: {
    padding: 0.7,
    border: "1 solid black",
  },
  
  header_border: {
    position: "relative",
    border: "1 solid black",
  },

  header_head_dua: {
    marginTop: 6,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  header_dua: {
    width: 130,
    borderTop: "1 solid black",
    borderRight: "1 solid black",
    padding: 5,
    backgroundColor: "#a9a9a9",
    fontSize: 10,
    fontFamily: "Poppins600",
    textAlign: "center",
  },
  fifthChild: {
    borderRight: "none",
  },

  title: {
    fontFamily: "Poppins",
    paddingTop: 6,
    textTransform: "uppercase",
    fontSize: 18,
    textAlign: "center",
  },
  title_jurusan: {
    fontFamily: "Poppins",
    textTransform: "uppercase",
    fontSize: 14,
    textAlign: "center",
  },
  title_prodi: {
    fontFamily: "Poppins",
    textTransform: "uppercase",
    fontSize: 14,
    textAlign: "center",
  },
  image: {
    position: "absolute",
    paddingTop: 6,
    paddingLeft: 15,
    width: 80,
  },
});

export default styles;
