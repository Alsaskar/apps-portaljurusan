import Task from "../models/TaskModel";

// tambah tugas
export const createTask = async (req, res) => {
  const name = req.body.name;
  const status = req.body.status;
  const idMahasiswa = req.body.idMahasiswa;

  if (!name || !status) {
    return res.status(400).json({ message: "Name and status are required" });
  }

  try {
    const task = await Task.create({
      name: name,
      status: status,
      idMahasiswa: idMahasiswa,
    });

    return res.status(201).json({ task });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// dapatkan daftar tugas
export const getTasks = async (req, res) => {
  const idMahasiswa = req.params.idMahasiswa;

  try {
    const tasks = await Task.findAll({
      where: {
        idMahasiswa: idMahasiswa,
      },
    });

    return res.status(200).json({ tasks });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// update status tugas
export const updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const task = await Task.findByPk(id);

    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found", success: false });
    }

    // Periksa apakah status sudah sesuai
    if (task.status === status) {
      return res
        .status(200)
        .json({ message: "No change in task status", success: false, task });
    }

    // Update status tugas
    task.status = status;
    await task.save();

    return res
      .status(200)
      .json({
        message: "Task status successfully updated",
        success: true,
        task,
      });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// hapus tugas
export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByPk(id);

    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found", success: false });
    }

    await task.destroy();

    return res
      .status(200)
      .json({ message: "Task successfully deleted", success: true });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
