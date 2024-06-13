import axios from 'axios';

class TaskService {

  async getTasks() {
    const response = await axios.get(`/api/tasks`);
    return response.data;
  }

}

export const taskService = new TaskService();
