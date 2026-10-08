"use client";

export default function FloatingCart() {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm">
      <div className="flex items-center justify-between rounded-2xl bg-utama px-6 py-4 text-white shadow-2xl backdrop-blur-md bg-opacity-95 cursor-pointer hover:bg-utama-gelap transition-colors">
        <div className="flex items-center gap-3">
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="21" r="1"/>
              <circle cx="19" cy="21" r="1"/>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
            </svg>
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-bahaya text-[10px] font-bold text-white">
              3
            </span>
          </div>
          <span className="font-medium text-sm">3 items</span>
        </div>
        <span className="font-bold">View Order</span>
      </div>
    </div>
  );
}

