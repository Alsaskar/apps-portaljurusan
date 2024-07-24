import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Data untuk tabel (contoh data)
const data = [
  { id: 1, name: 'John Doe', age: 28, city: 'New York' },
  { id: 2, name: 'Jane Smith', age: 32, city: 'Los Angeles' },
  { id: 3, name: 'Mike Johnson', age: 25, city: 'Chicago' },
  { id: 4, name: 'Sarah Brown', age: 30, city: 'Houston' },
  { id: 4, name: 'Sarah Brown', age: 30, city: 'Houston' },
  { id: 4, name: 'Sarah Brown', age: 30, city: 'Houston' },
  { id: 4, name: 'Sarah Brown', age: 30, city: 'Houston' },
  { id: 4, name: 'Sarah Brown', age: 30, city: 'Houston' },
  { id: 4, name: 'Sarah Brown', age: 30, city: 'Houston' },
  { id: 4, name: 'Sarah Brown', age: 30, city: 'Houston' },
  { id: 4, name: 'Sarah Brown', age: 30, city: 'Houston' },
  { id: 4, name: 'Sarah Brown', age: 30, city: 'Houston' },
  { id: 4, name: 'Sarah Brown', age: 30, city: 'Houston' },
  { id: 4, name: 'Sarah Brown', age: 30, city: 'Houston' },
  { id: 4, name: 'Sarah Brown', age: 30, city: 'Houston' },
  { id: 4, name: 'Sarah Brown', age: 30, city: 'Houston' },
  { id: 4, name: 'Sarah Brown', age: 30, city: 'Houston' },
  { id: 4, name: 'Sarah Brown', age: 30, city: 'Houston' },
  { id: 4, name: 'Sarah Brown', age: 30, city: 'Houston' },
];

// Styles untuk PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    backgroundColor: "red",
    // borderWidth: 1,
  },
  header: {
    fontWeight: 'bold',
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    borderWidth: 1,
    alignItems: 'center',
    height: 24,
    fontSize: 10,
  },
  cell: {
    padding: 5,
  },
});

// Komponen PDF
const RpsSurat = () => (
  <PDFViewer style={{ height: "100vh", width: "100%" }}>
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>ID</Text>
        <Text style={styles.header}>Name</Text>
        <Text style={styles.header}>Age</Text>
        <Text style={styles.header}>City</Text>
        {data.map((item) => (
          <View key={item.id} style={styles.row}>
            <Text style={[styles.cell, { width: 40 }]}>{item.id}</Text>
            <Text style={[styles.cell, { width: 120 }]}>{item.name}</Text>
            <Text style={[styles.cell, { width: 40 }]}>{item.age}</Text>
            <Text style={[styles.cell, { width: 80 }]}>{item.city}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
  </PDFViewer>
);

export default RpsSurat;
