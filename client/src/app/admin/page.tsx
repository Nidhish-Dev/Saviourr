'use client';
import React, { useEffect, useState } from 'react';

interface FormData {
  _id: string;
  firstName: string;
  lastName: string;
  registrationNumber: string;
  dob: string;
  email: string;
  mobileNumber: number;
  bloodGroup: string;
  lastDonated: string;
  certificate: string;
  weight: number;
  height: number;
  isCancer: boolean;
  isCardiacProblem: boolean;
  isBleedingDisorder: boolean;
  isInfections: boolean;
  isDiabetes: boolean;
  isInjectedDrugs: boolean;
  isWilling: boolean;
  isHighRiskIndividual: boolean;
  createdAt: string;
  updatedAt: string;
}

function AdminData() {
  const [formData, setFormData] = useState<FormData[]>([]);
  const [filteredData, setFilteredData] = useState<FormData[]>([]);
  const [bloodGroupFilter, setBloodGroupFilter] = useState('');
  const [ageRange, setAgeRange] = useState<[number, number]>([0, 100]);
  const [willingToDonate, setWillingToDonate] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/form');
        const data = await response.json();
        setFormData(data);
        setFilteredData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleFilter = () => {
    let filtered = formData;

    if (bloodGroupFilter) {
      filtered = filtered.filter((data) => data.bloodGroup === bloodGroupFilter);
    }

    if (ageRange) {
      filtered = filtered.filter((data) => {
        const age = calculateAge(data.dob);
        return age >= ageRange[0] && age <= ageRange[1];
      });
    }

    if (willingToDonate !== null) {
      filtered = filtered.filter((data) => data.isWilling === willingToDonate);
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    handleFilter();
  }, [bloodGroupFilter, ageRange, willingToDonate]);

  return (
    <div className="flex bg-gray-900 text-white min-h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 p-6 border-r border-gray-700">
        <h3 className="text-xl font-semibold mb-4">Filter Options</h3>

        <div className="mb-4">
          <label className="block text-gray-400 mb-1">Blood Group:</label>
          <select
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
            onChange={(e) => setBloodGroupFilter(e.target.value)}
            value={bloodGroupFilter}
          >
            <option value="">All</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-400">Age Range: {ageRange[0]} - {ageRange[1]}</label>
          <input
            type="range"
            min="0"
            max="100"
            value={ageRange[0]}
            className="w-full my-1"
            onChange={(e) => setAgeRange([Number(e.target.value), ageRange[1]])}
          />
          <input
            type="range"
            min="0"
            max="100"
            value={ageRange[1]}
            className="w-full"
            onChange={(e) => setAgeRange([ageRange[0], Number(e.target.value)])}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-400">Willing to Donate:</label>
          <select
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
            onChange={(e) => setWillingToDonate(e.target.value === 'yes' ? true : e.target.value === 'no' ? false : null)}
          >
            <option value="">All</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {filteredData.length ? (
          filteredData.map((data) => (
            <div key={data._id} className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
              <div className="text-center mb-4">
                <img
                  src={data.certificate}
                  alt="Certificate"
                  className="max-w-xs mx-auto rounded-lg cursor-pointer"
                  onClick={() => window.open(data.certificate, '_blank')}
                />
                <p className="text-gray-400 text-sm mt-2">Click to zoom</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p><strong>First Name:</strong> {data.firstName}</p>
                  <p><strong>Last Name:</strong> {data.lastName}</p>
                  <p><strong>Reg. Number:</strong> {data.registrationNumber}</p>
                  <p><strong>Date of Birth:</strong> {new Date(data.dob).toLocaleDateString()}</p>
                  <p><strong>Age:</strong> {calculateAge(data.dob)} years</p>
                  <p><strong>Email:</strong> {data.email}</p>
                  <p><strong>Mobile:</strong> {data.mobileNumber}</p>
                </div>
                <div>
                  <p><strong>Blood Group:</strong> {data.bloodGroup}</p>
                  <p><strong>Last Donated:</strong> {new Date(data.lastDonated).toLocaleDateString()}</p>
                  <p><strong>Weight:</strong> {data.weight} kg</p>
                  <p><strong>Height:</strong> {data.height} cm</p>
                  <p><strong>Willing to Donate:</strong> {data.isWilling ? 'Yes' : 'No'}</p>
                  <p><strong>High-Risk:</strong> {data.isHighRiskIndividual ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400">No results found.</div>
        )}
      </div>
    </div>
  );
}

export default AdminData;
