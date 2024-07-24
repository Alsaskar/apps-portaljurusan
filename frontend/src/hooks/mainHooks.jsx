export const formatTanggal = (tgl) => {
  const tanggalInput = tgl;

  // Memisahkan tahun, bulan, dan hari
  const tahun = tanggalInput.substring(0, 4);
  const bulan = tanggalInput.substring(5, 7);
  const hari = tanggalInput.substring(8, 10);

  // Membuat format baru "DD/MM/YYYY"
  const tanggalOutput = `${hari}/${bulan}/${tahun}`;

  return tanggalOutput;
};
