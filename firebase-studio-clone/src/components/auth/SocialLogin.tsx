import React from "react";

export default function SocialLogin() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center my-6">
        <div className="flex-1 h-px bg-gray-800" />
        <span className="px-4 text-gray-500 text-sm">OR CONTINUE WITH</span>
        <div className="flex-1 h-px bg-gray-800" />
      </div>

      <button className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-transparent border border-gray-700 rounded-full text-white hover:bg-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.64 9.20455C17.64 8.56636 17.5827 7.95273 17.4764 7.36364H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8195H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20455Z" fill="#4285F4"/>
          <path d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4204 9 14.4204C6.65591 14.4204 4.67182 12.8373 3.96409 10.71H0.957275V13.0418C2.43818 15.9831 5.48182 18 9 18Z" fill="#34A853"/>
          <path d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957273C0.347727 6.17318 0 7.54773 0 9C0 10.4523 0.347727 11.8268 0.957273 13.0418L3.96409 10.71Z" fill="#FBBC05"/>
          <path d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z" fill="#EA4335"/>
        </svg>
        <span>Google</span>
      </button>

      <button className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-transparent border border-gray-700 rounded-full text-white hover:bg-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 1.5C4.8675 1.5 1.5 4.8675 1.5 9C1.5 12.4875 3.86625 15.4013 7.0725 16.2225C7.52625 16.3088 7.6875 16.035 7.6875 15.7988C7.6875 15.585 7.67625 14.9813 7.67625 14.3325C5.625 14.7338 5.07 13.9013 4.89 13.4625C4.785 13.2337 4.35 12.6 3.9375 12.3863C3.6 12.2175 3.14625 11.8163 3.92625 11.805C4.665 11.7938 5.2125 12.33 5.4 12.5663C6.1875 13.7025 7.38375 13.4963 7.725 13.26C7.8075 12.78 8.0475 12.4613 8.31 12.285C6.4875 12.1088 4.59 11.475 4.59 8.61C4.59 7.8 4.9875 7.125 5.4225 6.6C5.32875 6.375 5.00625 5.61 5.51625 4.5825C5.51625 4.5825 6.24375 4.35 7.6875 5.28C8.32125 5.07 9.0075 4.965 9.69375 4.965C10.38 4.965 11.0662 5.07 11.7 5.28C13.1438 4.3388 13.8712 4.5825 13.8712 4.5825C14.3812 5.61 14.0587 6.375 13.965 6.6C14.4 7.125 14.7975 7.7887 14.7975 8.61C14.7975 11.4863 12.8887 12.1088 11.0662 12.285C11.4 12.5063 11.6887 12.9338 11.6887 13.6088C11.6887 14.58 11.6775 15.5063 11.6775 15.7988C11.6775 16.035 11.8387 16.32 12.2925 16.2225C15.4875 15.4013 17.8538 12.4875 17.8538 9C17.8538 4.8675 14.4862 1.5 9 1.5Z" fill="currentColor"/>
        </svg>
        <span>GitHub</span>
      </button>
    </div>
  );
}
