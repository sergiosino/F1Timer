import Moment from 'react-moment';

export default function MomentLocal(props) {
    const { date, time } = props;

    function getMoment() {
        if (date && time) {
            return <Moment local format="YYYY/MM/DD HH:mm">{`${date}T${time}`}</Moment>;
        } else if (date) {
            return <Moment local format="YYYY/MM/DD">{`${date}`}</Moment>;
        } else {
            return "Unknown";
        }
    }

    return getMoment();
}