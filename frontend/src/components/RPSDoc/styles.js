import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    paddingTop: 30,
    paddingBottom: 60,
  },
  body: {
    paddingHorizontal: 30,
    flexGrow: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    fontSize: 10,
    paddingHorizontal: 80,
    color: 'black',
    fontFamily: "Poppins600Italic",
  },
});

export default styles;
