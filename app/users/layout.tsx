export default function ReferenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <section className="flex-1">{children}</section>
    </div>
  );
}
