import "./Form.css";

function Form({ newJob, handleInputChange, handleCreateJob }) {
  return (
    <div className="form-container">
      <h2>Add New Job</h2>
      <form onSubmit={handleCreateJob}>
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={newJob.company}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="position"
          placeholder="Job Position"
          value={newJob.position}
          onChange={handleInputChange}
          required
        />
        <select
          name="status"
          value={newJob.status}
          onChange={handleInputChange}
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
          <option value="Wishlist">Wishlist</option>
        </select>
        <input
          type="date"
          name="applicationDate"
          value={newJob.applicationDate}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="notes"
          placeholder="Notes"
          value={newJob.notes}
          onChange={handleInputChange}
        />
        <button type="submit">Add Job</button>
      </form>
    </div>
  );
}

export default Form;
