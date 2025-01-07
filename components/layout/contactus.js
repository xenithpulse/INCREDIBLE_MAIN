import React, { useState } from 'react';
import { ContactSection, ContactForm, FormGroup, Label, Input, Select, TextArea, SubmitButton, ErrorMessage, FormGroupContainer } from '@/components/styled/ContactForm_sty';
import Title from '@/components/styled/Title';
import Center from '@/homecenter';


const ContactUs = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        serviceAddress: '',
        city: '',
        state: '',
        zip: '',
        homeOrBusiness: 'Home',
        comments: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.firstName) newErrors.firstName = 'First Name is required';
        if (!formData.lastName) newErrors.lastName = 'Last Name is required';
        if (!formData.phone) newErrors.phone = 'Phone is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.serviceAddress) newErrors.serviceAddress = 'Service Address is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.zip) newErrors.zip = 'Zip is required';

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
              firstName: '',
              lastName: '',
              phone: '',
              email: '',
              serviceAddress: '',
              city: '',
              state: '',
              zip: '',
              homeOrBusiness: 'Home',
              comments: '',
            });
            setErrors({}); // Clear any previous errors.
          } catch (error) {
            console.error("Error submitting form:", error);
          }
        }
      };

    return (
        <ContactSection id='contact-us'>
            <ContactForm onSubmit={handleSubmit}>
            <Title style={{fontSize:"1.8rem"}}><strong>Contact Us</strong></Title>
                <FormGroupContainer style={{marginTop:"15px"}}>
                <FormGroup>
                    <Label htmlFor="firstName">First Name*</Label>
                    <Input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
                    {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="lastName">Last Name*</Label>
                    <Input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
                    {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="phone">Phone*</Label>
                    <Input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                    {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="email">Email*</Label>
                    <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                    {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="serviceAddress">Desired Service?*</Label>
                    <Input type="text" id="serviceAddress" name="serviceAddress" value={formData.serviceAddress} onChange={handleChange} />
                    {errors.serviceAddress && <ErrorMessage>{errors.serviceAddress}</ErrorMessage>}
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="city">City*</Label>
                    <Input type="text" id="city" name="city" value={formData.city} onChange={handleChange} />
                    {errors.city && <ErrorMessage>{errors.city}</ErrorMessage>}
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="state">State*</Label>
                    <Input type="text" id="state" name="state" value={formData.state} onChange={handleChange} />
                    {errors.state && <ErrorMessage>{errors.state}</ErrorMessage>}
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="zip">Zip*</Label>
                    <Input type="text" id="zip" name="zip" value={formData.zip} onChange={handleChange} />
                    {errors.zip && <ErrorMessage>{errors.zip}</ErrorMessage>}
                </FormGroup>
                <FormGroup>
                    <Label>Is this a Home or Business?</Label>
                    <Select name="homeOrBusiness" value={formData.homeOrBusiness} onChange={handleChange}>
                        <option value="Home">Home</option>
                        <option value="Business">Business</option>
                    </Select>
                </FormGroup>
                </FormGroupContainer>
                <FormGroup>
                    <Label htmlFor="comments">Comments</Label>
                    <TextArea id="comments" name="comments" value={formData.comments} onChange={handleChange} />
                </FormGroup>
                <SubmitButton type="submit">Submit</SubmitButton>
            </ContactForm>
        </ContactSection>
    );
};

export default ContactUs;