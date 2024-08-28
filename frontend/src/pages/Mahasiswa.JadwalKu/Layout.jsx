import { useEffect, useState, useContext } from "react";
import "./style.scss";
import CreateTask from "../../components/CreateTask/CreateTasks";
import ListTasks from "../../components/CreateTask/ListTasks";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import axios from "axios";
import { urlApi } from "../../config";
import { MahasiswaContext } from "../../context/MahasiswaContext";

const Layout = () => {
  const [tasks, setTasks] = useState([]);
  const { result } = useContext(MahasiswaContext) || {};
  const [mahasiswa, setMahasiswa] = useState(null);

  useEffect(() => {
    if (result) {
      setMahasiswa(result);

      const getTasks = async () => {
        try {
          const res = await axios.get(`${urlApi}/tasks/${result.id}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          });
          setTasks(res.data.tasks);
        } catch (error) {
          console.error(
            "Error fetching tasks:",
            error.response ? error.response.data : error.message
          );
        }
      };

      getTasks();
    }
  }, [result]);

  if (!mahasiswa) {
    return null;
  }

  const backend = "ontouchstart" in window ? TouchBackend : HTML5Backend;

  return (
    <DndProvider backend={backend}>
      <Toaster />
      {/* <p className="title-jadwal-ku">Jadwal Ku</p> */}
      <div className="panduan">
        <p className="title-panduan">Panduan</p>
        <ul>
          <li className="desc-panduan">Buat tugas</li>
          <li className="desc-panduan">
            Drag tugas dan arahkan ke status yang diinginkan (Todo, In Progress,
            Closed).
          </li>
          <li className="desc-panduan">
            Di dalam status mana pun (Todo, In Progress, Closed), cari tugas
            yang ingin Anda hapus.
          </li>
        </ul>
      </div>
      <div className="my-task">
        <CreateTask setTasks={setTasks} idMahasiswa={result.id} />
        <div className="section-list">
          <ListTasks tasks={tasks} setTasks={setTasks} />
        </div>
      </div>
    </DndProvider>
  );
};

export default Layout;