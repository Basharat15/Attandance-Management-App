import { ATTEDENDENCE, SET_ATTEDENCE,DELETE_ATTENDENCE,UPDATE_ATTENDENCE} from '../Actions/MarkedAttendence'
import MarkedAttendence from '../../Models/MarkedAttendence'

const initialState = {
    Attendence: [],
    AllAttendence:[]
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ATTEDENCE:
            return {
                ...state,
                Attendence: action.TotalAttendence,
                AllAttendence:action.AlluserAttendence
            }

        case ATTEDENDENCE:
            const totalAttendence = new MarkedAttendence(
                action.id,
                action.onwerId,
                action.Name,
                action.attendence,
                action.date,
                
            )
            return {
                ...state,
                Attendence: state.Attendence.concat(totalAttendence),
                AllAttendence: state.AllAttendence.concat(totalAttendence),
            } 
            case DELETE_ATTENDENCE:
                return{
                    ...state,
                    Attendence: state.Attendence.filter(attendence => attendence.Id !== action.attId),
                    AllAttendence: state.AllAttendence.filter(attendence => attendence.Id !== action.attId),        
                };  
                case UPDATE_ATTENDENCE:
            const AttendenceIndex = state.Attendence.findIndex(Atten => Atten.id === action.id)
            const UpdatedAttendence = new MarkedAttendence(
                action.id,
                state.Attendence[AttendenceIndex].onwerId,
                state.Attendence[AttendenceIndex].Name,
                action.attendence,
                action.date,
            )
            const newUserAttendence = [...state.Attendence]
            newUserAttendence[AttendenceIndex] = UpdatedAttendence
            const AllAttendenceindex = state.AllAttendence.findIndex(Atten => Atten.id === action.id)
            const NewAllAttendence = [...state.AllAttendence]
            NewAllAttendence[AllAttendenceindex] = UpdatedAttendence
            return {
                ...state,
                AllAttendence: NewAllAttendence,
                Attendence: newUserAttendence,
            }  
    }


    return state;
}