import React, { useState } from 'react';
import { ContactSection, ContactForm, FormGroup, Label, Input, TextArea, SubmitButton, ErrorMessage, FormGroupContainer, WhatsAppButton } from '@/components/styled/ContactForm_sty';
import Title from '@/components/styled/Title';
import { useMediaQuery } from "@mui/material";


const ContactUs = () => {
  const isSmallDevice = useMediaQuery("(max-width: 768px)");
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        comments: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.fullName) newErrors.fullName = 'Name is required';
        if (!formData.phone) newErrors.phone = 'Phone is required';


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
          try {
            const response = await fetch('/api/contact', { // Make POST request to /api/contact
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData), // Send form data as JSON
            });
      
            if (!response.ok) {
              const errorData = await response.json(); // Try to parse error response
              if (errorData.details) {
                // Display detailed validation errors
                for (const key in errorData.details) {
                  setErrors(prevErrors => ({...prevErrors, [key]: errorData.details[key]}))
                }
              } else {
                  throw new Error(errorData.error || 'Failed to send message.');
              }
      
              throw new Error(errorData.error || 'Failed to send message.'); // Throw error to be caught
            }
      
            setFormData({ // Clear the form
              fullName: '',
              phone: '',
              email: '',
              comments: '',
            });
            setErrors({}); // Clear any previous errors.
          } catch (error) {
            console.error("Error submitting form:", error);
          }
        }
      };

      return (
        <ContactSection id="contact-us">
          <ContactForm onSubmit={handleSubmit}>
            <Title style={{ fontSize: "1.8rem", textAlign: "center" }}>
              <strong>Contact Us</strong>
            </Title>
            <FormGroupContainer style={{ marginTop: "15px" }}>
              <FormGroup>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullname && <ErrorMessage>{errors.fullname}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <Label htmlFor="phone">Phone *</Label>
                <Input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <Label htmlFor="email">Email (optional)</Label>
                <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
              </FormGroup>
            </FormGroupContainer>
            <FormGroup>
              <Label htmlFor="comments">Comments</Label>
              <TextArea id="comments" name="comments" value={formData.comments} onChange={handleChange} />
            </FormGroup>
            <SubmitButton type="submit">Submit</SubmitButton>
          </ContactForm>
          <div
      style={{
        fontSize: "1.8rem",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        marginRight: isSmallDevice ? "25%" : "0", // Apply margin-right only on small devices
        justifyContent: "center",
        alignItems: "center",
        width: "100%", // Ensures the container spans full width
        maxWidth: "400px", // Optional: Limit the width for better appearance
        margin: "0 auto", // Centers the container itself
        gap: "1rem", // Adds spacing between the items
      }}
    >
      <Title>Or</Title>
      <WhatsAppButton />
    </div>
        </ContactSection>
      );
    }

export default ContactUs;