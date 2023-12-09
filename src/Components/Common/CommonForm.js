import React from "react";

function CommonForm({ onSubmit, buttonText, fields }) {
  return (
    <form onSubmit={onSubmit}>
      {fields.map((field) => (
        <input
          key={field.name}
          name={field.name}
          type={field.type}
          placeholder={field.placeholder}
          className={field.className}
          required
        />
      ))}
      <input type="submit" value={buttonText} className="login-button" />
    </form>
  );
}

export default CommonForm;
