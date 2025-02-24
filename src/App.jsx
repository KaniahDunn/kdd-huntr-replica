import { useState, useEffect } from "react";
import jobApplications from "./services/jobApplications";
import { FiTrash2 } from "react-icons/fi";

function App() {
  const [jobs, setJobs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedStatus, setEditedStatus] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const [newJob, setNewJob] = useState({
    company: "",
    position: "",
    status: "Applied", // Default status
    applicationDate: new Date().toISOString().split("T")[0], // Default to today
    notes: "",
  });

  useEffect(() => {
    jobApplications.getAllApplications().then((data) => setJobs(data));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      jobApplications.deleteApplication(id).then(() => {
        setJobs(jobs.filter((job) => job.id !== id));
      });
    }
  };

  const handleEditClick = (id, currentStatus) => {
    setEditingId(id);
    setEditedStatus(currentStatus);
  };

  const handleSave = (id) => {
    const jobToUpdate = jobs.find((job) => job.id === id);

    if (!jobToUpdate) return;

    const updatedJob = { ...jobToUpdate, status: editedStatus };

    jobApplications.updateApplication(id, updatedJob).then((returnedJob) => {
      setJobs(jobs.map((job) => (job.id === id ? returnedJob : job)));
      setEditingId(null); // Close the edit mode
    });
  };

  const handleCreateJob = (e) => {
    e.preventDefault();

    jobApplications.createApplication(newJob).then((createdJob) => {
      setJobs([...jobs, createdJob]);
      setNewJob({
        company: "",
        position: "",
        status: "Applied",
        applicationDate: new Date().toISOString().split("T")[0],
        notes: "",
      });
    });
  };

  return (
    <div>
      <h1>Job Tracker</h1>
      <h2>Add New Job</h2>
      <form onSubmit={handleCreateJob}>
        <input
          type='text'
          name='company'
          placeholder='Company Name'
          value={newJob.company}
          onChange={handleInputChange}
          required
        />
        <input
          type='text'
          name='position'
          placeholder='Job Position'
          value={newJob.position}
          onChange={handleInputChange}
          required
        />
        <select
          name='status'
          value={newJob.status}
          onChange={handleInputChange}
        >
          <option value='Applied'>Applied</option>
          <option value='Interview'>Interview</option>
          <option value='Offer'>Offer</option>
          <option value='Rejected'>Rejected</option>
          <option value='Wishlist'>Wishlist</option>
        </select>
        <input
          type='date'
          name='applicationDate'
          value={newJob.applicationDate}
          onChange={handleInputChange}
        />
        <input
          type='text'
          name='notes'
          placeholder='Notes'
          value={newJob.notes}
          onChange={handleInputChange}
        />
        <button type='submit'>Add Job</button>
      </form>
      <h2>Job Applications</h2>
      <h3>Filter by Status:</h3>
      <select
        onChange={(e) => setFilterStatus(e.target.value)}
        value={filterStatus}
      >
        <option value='All'>All</option>
        <option value='Applied'>Applied</option>
        <option value='Interview'>Interview</option>
        <option value='Offer'>Offer</option>
        <option value='Rejected'>Rejected</option>
        <option value='Wishlist'>Wishlist</option>
      </select>

      <ul>
        {jobs
          .filter(
            (job) => filterStatus === "All" || job.status === filterStatus
          )
          .map((job) => (
            <li key={job.id}>
              {job.company} - {job.position}{" "}
              {editingId === job.id ? (
                <>
                  <input
                    type='text'
                    value={editedStatus}
                    onChange={(e) => setEditedStatus(e.target.value)}
                  />
                  <button onClick={() => handleSave(job.id)}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  ({job.status})
                  <button onClick={() => handleEditClick(job.id, job.status)}>
                    Update
                  </button>
                </>
              )}
              <FiTrash2
                onClick={() => handleDelete(job.id)}
                style={{ cursor: "pointer", marginLeft: "10px" }}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
