import axios from 'axios';

class TestService {
  async getTests() {
    const response = await axios.get(`/api/tests`);
    console.log('response', response.data.tests)
    return response.data.tests;
  } 

  async createTest(test) {
    const response = await axios.post(`/api/test`, test);
    return response.data;
  }
}
export const testService = new TestService();
