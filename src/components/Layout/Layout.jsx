import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-grow overflow-y-auto min-h-screen">
        <Navbar />
        <div className="p-1 sm:p-3 flex-grow w-full mb-8">{children}</div>
        <footer className="bg-[#212529] text-white py-2 sm:p-4 text-center sm:text-right mt-auto m-2 rounded-md">
          <p className="text-sm">
            Designed with ❤️ and crafted with care by Team{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 font-bold block sm:inline hover:text-orange-600"
            >
            </a>
            Rafiki          
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
