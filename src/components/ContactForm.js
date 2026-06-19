"use client";

import React, { useState } from "react";

export default function ContactForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    // Map id to state keys
    const key = id.replace("contact-", "");
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
    // Clear field error
    if (errors[key]) {
      setErrors((prev) => ({
        ...prev,
        [key]: null,
      }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Secure custom validation audit
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Business email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid business email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.replace(/[\s\-\+\(\)]/g, "").length < 7) {
      newErrors.phone = "Enter a valid coordinate phone number";
    }

    if (!formData.service) newErrors.service = "Select a capability";
    if (!formData.message.trim()) newErrors.message = "Requirements details are required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setFormSubmitted(true);
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });
    setErrors({});
    setFormSubmitted(false);
  };

  return (
    <div className="glass-panel">
      {!formSubmitted ? (
        <form id="logistics-contact-form" className="contact-form" onSubmit={handleFormSubmit} noValidate>
          <div className="form-group-row">
            <div className="form-group">
              <label htmlFor="contact-name" className="form-label">Full Name</label>
              <input
                type="text"
                id="contact-name"
                className="form-input"
                placeholder="e.g. Aseem Aslah"
                value={formData.name}
                onChange={handleInputChange}
                style={errors.name ? { borderColor: "rgba(220, 53, 69, 0.5)" } : {}}
                required
                suppressHydrationWarning
              />
              {errors.name && (
                <span style={{ fontSize: "0.7rem", color: "rgba(220, 53, 69, 0.9)", marginTop: "2px" }}>
                  {errors.name}
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="contact-email" className="form-label">Business Email</label>
              <input
                type="email"
                id="contact-email"
                className="form-input"
                placeholder="e.g. office@company.com"
                value={formData.email}
                onChange={handleInputChange}
                style={errors.email ? { borderColor: "rgba(220, 53, 69, 0.5)" } : {}}
                required
                suppressHydrationWarning
              />
              {errors.email && (
                <span style={{ fontSize: "0.7rem", color: "rgba(220, 53, 69, 0.9)", marginTop: "2px" }}>
                  {errors.email}
                </span>
              )}
            </div>
          </div>

          <div className="form-group-row">
            <div className="form-group">
              <label htmlFor="contact-phone" className="form-label">Direct Phone</label>
              <input
                type="tel"
                id="contact-phone"
                className="form-input"
                placeholder="e.g. +971 50 123 4567"
                value={formData.phone}
                onChange={handleInputChange}
                style={errors.phone ? { borderColor: "rgba(220, 53, 69, 0.5)" } : {}}
                required
                suppressHydrationWarning
              />
              {errors.phone && (
                <span style={{ fontSize: "0.7rem", color: "rgba(220, 53, 69, 0.9)", marginTop: "2px" }}>
                  {errors.phone}
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="contact-service" className="form-label">Service Required</label>
              <select
                id="contact-service"
                className="form-input"
                value={formData.service}
                onChange={handleInputChange}
                style={errors.service ? { borderColor: "rgba(220, 53, 69, 0.5)" } : {}}
                required
                suppressHydrationWarning
              >
                <option value="" disabled>Select capability needed</option>
                <option value="air">Priority Air Cargo</option>
                <option value="sea">Intercontinental Ocean freight</option>
                <option value="land">Secure Overland linehauls</option>
                <option value="warehousing">Luxury climate storage</option>
              </select>
              {errors.service && (
                <span style={{ fontSize: "0.7rem", color: "rgba(220, 53, 69, 0.9)", marginTop: "2px" }}>
                  {errors.service}
                </span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="contact-message" className="form-label">Specific Requirements</label>
            <textarea
              id="contact-message"
              className="form-input"
              placeholder="Origin, destination, weight, or special handling rules..."
              value={formData.message}
              onChange={handleInputChange}
              style={errors.message ? { borderColor: "rgba(220, 53, 69, 0.5)" } : {}}
              required
              suppressHydrationWarning
            ></textarea>
            {errors.message && (
              <span style={{ fontSize: "0.7rem", color: "rgba(220, 53, 69, 0.9)", marginTop: "2px" }}>
                {errors.message}
              </span>
            )}
          </div>

          <div style={{ textAlign: "right" }}>
            <button
              type="submit"
              className="btn-glass-3d"
              disabled={submitting}
              style={submitting ? { opacity: 0.7 } : {}}
              suppressHydrationWarning
            >
              {submitting ? "SENDING CLEARANCE SECURELY..." : "Submit secure request"}
            </button>
          </div>
        </form>
      ) : (
        <div style={{ textAlign: "center", padding: "2rem 0" }}>
          <div
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              border: "2px solid var(--color-accent-gold)",
              display: "flex",
              alignItems: "center",
              margin: "0 auto 2rem auto",
              boxShadow: "0 0 20px rgba(198, 167, 94, 0.2)",
              justifyContent: "center",
            }}
          >
            <svg viewBox="0 0 24 24" width="30" height="30" fill="var(--color-accent-gold)">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </div>
          <h3 style={{ fontSize: "2rem", marginBottom: "1rem" }} className="text-gold">
            Clearance request received
          </h3>
          <p
            style={{
              fontSize: "1rem",
              color: "var(--color-text-muted)",
              marginBottom: "2rem",
              maxWidth: "440px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Your request has been routed to our corporate private support desk. A representative will contact you in under 2 hours.
          </p>
          <button onClick={resetForm} className="btn-glass-3d" suppressHydrationWarning>
            Send another request
          </button>
        </div>
      )}
    </div>
  );
}
