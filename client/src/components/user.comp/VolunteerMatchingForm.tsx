import styled from 'styled-components'
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/registration.styles.css';
import ReusableBtn from '../reusable.cont/ReusableBtn';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {useState} from 'react'
import Select, { SingleValue } from 'react-select';


export default function VolunteerMatchingForm() {
    const [isTooltipVisible, setTooltipVisible] = useState<boolean>(false);
    
      const handleNotificationClick = () => {
        setTooltipVisible(!isTooltipVisible); 
      }

    return ( // Change the styles to not be the same as the registration form later.s
        <>
            <h1 className='regi-bigheader' style={{ marginTop: '2rem' }}>
            Find A Volunteer
            </h1>
            <div className='second-form-div'>
                <h1>Volunteer Information</h1>
            <br></br>
            <button className="full-width-button">
                Select A Volunteer
            </button>
            <br></br>
                <h2>Name: Grover Underwood</h2>
                <h2>Skills: Working Outdoors, Nature, Food, Animals</h2>
                <h2>Preferences: Outdoors, Daytime</h2>
                <br></br>
                <br></br>
                <h1>Event Select</h1>
                
                <button className ="full-width-button2" type="button" onClick={handleNotificationClick}>
                <NotificationContainer>
                  <span>Trash Cleanup</span> 
                </NotificationContainer>
              </button>
                <Tooltipdiv>
                    {isTooltipVisible && (<>
                    <Tooltip>
                        Trash Cleanup
                        Skills: Attention to Detail, Working Outdoors, Nature
                    </Tooltip>
                    <Tooltip>
                        Food Drive
                        Skills: Food, Organization, Lifting Heavy Things
                    </Tooltip>
                    </>)}
                </Tooltipdiv>
            </div>
        </>
    );
}

const Tooltip = styled.div`
  background-color: #BFCFE6;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #515964;
  font-size: 1.2rem;
  white-space: nowrap;

`

const Tooltipdiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const NotificationContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`