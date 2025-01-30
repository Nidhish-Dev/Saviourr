'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { div } from 'motion/react-client';
interface FormData {
  firstName: string;
  lastName: string;
  registrationNumber: string;
  dob: string;
  email: string;
  mobileNumber: string;
  bloodGroup: string;
  description: string;
}

function Page() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    registrationNumber: '',
    dob: '',
    email: '',
    mobileNumber: '',
    bloodGroup: '',
    description: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('https://saviourr-server.vercel.app/api/form/seeker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setIsSubmitted(true); 
      // router.push('/completed'); // Uncomment this line to navigate after a short delay
    } catch (error) {
      setIsSubmitted(false); // Set isSubmitted to false on error
      console.error('Error submitting form', error);
    }
  };

  return (
    <div className="">
      <Link className='mt-5 ml-20 text-md bg-red-900 px-4 py-2 rounded' href='/'>Home</Link>
 <div className='flex flex-col items-center justify-center '>
       <p className='mt-5 text-4xl font-bold'>Recipient's Form</p>
      
      <form className='border border-red-900  p-8 rounded-xl mt-10' onSubmit={handleSubmit}>
        <p className='heading mt-4 flex'>Name<span className='text-sm text-red-600'>*</span></p>
        <div className='flex flex-col md:flex-row gap-4'>
          <input className='short' type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
          <input className='short' type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
        </div>

        <p className='heading flex'>Registration Number<span className='text-sm text-red-600'>*</span></p>
        <input className='long' type="text" name="registrationNumber" placeholder="RA24.." value={formData.registrationNumber} onChange={handleChange} required />

        <p className='heading'>Mobile Number<span className='text-sm text-red-600'>*</span></p>
        <input className='long' type="tel" name="mobileNumber" placeholder="91XXXXXXXXXX" value={formData.mobileNumber} onChange={handleChange} required />

        <p className='heading'>SRM Email address<span className='text-sm text-red-600'>*</span></p>
        <input className='long' type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />

        <p className='heading mb-1'>Date Of Birth<span className='text-sm text-red-600'>*</span></p>
        <input className='short text-black placeholder-gray-500' type="date" name="dob" value={formData.dob} onChange={handleChange} required />

        <p className='heading ml-3 mb-1'>Blood Group<span className='text-sm text-red-600'>*</span></p>
        <select className='select ml-3 pr-2' name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>

        <p className='heading flex'>Description<span className='text-sm text-red-600'>*</span></p>
        <textarea className='long' name="description" placeholder="Description.." value={formData.description} onChange={handleChange} required />

        <button className=' bg-red-900 py-2 px-5 mt-2 rounded-xl mb-5'  type="submit">Get Blood</button>
      </form>
      {isSubmitted && (
        <p className="success-message">Form submitted successfully!</p>
      )}
    </div>
    </div>
   
  );
}

export default Page;
