import { useState } from "react";
import axios from "axios";
import "./CreateTasks.scss";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import { urlApi } from "../../config";


const CreateTasks = ({ setTasks, idMahasiswa }) => {
  const [task, setTask] = useState({
    name: "",
    status: "todo",
    idMahasiswa: idMahasiswa,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(idMahasiswa)

    if (task.name.length < 3)
      return toast.error("Task harus lebih dari 3 karakter");

    if (task.name.length > 100)
      return toast.error("Task tidak boleh lebih dari 100 karakter");

    try {
      const res = await axios.post(`${urlApi}/tasks/create-task`, task, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      const newTask = res.data.task;

      setTasks((prev) => [...prev, newTask]);

      toast.success("Task telah dibuat");

      setTask({
        name: "",
        status: "todo",
        idMahasiswa: idMahasiswa,
      });
    } catch (error) {
      console.error(
        "Error creating task:",
        error.response ? error.response.data : error.message
      );
      toast.error("Gagal membuat task");
    }
  };

  return (
    <form className="form-input-task" onSubmit={handleSubmit}>
      <input
        type="text"
        className="input-task"
        placeholder="Buat tugas..."
        value={task.name}
        onChange={(e) => setTask({ ...task, name: e.target.value })}
      />
      <button className="btn-create-task">Buat</button>
    </form>
  );
};

CreateTasks.propTypes = {
  setTasks: PropTypes.func.isRequired,
  idMahasiswa:  PropTypes.number.isRequired,
};

export default CreateTasks;