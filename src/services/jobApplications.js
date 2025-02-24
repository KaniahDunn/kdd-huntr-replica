import axios from "axios";

const baseUrl = "http://localhost:3001/jobApplications";

const getAllApplications = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const deleteApplication = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

const updateApplication = (id, updatedJob) =>
  axios.put(`${baseUrl}/${id}`, updatedJob).then((response) => response.data);

const createApplication = (newJob) =>
  axios.post(baseUrl, newJob).then((response) => response.data);

export default {
  getAllApplications,
  updateApplication,
  deleteApplication,
  createApplication,
};
