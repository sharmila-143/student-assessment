import React, { useState } from "react";
import "./Form.css"; // Optional CSS for responsive design

const initialFormData = {
  name: "",
  rollNumber: "",
  branch: "",
  email: "",
  backlogs: "",
  cgpa: "",
  vocabulary: "",
  arithmetic: "",
  reasoning: "",
  coding: ""
};

const Form = () => {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow only scores between 0–10 for score fields
    if (["vocabulary", "arithmetic", "reasoning", "coding"].includes(name)) {
      if (value !== "" && (isNaN(value) || value < 0 || value > 10)) return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxH3KAJ5207Pht1QvAd3v4z-AwabM-rkCFjlKvHuXc4POCiFq2OdGeJaGsqMzze_UxG4w/exec", // Replace with your actual deployed URL
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (response.ok) {
        alert("Form submitted successfully!");
        setFormData(initialFormData);
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      alert("Error submitting form.");
      console.error("Form Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Avanthi’s Student Form</h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="rollNumber"
        placeholder="Roll Number"
        value={formData.rollNumber}
        onChange={handleChange}
        required
      />

      <select
        name="branch"
        value={formData.branch}
        onChange={handleChange}
        required
      >
        <option value="">Select Branch</option>
        <option value="CSE">CSE</option>
        <option value="ECE">ECE</option>
        <option value="EEE">EEE</option>
        <option value="MECH">MECH</option>
        <option value="CIVIL">CIVIL</option>
        <option value="AI&DS">AI&ML</option>
      </select>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <select
        name="backlogs"
        value={formData.backlogs}
        onChange={handleChange}
        required
      >
        <option value="">Backlogs?</option>
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2+</option>
      </select>

      {formData.backlogs === "0" && (
        <input
          type="text"
          name="cgpa"
          placeholder="Enter CGPA"
          value={formData.cgpa}
          onChange={handleChange}
          required
        />
      )}

      <input
        type="text"
        name="vocabulary"
        placeholder="Vocabulary Score (0-10)"
        value={formData.vocabulary}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="arithmetic"
        placeholder="Arithmetic Score (0-10)"
        value={formData.arithmetic}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="reasoning"
        placeholder="Reasoning Score (0-10)"
        value={formData.reasoning}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="coding"
        placeholder="Coding Score (0-10)"
        value={formData.coding}
        onChange={handleChange}
        required
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
