import "./style.scss";
import Headers from "./Headers";
import RPSSatu from "./rpsSatu";
import RPSDua from "./rpsDua";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import RPSTiga from "./rpsTiga";
import axios from "axios";
import { urlApi } from "../../config";
import { FaCheckDouble } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import ModalReject from "./ModalReject";
import Swal from "sweetalert2";
import { DosenContext } from "../../context/DosenContext";

const TableComponent = () => {
  const { result } = useContext(DosenContext) || {};
  const [rps, setRps] = useState([]);
  const [rpsMingguan, setRpsMingguan] = useState([]);
  const { id } = useParams();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "RPS",
    // onAfterPrint: () => alert("Print success"),
  });
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleRejectModal = () => {
    setShowModal(true);
  };

  const handleApprove = () => {
    Swal.fire({
      title: "Approve",
      text: "Apakah anda yakin ingin approve RPS ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios
            .put(
              `${urlApi}/rps/approve/${id}`,
              {
                status: "approve",
              },
              {
                headers: {
                  Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
              }
            )
            .then((res) => {
              Swal.fire({
                title: "Success",
                text: res.data.message,
                icon: "success",
                confirmButtonText: "Ok",
              });

              setTimeout(() => {
                window.location.reload();
              }, 1500);
            });
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  const _detailData = async () => {
    try {
      const res = await axios.get(`${urlApi}/rps/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      const rpsMingguan = await axios.get(`${urlApi}/rps/mingguan/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      setRps(res.data.result);
      setRpsMingguan(rpsMingguan.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    _detailData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <RPSSatu data={rps} />
          </div>
        </div>

        {/*page content 2*/}
        <div className="rps-container">
          <div className="rps-content">
            <Headers />
            <RPSDua data={rps} />
          </div>
        </div>

        {/*page content 3*/}
        <div className="rps-container">
          <div className="rps-content">
            <Headers />
            <RPSTiga data={rpsMingguan} />
          </div>

          <div className="btn-section">
            <button type="submit" className="btn-rps back">
              <IoMdArrowRoundBack size={17} /> Back
            </button>

            {result?.asKaprodi === "yes" && (
              <>
                {rps.status !== "approve" && rps.status !== 'reject' && (
                  <>
                    <button
                      type="submit"
                      className="btn-rps terima"
                      onClick={handleApprove}
                    >
                      <FaCheckDouble size={14} /> Approve
                    </button>
                    <button
                      type="submit"
                      className="btn-rps tolak"
                      onClick={handleRejectModal}
                    >
                      <MdCancel size={17} /> Reject
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <ModalReject isOpen={showModal} handleClose={handleCloseModal} />
    </div>
  );
};

export default TableComponent;