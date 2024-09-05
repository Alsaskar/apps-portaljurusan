import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Data untuk tabel (contoh data)
const data = [
  // Tambahkan data di sini
  { id: 1, name: 'John Doe', age: 28, city: 'New York' },
  { id: 2, name: 'Jane Smith', age: 32, city: 'Los Angeles' },
  { id: 3, name: 'Mike Johnson', age: 25, city: 'Chicago' },
  { id: 4, name: 'Sarah Brown', age: 30, city: 'Houston' },
  { id: 4, name: 'Sarah Brown', age: 30, city: 'Houston' },
  { id: 4, name: 'Sarah Brown', age: 30, city: 'Houston' },
  // Tambahkan lebih banyak data jika diperlukan
];

// Styles untuk PDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: '#E4E4E4',
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
  },
  headerRow: {
    display: 'table-row',
    backgroundColor: '#d3d3d3',
  },
  row: {
    display: 'table-row',
  },
  cell: {
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    padding: 5,
    fontSize: 10,
    textAlign: 'center',
  },
  headerCell: {
    fontWeight: 'bold',
  },
  pageBreak: {
    marginBottom: 20,
  },
  pageBreakView: {
    height: 842 - 40, // Adjust as necessary for your layout
    border: '1 solid black',
    marginBottom: 20,
  },
});

// Komponen PDF
const RpsSurat = () => {
  const ITEMS_PER_PAGE = 15; // Jumlah baris per halaman

  // Membagi data menjadi beberapa halaman
  const pages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const pageData = Array.from({ length: pages }, (_, pageIndex) =>
    data.slice(pageIndex * ITEMS_PER_PAGE, (pageIndex + 1) * ITEMS_PER_PAGE)
  );

  return (
    <PDFViewer style={{ height: "100vh", width: "100%" }}>
      <Document>
        {pageData.map((pageItems, pageIndex) => (
          <Page key={pageIndex} size="A4" orientation="landscape" style={styles.page}>
            <View style={styles.table}>
              {/* Header */}
              <View style={[styles.row, styles.headerRow]}>
                <Text style={[styles.cell, styles.headerCell, { width: 40 }]}>ID</Text>
                <Text style={[styles.cell, styles.headerCell, { width: 120 }]}>Name</Text>
                <Text style={[styles.cell, styles.headerCell, { width: 40 }]}>Age</Text>
                <Text style={[styles.cell, styles.headerCell, { width: 80 }]}>City</Text>
              </View>
              {/* Data Rows */}
              {pageItems.map((item) => (
                <View key={item.id} style={styles.row}>
                  <Text style={[styles.cell, { width: 40 }]}>{item.id}</Text>
                  <Text style={[styles.cell, { width: 120 }]}>{item.name}</Text>
                  <Text style={[styles.cell, { width: 40 }]}>{item.age}</Text>
                  <Text style={[styles.cell, { width: 80 }]}>{item.city}</Text>
                </View>
              ))}
            </View>
            {pageIndex < pages - 1 && <View style={styles.pageBreakView} />} {/* Optional page break */}
          </Page>
        ))}
      </Document>
    </PDFViewer>
  );
};

export default RpsSurat;
