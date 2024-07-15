export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50 flex ">
            <div className="w-[250px] py-4 px-2 flex-shrink-0 bg-blue-50 border-r border-r-slate-400 ">
                <h4 className='font-semibold text-2xl'>
                    Dashboard
                </h4>
            </div>
            <div className="flex-grow ">
                 {children}
            </div>
        
        </div>
    );
}