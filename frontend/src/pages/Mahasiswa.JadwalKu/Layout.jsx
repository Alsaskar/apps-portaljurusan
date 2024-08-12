import { useEffect, useState } from "react";
import "./style.scss";
import CreateTask from "../../components/CreateTask/CreateTasks";
import ListTasks from "../../components/CreateTask/ListTasks";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from 'react-dnd-touch-backend';
import axios from "axios";
import { urlApi } from "../../config";

const Layout = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`${urlApi}/tasks`, {
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
    fetchTasks();
  }, []);

  const backend = 'ontouchstart' in window ? TouchBackend : HTML5Backend;

  return (
    <DndProvider backend={backend}>
      <Toaster />
      {/* <p className="title-jadwal-ku">Jadwal Ku</p> */}
      <div className="panduan">
        <p className="title-panduan">Panduan</p>
        <ul>
          <li className="desc-panduan">Buat tugas.</li>
          <li className="desc-panduan">
            Drag tugas dan arahkan ke status yang diinginkan (Todo, In Progress, Closed).
          </li>
          <li className="desc-panduan">Di dalam status mana pun (Todo, In Progress, Closed), cari tugas yang ingin Anda hapus.</li>
        </ul>
      </div>
      <div className="my-task">
        <CreateTask setTasks={setTasks} />
        <div className="section-list">
          <ListTasks tasks={tasks} setTasks={setTasks} />
        </div>
      </div>
    </DndProvider>
  );
};

export default Layout;
