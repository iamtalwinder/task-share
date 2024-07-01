import axios from 'axios';

class TaskService {
  async getTasks() {
    const response = await axios.get(`/api/tasks`);
    return response.data.tasks;
  }

  async createTask(task) {
    const response = await axios.post(`/api/task`, task);
    return response.data;
  }

  async getTaskById(taskId) {
    const response = await axios.get(`/api/task/${taskId}`);
    return response.data.taskId;
  }

  async updateTask(taskId, updatedTask) {
    const response = await axios.put(`/api/task/${taskId}`, updatedTask);
    return response.data.task;
  }
}

export const taskService = new TaskService();
