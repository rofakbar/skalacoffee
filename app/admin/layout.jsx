export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-latar">
      <main className="mx-auto w-full max-w-5xl flex-1 px-4">{children}</main>
    </div>
  );
}

