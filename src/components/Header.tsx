import Moment from 'react-moment';
import '../scss/components/header.scss';

interface HeaderProps {
    isConnected: boolean;
    lastUpdateDate: Date | undefined;
}

const Header = ({ isConnected, lastUpdateDate }: HeaderProps) => {
    return (
        <div className="header">
            <div className="header__start"></div>
            <div className="header__end">
                <div className="header__date">
                    {lastUpdateDate ? <Moment format="DD/MM/YYYY HH:mm:ss">
                        {lastUpdateDate}
                    </Moment> : "Not Connected"}
                </div>
                <div className="header__connect-icon-wrapper">
                    {isConnected}
                    <i
                        className={`header__connect-icon  header__connect-icon--${
                            isConnected ? 'on' : 'off'
                        } pi pi-circle-fill`}
                    ></i>
                </div>
            </div>
        </div>
    );
};

export default Header;
