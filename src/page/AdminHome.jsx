import AdminProducList from "../features/admin/component/AdminProducList";
import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar";

function AdminHome() {
    return ( 
        <div>
            <Navbar>
                <AdminProducList></AdminProducList>
            </Navbar>
            <Footer></Footer>
        </div>
     );
}

export default AdminHome;