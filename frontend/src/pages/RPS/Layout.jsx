import "./style.scss";
import html2pdf from "html2pdf.js";
import Headers from "./Headers";
import RPSSatu from "./rpsSatu";
import RPSDua from "./rpsDua";

const TableComponent = () => {
  return (
    <div className="rps">
      <div className="btn-rps">
        <button onClick={printPDF} className="btn-view-rps">
          View PDF
        </button>
      </div>

      <div className="page-section">
        {/*page content 1*/}
        <div className="rps-container">
          <div className="rps-content">
            <Headers />
            <RPSSatu />
          </div>
        </div>
        {/*page content 2*/}
        <div className="rps-container">
          <div className="rps-content">
            <Headers />
            <RPSDua />
          </div>
        </div>
      </div>
    </div>
  );
};

const printPDF = async () => {
  const element = document.querySelector(".page-section");
  const opt = {
    margin: 0.3,
    filename: "rps.pdf",
    html2canvas: { scale: 10 },
    jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
  };

  try {
    // Menggunakan 'html2pdf().from(element).toPdf().get('pdf')' untuk mengontrol pembuatan halaman lebih lanjut
    const pdf = await html2pdf().from(element).set(opt).toPdf().get('pdf');
    
    // Mengatur pemisahan halaman jika diperlukan
    pdf.internal.pageSize.height = 800; // Ubah ini sesuai dengan kebutuhan

    // Menyimpan hasil PDF
    const pdfBlob = await pdf.output("blob");

    const url = URL.createObjectURL(pdfBlob);
    window.open(url, "_blank");
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};


export default TableComponent;
