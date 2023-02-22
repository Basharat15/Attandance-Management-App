import AcceptedLeave from '../../Models/AcceptedLeaveClass'
import { ACCEPTED_LEAVE, SET_ACCEPTED_LEAVE} from '../Actions/AcceptedLeave'


const initialState = {
    AcceptedLeave: [],
    // AllLeave: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ACCEPTED_LEAVE:
            return {
                ...state,
                AcceptedLeave: action.AcceptedLeave,
                // AllLeave: action.AllLeave
            }

        case ACCEPTED_LEAVE:
            const totalLeave = new AcceptedLeave(
                action.id,
                action.onwerId,
                action.Name,
                action.FromDate,
                action.ToDate,
                action.Remarks,
                action.date,

            )
            return {
                ...state,
                AcceptedLeave: state.AcceptedLeave.concat(totalLeave),
                // AllLeave: state.AllLeave.concat(totalLeave),
            }
    }


    return state;
}