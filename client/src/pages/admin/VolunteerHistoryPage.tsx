import '../../styles/volunteerhistory.style.css'
import VolunteerHistoryTable from "../../components/user.comp/VolunteerHistoryTable.tsx";
const VolunteerHistoryPage = () => {
    return (
        <div className="main-history-div">

            <h1>Hey, here is your recent volunteering history</h1>

            <VolunteerHistoryTable />
        </div>
    )
}

export default VolunteerHistoryPage