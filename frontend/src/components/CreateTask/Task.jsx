import PropTypes from "prop-types";
import toast from "react-hot-toast";
import "./Task.scss";
import { CiCircleRemove } from "react-icons/ci";
import { useDrag } from "react-dnd";
import axios from "axios";
import { urlApi } from "../../config";

const Task = ({ task, tasks, setTasks }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleRemove = async (id) => {
    try {
      await axios.delete(`${urlApi}/tasks/delete-task/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      const updatedTasks = tasks.filter((t) => t.id !== id);
      setTasks(updatedTasks);
      toast("Task removed", { icon: "☠️" });
    } catch (error) {
      console.error(
        "Error removing task:",
        error.response ? error.response.data : error.message
      );
      toast.error("Failed to remove task");
    }
  };

  return (
    <div ref={drag} className={`task ${isDragging ? "op" : "opa"}`}>
      <p className="title-task">{task.name}</p>
      <button className="btn-task-remove" onClick={() => handleRemove(task.id)}>
        <CiCircleRemove size={18} />
      </button>
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  setTasks: PropTypes.func.isRequired,
};

export default Task;