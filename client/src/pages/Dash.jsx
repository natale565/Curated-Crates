import PastOrders from '../components/PastOrders';
import CurrentSub from '../components/CurrentSub';

function Dash(){
    return (
        <div>
            <h1>Welcome to the Dashboard</h1>
            <PastOrders />
            <CurrentSub />
        </div>
    )
}

export default Dash;