export default function ReferenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* This is where your Filter Sidebar will eventually go */}
      <aside className="w-full md:w-64 bg-base-200 p-4">
        <h2 className="font-bold text-xl mb-4">Filters</h2>
        {/* Sidebar content here */}
      </aside>

      <section className="flex-1">{children}</section>
    </div>
  );
}
