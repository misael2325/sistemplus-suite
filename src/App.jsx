import React from 'react'
import './index.css'

export default function App() {
  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden bg-blue-50" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 bg-white px-6 sm:px-10 py-4 shadow-sm">
          <div className="flex items-center gap-3 text-slate-800">
            <div className="size-8 text-blue-600">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
              </svg>
            </div>
            <h1 className="text-xl font-semibold leading-tight tracking-tight">Feedback Central</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <span className="material-icons text-gray-600">notifications</span>
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-gray-300" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDI9lsxZXQ9B1d5VZer8cx_wQ4OC18smEH165dM8hyIxQ7Rg2xwCU1HM01LcxOfBXUdQCq5g9BV25F-_VHpJQEmbZ6WKF6G_cbSTKEZt723BCR1xEV--br0S8CkXcUo3wDRxwPqmeqsC4jXaGubVm1wD0u8nWFs2JfO8u6UD3Rjgv6Gk0lEqbbMA--1H0AAZspuUA-JtOumLLV8vZL3YiRE_lcGIkIHEhZ3rCnNuYLa8n3T6fEclb5Y2oj6UTg4nQBfyfLlQmZv49U")'}}></div>
          </div>
        </header>
        <main className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex flex-1 justify-center py-8">
          <div className="layout-content-container flex flex-col w-full max-w-5xl">
            <div className="mb-8">
              <h1 className="text-slate-800 text-3xl sm:text-4xl font-bold tracking-tight">Monthly Feedback Dashboard</h1>
            </div>
            <section className="bg-white p-6 sm:p-8 rounded-xl shadow-lg mb-8">
              <h2 className="text-slate-800 text-xl sm:text-2xl font-semibold leading-tight tracking-tight mb-6">Current Month's Feedback</h2>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-slate-700 text-sm font-medium">Feedback Submission Progress</p>
                  <p className="text-blue-600 text-sm font-semibold">60% Complete</p>
                </div>
                <progress className="w-full h-2.5 rounded-sm progress-bar" max="100" value="60"></progress>
              </div>
              <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed mb-6">
                Please submit your feedback for <strong>October 2023</strong> by the end of the day. Your insights are valuable and help us improve the workplace.
              </p>
              <div className="flex justify-start">
                <button className="flex items-center justify-center gap-2 min-w-[84px] max-w-[480px] cursor-pointer overflow-hidden rounded-lg h-10 px-5 bg-blue-600 text-white text-sm font-semibold leading-normal tracking-wide shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-150">
                  <span className="material-icons text-base">send</span>
                  <span className="truncate">Submit Feedback</span>
                </button>
              </div>
            </section>
            <section>
              <h2 className="text-slate-800 text-xl sm:text-2xl font-semibold leading-tight tracking-tight mb-6 px-2">Previous Months' Feedback Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="text-slate-700 text-lg font-medium">Overall Satisfaction Trends</h3>
                    <span className="material-icons text-blue-500">trending_up</span>
                  </div>
                  <p className="text-slate-800 text-4xl font-bold tracking-tight">4.2<span className="text-2xl text-slate-500">/5</span></p>
                  <div className="flex items-center gap-2 text-sm">
                    <p className="text-slate-500">Last 6 Months</p>
                    <span className="flex items-center text-green-600 font-medium">
                      <span className="material-icons text-base mr-0.5">arrow_upward</span>
                      +5%
                    </span>
                  </div>
                  <div className="grid min-h-[180px] grid-flow-col gap-4 grid-rows-[1fr_auto] items-end justify-items-center pt-4 px-2">
                    <div className="bg-blue-500 rounded-t-sm w-full" style={{height: '60%'}}></div>
                    <p className="text-slate-500 text-xs font-medium">Jan</p>
                    <div className="bg-blue-500 rounded-t-sm w-full" style={{height: '100%'}}></div>
                    <p className="text-slate-500 text-xs font-medium">Feb</p>
                    <div className="bg-blue-500 rounded-t-sm w-full" style={{height: '60%'}}></div>
                    <p className="text-slate-500 text-xs font-medium">Mar</p>
                    <div className="bg-blue-500 rounded-t-sm w-full" style={{height: '20%'}}></div>
                    <p className="text-slate-500 text-xs font-medium">Apr</p>
                    <div className="bg-blue-500 rounded-t-sm w-full" style={{height: '90%'}}></div>
                    <p className="text-slate-500 text-xs font-medium">May</p>
                    <div className="bg-blue-500 rounded-t-sm w-full" style={{height: '70%'}}></div>
                    <p className="text-slate-500 text-xs font-medium">Jun</p>
                  </div>
                </div>
                <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="text-slate-700 text-lg font-medium">Feedback Themes</h3>
                    <span className="material-icons text-purple-500">category</span>
                  </div>
                  <p className="text-slate-800 text-4xl font-bold tracking-tight">3 themes</p>
                  <div className="flex items-center gap-2 text-sm">
                    <p className="text-slate-500">Last 6 Months</p>
                    <span className="flex items-center text-green-600 font-medium">
                      <span className="material-icons text-base mr-0.5">arrow_upward</span>
                      +10%
                    </span>
                  </div>
                  <div className="flex min-h-[180px] flex-1 flex-col gap-4 py-4">
                    <svg fill="none" height="148" preserveAspectRatio="none" viewBox="-3 0 478 150" width="100%" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H326.769H0V109Z" fill="url(#paint0_linear_1131_5935)"></path>
                      <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25" stroke="#a855f7" strokeLinecap="round" strokeWidth="3"></path>
                      <defs>
                        <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1131_5935" x1="236" x2="236" y1="1" y2="149">
                          <stop stopColor="#e9d5ff"></stop>
                          <stop offset="1" stopColor="#e9d5ff" stopOpacity="0"></stop>
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="flex justify-around">
                      <p className="text-slate-500 text-xs font-medium">Jan</p>
                      <p className="text-slate-500 text-xs font-medium">Feb</p>
                      <p className="text-slate-500 text-xs font-medium">Mar</p>
                      <p className="text-slate-500 text-xs font-medium">Apr</p>
                      <p className="text-slate-500 text-xs font-medium">May</p>
                      <p className="text-slate-500 text-xs font-medium">Jun</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
        <footer className="py-6 px-4 sm:px-10 text-center text-sm text-gray-500 border-t border-gray-200 bg-white">
          © 2023 Company Name. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
