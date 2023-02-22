import Leave from '../../Models/LeaveClass'
import { LEAVE, SET_LEAVE,DELETE_LEAVE} from '../Actions/LeaveAction'


const initialState = {
    Leave: [],
    AllLeave: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_LEAVE:
            return {
                ...state,
                Leave: action.Leave,
                AllLeave: action.AllLeave
            }

        case LEAVE:
            const totalLeave = new Leave(
                action.id,
                action.onwerId,
                action.Name,
                action.FromDate,
                action.ToDate,
                action.date,

            )
            return {
                ...state,
                Leave: state.Leave.concat(totalLeave),
                AllLeave: state.AllLeave.concat(totalLeave),
            }
        case DELETE_LEAVE:
            return {
                ...state,
                Leave: state.Leave.filter(leave => leave.Id !== action.Leaveid),
                AllLeave: state.AllLeave.filter(leave => leave.Id !== action.Leaveid),
            };
    }


    return state;
}