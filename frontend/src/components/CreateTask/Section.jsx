import PropTypes from "prop-types";
import { useDrop } from "react-dnd";
import Header from "./Header";
import "./Section.scss";
import Task from "./Task";
import toast from "react-hot-toast";
import axios from "axios";
import { urlApi } from "../../config";

const Section = ({ status, tasks, setTasks }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let text = "Todo";
  let bg = "#5f47e8";
  let tasksToMap = tasks.filter((task) => task.status === status);

  if (status === "inprogress") {
    text = "In Progress";
    bg = "#e43cff";
  }

  if (status === "closed") {
    text = "Closed";
    bg = "#12a94f";
  }

  const addItemToSection = async (id) => {
    try {
      const response = await axios.put(
        `${urlApi}/tasks/update-task/${id}`,
        { status: status },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        // Hanya tampilkan pesan jika status berubah
        if (response.data.message.includes("successfully updated")) {
          toast("Status task berubah", { icon: "😮" });
        }
      } else {
        // Pesan untuk kasus ketika status tidak berubah
        toast("Status tidak berubah", { icon: "🔴" });
      }

      // Update task status di state lokal
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, status: status } : task
        )
      );
    } catch (error) {
      console.error(
        "Error updating task status:",
        error.response ? error.response.data : error.message
      );
      toast.error("Failed to update task status");
    }
  };

  return (
    <div ref={drop} className={`section-s ${isOver ? "bg-drop" : ""}`}>
      <Header text={text} bg={bg} count={tasksToMap.length} />
      {tasksToMap.length > 0 &&
        tasksToMap.map((task) => (
          <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
        ))}
    </div>
  );
};

Section.propTypes = {
  status: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  setTasks: PropTypes.func.isRequired,
};

export default Section;
