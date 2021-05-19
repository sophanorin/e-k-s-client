import React, { useState } from "react";
import * as contactStyles from "./ContactScreen.module.css";
function ContactScreen() {
  const [status, setStatus] = useState("");
  const submitForm = (ev) => {
    ev.preventDefault();
    const form = ev.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        setStatus("SUCCESS");
      } else {
        setStatus("ERROR");
      }
    };
    xhr.send(data);
  };
  return (
    <section className={contactStyles.form_section}>
      <form
        onSubmit={submitForm}
        action="https://formspree.io/f/mzbkvnzo"
        method="POST"
      >
        <label>Name:</label>
        <input type="text" name="name" />
        <label>Email:</label>
        <input type="email" name="email" />
        <label>Message:</label>
        <textarea type="text" name="message" cols="30" rows="10" />
        {status === "SUCCESS" ? (
          <p>Thanks!</p>
        ) : (
          <button type="submit">Submit</button>
        )}
        {status === "ERROR" && <p>Ooops! There was an error.</p>}
      </form>
    </section>
  );
}

export default ContactScreen;
