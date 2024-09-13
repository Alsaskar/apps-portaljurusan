import "./style.scss";
import Headers from "./Headers";
import RPSSatu from "./rpsSatu";
import RPSDua from "./rpsDua";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import RPSTiga from "./rpsTiga";

const TableComponent = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "RPS",
    // onAfterPrint: () => alert("Print success"),
  });
  return (
    <div className="rps">
      <div className="btn-rps">
        <button onClick={handlePrint} className="btn-view-rps">
          View PDF
        </button>
      </div>

      <div className="page-section" ref={componentRef}>

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

        {/*page content 3*/}
        <div className="rps-container">
          <div className="rps-content">
            <Headers />
            <RPSTiga />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default TableComponent;
