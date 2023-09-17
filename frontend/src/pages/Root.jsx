import { Outlet, Link } from 'react-router-dom';

export default function Root() {
    return (
        <>
            <div id="sidebar">
                <div>Cafe-Employee Management</div>
                <nav>
                    <ul>
                        <li>
                            <Link to={`/Cafe`}>Cafe</Link>
                        </li>
                        <li>
                            <Link to={`/Employee`}>Employee</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}
