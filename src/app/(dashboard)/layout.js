export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50 flex ">
            <div className="w-[250px] flex-shrink-0">
            </div>
            <div className="flex-grow">
                 {children}
            </div>
        
        </div>
    );
}