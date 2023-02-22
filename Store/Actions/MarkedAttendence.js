export const ATTEDENDENCE = 'ATTDENDENCE'
export const SET_ATTEDENCE = 'SET_ATTEDENCE'
export const DELETE_ATTENDENCE = 'DELETE_ATTENDENCE'
export const UPDATE_ATTENDENCE = 'UPDATE_ATTENDENCE'
import MarkedAttendence from '../../Models/MarkedAttendence'



export const fetchAttendence = () => {
    return async (dispatch, getState) => {
        userId = getState().StudentAuth.userId;
        // userId= getState.AmdinAuth.userId
        // AmdinAuth === StudentAuth
        try {
            const response = await fetch('https://attendence-system-4484f-default-rtdb.firebaseio.com//MarkedAttendence.json');
            if (!response.ok) {
                throw new Error('Some thing Went Wrong');
            }
            const resData = await response.json();
            // console.log(resData)

            const LoadedAttendence = []
            for (key in resData) {
                LoadedAttendence.push(new MarkedAttendence(
                    key,
                    resData[key].onwerId,
                    resData[key].Name,
                    resData[key].attendence,
                    new Date(resData[key].date),
                ))
            }
            dispatch({
                type: SET_ATTEDENCE,
                TotalAttendence: LoadedAttendence.filter(prof => prof.onwerId === userId),
                AlluserAttendence: LoadedAttendence
            })
        } catch (err) {
            throw err
        }
    };
};

export const TotalAttendence = (attendence, Name) => {
    const date = new Date();
    return async (dispatch, getState) => {
        const userId = getState().StudentAuth.userId;
        // userId= getState.AmdinAuth.userId
        // AmdinAuth === StudentAuth
        token = getState().StudentAuth.token;
        try {
            const response = await fetch('https://attendence-system-4484f-default-rtdb.firebaseio.com//MarkedAttendence.json',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Name,
                        attendence,
                        onwerId: userId,
                        date: date,

                    })
                }
            );
            const resData = await response.json();
            dispatch({
                type: ATTEDENDENCE,
                id: resData.name,
                Name,
                attendence,
                onwerId: userId,
                date: date,

            });

        } catch (err) {
            console.log(err)
        }
    };
};

export const AddAttendence = (onwerId,attendence, Name) => {
    const date = new Date();
    return async (dispatch, getState) => {
        // const userId = getState().StudentAuth.userId;
        // token = getState().StudentAuth.token;
        try {
            const response = await fetch('https://attendence-system-4484f-default-rtdb.firebaseio.com//MarkedAttendence.json',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Name,
                        attendence,
                        onwerId,
                        date: date,

                    })
                }
            );
            const resData = await response.json();
            dispatch({
                type: ATTEDENDENCE,
                id: resData.name,
                Name,
                attendence,
                onwerId,
                date: date,

            });

        } catch (err) {
            console.log(err)
        }
    };
};



export const deleteAttendence = Id => {
    return async (dispatch, getState) => {
        const token = getState().AmdinAuth.token;
        const response = await fetch(`https://attendence-system-4484f-default-rtdb.firebaseio.com//MarkedAttendence/${Id}.json`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('something went wrong')
        }
        dispatch({
            type: DELETE_ATTENDENCE, attId: Id
        })
    };
};

export const UpdateAttendence = (id, attendence) => {
    const date = new Date();
    return async (dispatch, getState) => {
            const response = await fetch(`https://attendence-system-4484f-default-rtdb.firebaseio.com//MarkedAttendence/${id}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                attendence,
                date: date,
            })
        });
        if (!response.ok) {
            throw new Error('something went wrong')
        }
        dispatch({
            type: UPDATE_ATTENDENCE,
            id,
            attendence,
            date: date,
        });
    }
}


