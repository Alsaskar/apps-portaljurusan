import PropTypes from 'prop-types';
import generatePdfBlob from "./LihatFileEvaluasi";
import useFormatDate from "../../hooks/useFormatDateHooks";
import { MdRemoveRedEye } from "react-icons/md";
import "./style.scss";

const PdfButton = ({ result = {}, user = {}, evaluasiMahasiswa = [] }) => {
  const { formatDate } = useFormatDate(); // Pastikan ini memanggil formatDate dari hook

  const handleClick = async () => {
    // Cek jika result, user, atau evaluasiMahasiswa tidak ada
    if (!result || !user || !Array.isArray(evaluasiMahasiswa)) {
      console.error("Invalid data provided to PdfButton");
      return;
    }

    try {
      // Generate PDF blob
      const blob = await generatePdfBlob(
        result,
        user,
        evaluasiMahasiswa,
        formatDate
      );
      // Create a URL for the blob
      const url = URL.createObjectURL(blob);
      // Open the PDF in a new tab
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <button className="btn-data-evaluasi btn-pdf-evaluasi" onClick={handleClick}>
      <MdRemoveRedEye size={18} /> View Evaluasi
    </button>
  );
};

// Define PropTypes for the component
PdfButton.propTypes = {
  result: PropTypes.object,
  user: PropTypes.object,
  evaluasiMahasiswa: PropTypes.array,
};

export default PdfButton;