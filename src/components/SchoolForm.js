import React, { useState } from "react";
import "./school.css";

const School = () => {
  const [data, setData] = useState([
    { category: "Male", general: "", obc: "", sc: "", st: "", overall: "" },
    { category: "Female", general: "", obc: "", sc: "", st: "", overall: "" },
  ]);

  const handleInputChange = (index, columnName, value) => {
    const newData = [...data];
    newData[index][columnName] = value;
    setData(newData);
  };

  const handleSubmit = () => {
    // Handle the submission logic here
    console.log("Submitted Data:", data);

    // Show a dialog box
    window.alert("Submitted successfully!");
  };

  return (
    <div className="school-container">
      <h1>School Data</h1>
      <table className="data-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>General</th>
            <th>OBC</th>
            <th>SC</th>
            <th>ST</th>
            <th>Overall</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.category}</td>
              <td>
                <input
                  type="text"
                  value={row.general}
                  onChange={(e) =>
                    handleInputChange(index, "general", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.obc}
                  onChange={(e) => handleInputChange(index, "obc", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.sc}
                  onChange={(e) => handleInputChange(index, "sc", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.st}
                  onChange={(e) => handleInputChange(index, "st", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.overall}
                  onChange={(e) =>
                    handleInputChange(index, "overall", e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="date-select">
        <form action="/action_page.php">
          <div className="d1">
            <label htmlFor="start">Start</label>
            <input type="date" id="start" name="start" />
          </div>
          <div className="d2">
            <label htmlFor="end"> End</label>
            <input type="date" id="end" name="end" />
          </div>
        </form>
      </div>
      <div className="button-container">
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default School;
