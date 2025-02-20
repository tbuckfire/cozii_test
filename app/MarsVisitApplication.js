"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Define validation schemas for each step of form
const personalInfoSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
  nationality: z.string().min(1, "Nationality is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(10, "Invalid phone number"),
});

const travelDetailsSchema = z.object({
  departureDate: z.string().min(1, "Departure Date is required"),
  returnDate: z.string().min(1, "Return Date is required"),
  accommodation: z.enum(["Space Hotel", "Martian Base"]),
  specialRequests: z.string().optional(),
});

const healthSafetySchema = z.object({
  healthDeclaration: z.enum(["Yes", "No"]),
  emergencyContact: z.string().min(1, "Emergency Contact is required"),
  medicalConditions: z.string().optional(),
});

const formSteps = ["Personal Information", "Travel Preferences", "Health & Safety"];

export default function MarsVisitApplication() {
  const [currentStep, setCurrentStep] = useState(0);
  const validationSchemas = [personalInfoSchema, travelDetailsSchema, healthSafetySchema];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(validationSchemas[currentStep]) });

  // Move to next step in form
  const goToNextStep = async (data) => {
    if (currentStep < formSteps.length - 1) setCurrentStep(currentStep + 1);
  };

  // Go back to previous step
  const goToPreviousStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  // Final form submission
  const handleFormSubmit = (data) => {
    console.log("Application successfully submitted:", data);
    alert("Your Mars Visit Application has been submitted!");
  };

  return (
    <div className="max-w-lg mx-auto p-6 border rounded-lg shadow-lg mt-10">
      <h2 className="text-xl font-bold mb-4">{formSteps[currentStep]}</h2>
      <form onSubmit={handleSubmit(currentStep === formSteps.length - 1 ? handleFormSubmit : goToNextStep)}>
        {/* Step 1: Personal Information */}
        {currentStep === 0 && (
          <>
            <input {...register("fullName")} placeholder="Full Name" className="block w-full p-2 border" />
            {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
            
            <input {...register("dateOfBirth")} type="date" className="block w-full p-2 border mt-2" />
            {errors.dateOfBirth && <p className="text-red-500">{errors.dateOfBirth.message}</p>}

            <input {...register("nationality")} placeholder="Nationality" className="block w-full p-2 border mt-2" />
            {errors.nationality && <p className="text-red-500">{errors.nationality.message}</p>}
            
            <input {...register("email")} placeholder="Email" className="block w-full p-2 border mt-2" />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}

            <input {...register("phone")} placeholder="Phone" className="block w-full p-2 border mt-2" />
            {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
          </>
        )}
        {/* Step 2: Travel Preferences */}
        {currentStep === 1 && (
          <>
            <input {...register("departureDate")} type="date" className="block w-full p-2 border" />
            {errors.departureDate && <p className="text-red-500">{errors.departureDate.message}</p>}

            <input {...register("returnDate")} type="date" className="block w-full p-2 border mt-2" />
            {errors.returnDate && <p className="text-red-500">{errors.returnDate.message}</p>}
            
            <select {...register("accommodation")} className="block w-full p-2 border mt-2">
              <option value="">Select Accommodation</option>
              <option value="Space Hotel">Space Hotel</option>
              <option value="Martian Base">Martian Base</option>
            </select>
            {errors.accommodation && <p className="text-red-500">{errors.accommodation.message}</p>}
          </>
        )}
        {/* Step 3: Health & Safety */}
        {currentStep === 2 && (
          <>
            <select {...register("healthDeclaration")} className="block w-full p-2 border">
              <option value="">Health Declaration</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.healthDeclaration && <p className="text-red-500">{errors.healthDeclaration.message}</p>}

            <input {...register("emergencyContact")} placeholder="Emergency Contact" className="block w-full p-2 border mt-2" />
            {errors.emergencyContact && <p className="text-red-500">{errors.emergencyContact.message}</p>}
          </>
        )}
        
        <div className="flex justify-between mt-4">
          {currentStep > 0 && (
            <button type="button" onClick={goToPreviousStep} className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
          )}
          {currentStep < formSteps.length - 1 ? (
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
          ) : (
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Submit</button>
          )}
        </div>
      </form>
    </div>
  );
}
