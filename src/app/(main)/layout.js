import Navbar from "@/components/layout/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 ">
      <Navbar />
      {children}
    </div>
  );
}



