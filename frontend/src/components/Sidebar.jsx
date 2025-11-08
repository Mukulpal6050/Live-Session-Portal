import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-60 bg-gray-100 p-4 border-r">
      <ul className="space-y-2">
        <li><Link to="/student/dashboard" className="block p-2 hover:bg-gray-200 rounded">Student Dashboard</Link></li>
        <li><Link to="/admin/dashboard" className="block p-2 hover:bg-gray-200 rounded">Admin Dashboard</Link></li>
      </ul>
    </aside>
  );
}
