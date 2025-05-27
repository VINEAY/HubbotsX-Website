"use client";

import { useState } from "react";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthInput from "@/components/auth/AuthInput";
import AuthButton from "@/components/auth/AuthButton";
import SocialLogin from "@/components/auth/SocialLogin";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    const newErrors = { email: "", password: "" };
    let hasError = false;

    if (!formData.email) {
      newErrors.email = "Email is required";
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      hasError = true;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      hasError = true;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Simulating login API call
    setTimeout(() => {
      console.log("Login successful", formData);
      setIsLoading(false);
      // Redirect to dashboard or home
      window.location.href = "/";
    }, 1500);
  };

  return (
    <AuthLayout
      title="Log in to HubbotsX"
      description="Welcome back! Enter your details to log in to your account."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthInput
          type="email"
          id="email"
          name="email"
          label="Email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />

        <div className="mb-2">
          <AuthInput
            type="password"
            id="password"
            name="password"
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
          />
          <div className="flex justify-end mt-1">
            <Link href="/auth/forgot-password" className="text-primary text-sm hover:underline">
              Forgot password?
            </Link>
          </div>
        </div>

        <div className="pt-2">
          <AuthButton type="submit" fullWidth isLoading={isLoading}>
            Log in
          </AuthButton>
        </div>

        <SocialLogin />

        <div className="text-center mt-6">
          <p className="text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
