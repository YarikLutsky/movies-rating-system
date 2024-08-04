
import { Outlet } from 'react-router-dom';
import '../scss/pages/body.scss';

interface MainPageProps {
}

const BodyPage = ({ }: MainPageProps): JSX.Element => {
    return (
        <div className="body-page">
                <Outlet />
        </div>
    );
};

export default BodyPage;
