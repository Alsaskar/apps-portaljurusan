import PropTypes from 'prop-types';
import generatePdfBlob from "./LihatFileEvaluasi";
import useFormatDate from "../../hooks/useFormatDateHooks";
import { MdRemoveRedEye } from "react-icons/md";
import "./LihatData.scss";

const PdfButton = ({ result = {}, user = {}, evaluasiMahasiswa = [], dosen = {}, ttdUrl = {} }) => {
  const { formatDate } = useFormatDate(); 

  const handleClick = async () => {
    if (!result || !user || !Array.isArray(evaluasiMahasiswa) || !dosen) {
      console.error("Invalid data provided to PdfButton");
      return;
    }

    try {
      const blob = await generatePdfBlob(result, user, evaluasiMahasiswa, formatDate, dosen, ttdUrl);
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <button className="btn-data-evaluasi btn-pdf-evaluasi" onClick={handleClick}>
      <MdRemoveRedEye size={18} /> Lihat File
    </button>
  );
};

PdfButton.propTypes = {
  result: PropTypes.object,
  user: PropTypes.object,
  evaluasiMahasiswa: PropTypes.array,
  dosen: PropTypes.object, // Tambahkan prop types untuk dosen
  ttdUrl: PropTypes.string,
};

export default PdfButton;