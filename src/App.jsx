import "./App.css";
import { useState, useEffect } from "react";
import jobApplications from "./services/jobApplications";
import { FiTrash2 } from "react-icons/fi";
import Form from "./components/Form /Form";

function App() {
  const [jobs, setJobs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedJob, setEditedJob] = useState({});
  const [filterStatus, setFilterStatus] = useState("All");

  const [newJob, setNewJob] = useState({
    company: "",
    position: "",
    status: "Applied",
    applicationDate: new Date().toISOString().split("T")[0],
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

  const handleEditClick = (job) => {
    setEditingId(job.id);
    setEditedJob({ ...job });
  };

  const handleSave = (id) => {
    jobApplications.updateApplication(id, editedJob).then((returnedJob) => {
      setJobs(jobs.map((job) => (job.id === id ? returnedJob : job)));
      setEditingId(null);
      setEditedJob({});
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
    <div className='container'>
      <div>
        <h1>Job Tracker</h1>
        <Form
          newJob={newJob}
          handleInputChange={handleInputChange}
          handleCreateJob={handleCreateJob}
        />

        <h2>Job Applications</h2>
        <h3>Filter by Status:</h3>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value='All'>All</option>
          <option value='Applied'>Applied</option>
          <option value='Interview'>Interview</option>
          <option value='Offer'>Offer</option>
          <option value='Rejected'>Rejected</option>
          <option value='Wishlist'>Wishlist</option>
        </select>

        <table border='1' cellPadding='8' cellSpacing='0'>
          <thead>
            <tr>
              <th>Company</th>
              <th>Position</th>
              <th>Status</th>
              <th>Application Date</th>
              <th>Contact</th>
              <th>Notes</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {jobs
              .filter(
                (job) => filterStatus === "All" || job.status === filterStatus
              )
              .map((job) => (
                <tr key={job.id}>
                  <td>
                    {editingId === job.id ? (
                      <input
                        type='text'
                        value={editedJob.company}
                        onChange={(e) =>
                          setEditedJob({
                            ...editedJob,
                            company: e.target.value,
                          })
                        }
                      />
                    ) : (
                      job.company
                    )}
                  </td>
                  <td>
                    {editingId === job.id ? (
                      <input
                        type='text'
                        value={editedJob.position}
                        onChange={(e) =>
                          setEditedJob({
                            ...editedJob,
                            position: e.target.value,
                          })
                        }
                      />
                    ) : (
                      job.position
                    )}
                  </td>
                  <td>
                    {editingId === job.id ? (
                      <select
                        value={editedJob.status}
                        onChange={(e) =>
                          setEditedJob({ ...editedJob, status: e.target.value })
                        }
                      >
                        <option value='Applied'>Applied</option>
                        <option value='Interview'>Interview</option>
                        <option value='Offer'>Offer</option>
                        <option value='Rejected'>Rejected</option>
                        <option value='Wishlist'>Wishlist</option>
                      </select>
                    ) : (
                      job.status
                    )}
                  </td>
                  <td>
                    {editingId === job.id ? (
                      <input
                        type='date'
                        value={editedJob.applicationDate}
                        onChange={(e) =>
                          setEditedJob({
                            ...editedJob,
                            applicationDate: e.target.value,
                          })
                        }
                      />
                    ) : (
                      job.applicationDate
                    )}
                  </td>
                  <td>
                    {editingId === job.id ? (
                      <>
                        <input
                          type='text'
                          value={editedJob.contact?.name || ""}
                          placeholder='Name'
                          onChange={(e) =>
                            setEditedJob({
                              ...editedJob,
                              contact: {
                                ...editedJob.contact,
                                name: e.target.value,
                              },
                            })
                          }
                        />
                        <input
                          type='email'
                          value={editedJob.contact?.email || ""}
                          placeholder='Email'
                          onChange={(e) =>
                            setEditedJob({
                              ...editedJob,
                              contact: {
                                ...editedJob.contact,
                                email: e.target.value,
                              },
                            })
                          }
                        />
                        <input
                          type='tel'
                          value={editedJob.contact?.phone || ""}
                          placeholder='Phone'
                          onChange={(e) =>
                            setEditedJob({
                              ...editedJob,
                              contact: {
                                ...editedJob.contact,
                                phone: e.target.value,
                              },
                            })
                          }
                        />
                      </>
                    ) : job.contact ? (
                      <>
                        <div>
                          <strong>{job.contact.name}</strong>
                        </div>
                        <div>{job.contact.email}</div>
                        <div>{job.contact.phone}</div>
                      </>
                    ) : (
                      <em>No contact info</em>
                    )}
                  </td>
                  <td>
                    {editingId === job.id ? (
                      <input
                        type='text'
                        value={editedJob.notes}
                        onChange={(e) =>
                          setEditedJob({ ...editedJob, notes: e.target.value })
                        }
                      />
                    ) : (
                      job.notes
                    )}
                  </td>
                  <td>
                    {editingId === job.id ? (
                      <>
                        <button onClick={() => handleSave(job.id)}>Save</button>
                        <button onClick={() => setEditingId(null)}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button onClick={() => handleEditClick(job)}>
                        Update
                      </button>
                    )}
                  </td>
                  <td className='delete-cell'>
                    <FiTrash2
                      onClick={() => handleDelete(job.id)}
                      className='trash-icon'
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
