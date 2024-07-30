import "./style.scss";
import { useState } from "react";
import { HiTrash } from "react-icons/hi2";
import { MdAddCircle } from "react-icons/md";
import { BsFillSendPlusFill } from "react-icons/bs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    // [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    // [
    //   { list: "ordered" },
    //   { list: "bullet" },
    //   { indent: "-1" },
    //   { indent: "+1" },
    // ],
    ["link"],
  ],
};

const Layout = () => {
  const [desc, setDesc] = useState("");
  const [visi, setVisi] = useState([""]);
  const [misi, setMisi] = useState([""]);

  const handleInputChangeVisi = (index, event) => {
    const newVisi = visi.slice();
    newVisi[index] = event.target.value;
    setVisi(newVisi);
  };

  const handleInputChangeMisi = (index, event) => {
    const newMisi = misi.slice();
    newMisi[index] = event.target.value;
    setMisi(newMisi);
  };

  const handleVisi = () => {
    setVisi([...visi, ""]);
  };

  const handleMisi = () => {
    setMisi([...misi, ""]);
  };

  const handleRemoveVisi = (index) => {
    const newVisi = visi.slice();
    newVisi.splice(index, 1);
    setVisi(newVisi);
  };

  const handleRemoveMisi = (index) => {
    const newMisi = misi.slice();
    newMisi.splice(index, 1);
    setMisi(newMisi);
  };

  const handleSubmitVisi = (event) => {
    event.preventDefault();
    console.log("Visions:", visi);
  };

  const handleSubmitMisi = (event) => {
    event.preventDefault();
    console.log("Misions:", misi);
  };

  return (
    <div className="tentang-hme">
      <div className="container">
        <div className="editor">
          <div className="text-editor">
            <p className="title">Buat Deskripsi</p>
            <ReactQuill
              theme="snow"
              value={desc}
              onChange={setDesc}
              modules={modules}
              className="text"
            />
            <button className="btn-buat">
              <BsFillSendPlusFill size={18} /> Submit
            </button>
          </div>

          <div className="hasil">
            <p className="title">Preview Deskripsi</p>
            <div
              className="preview"
              dangerouslySetInnerHTML={{ __html: desc }}
            />
          </div>
        </div>

        <div className="visi-misi-form">
          <form onSubmit={handleSubmitVisi} className="form-buat-visi">
            <p className="title">Buat Visi</p>
            {visi.map((vision, index) => (
              <div key={index} className="form-content">
                <div className="form-group">
                  <input
                    type="text"
                    value={vision}
                    onChange={(event) => handleInputChangeVisi(index, event)}
                    placeholder={`Visi ${index + 1}`}
                  />
                  {visi.length > 1 && (
                    <button
                      type="button"
                      className="btn-hapus"
                      onClick={() => handleRemoveVisi(index)}
                    >
                      <HiTrash size={18} />
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div className="btn-section">
              <button type="button" className="btn orange" onClick={handleVisi}>
                <MdAddCircle size={18} /> Tambah Visi
              </button>
              <button type="submit" className="btn blue">
                <BsFillSendPlusFill size={18} />
                Submit
              </button>
            </div>
          </form>

          <form onSubmit={handleSubmitMisi} className="form-buat-misi">
            <p className="title">Buat Misi</p>
            {misi.map((mision, index) => (
              <div key={index} className="form-content">
                <div className="form-group">
                  <input
                    type="text"
                    value={mision}
                    onChange={(event) => handleInputChangeMisi(index, event)}
                    placeholder={`Misi ${index + 1}`}
                  />
                  {misi.length > 1 && (
                    <button
                      type="button"
                      className="btn-hapus"
                      onClick={() => handleRemoveMisi(index)}
                    >
                      <HiTrash size={18} />
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div className="btn-section">
              <button type="button" className="btn orange" onClick={handleMisi}>
                <MdAddCircle size={18} /> Tambah Misi
              </button>
              <button type="submit" className="btn blue">
                <BsFillSendPlusFill size={18} />
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Layout;
