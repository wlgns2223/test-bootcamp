import React, { useState } from "react";

interface UserFormProps {
  onSubmit?: (userData: { name: string; email: string }) => void;
  "data-testid"?: string;
}

export default function UserForm({
  onSubmit,
  "data-testid": testId,
}: UserFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      onSubmit?.({ name, email });
      setIsSubmitted(true);
      // Reset form after submission
      setTimeout(() => {
        setName("");
        setEmail("");
        setIsSubmitted(false);
      }, 1000);
    }
  };

  if (isSubmitted) {
    return (
      <div
        data-testid="success-message"
        className="p-4 bg-green-100 border border-green-400 text-green-700 rounded"
      >
        Form submitted successfully!
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      data-testid={testId}
      className="space-y-4 p-4 border rounded-lg"
    >
      <h2 className="text-xl font-bold">User Registration</h2>

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Name:
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          data-testid="name-input"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email:
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          data-testid="email-input"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
        />
      </div>

      <button
        type="submit"
        data-testid="submit-button"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
        disabled={!name || !email}
      >
        Submit
      </button>
    </form>
  );
}
