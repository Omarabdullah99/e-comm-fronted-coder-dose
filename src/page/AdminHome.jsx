import AdminProducList from "../features/admin/component/AdminProducList";
import Navbar from "../features/navbar/Navbar";

function AdminHome() {
    return ( 
        <div>
            <Navbar>
                <AdminProducList></AdminProducList>
            </Navbar>
        </div>
     );
}

export default AdminHome;