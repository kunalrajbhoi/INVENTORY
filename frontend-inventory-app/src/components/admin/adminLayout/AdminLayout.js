import { Outlet } from "react-router-dom";
import AdminSidebar from "./sidebar/AdminSidebar";

const AdminLayout = () => (
  <>
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <AdminSidebar />
        </div>
        <div className="col-9">
          <Outlet />
        </div>
      </div>
    </div>
  </>
);

export default AdminLayout;
