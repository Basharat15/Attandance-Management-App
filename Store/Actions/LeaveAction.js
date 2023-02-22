export const LEAVE = 'LEAVE'
export const SET_LEAVE = 'SET_LEAVE '
export const DELETE_LEAVE= 'DELETE_LEAVE'
import Leave from '../../Models/LeaveClass'


export const fetchLeave = () => {
    return async (dispatch,getState) => {
        userId = getState().StudentAuth.userId;
        try {
            const response = await fetch('https://attendence-system-4484f-default-rtdb.firebaseio.com//Leave.json');
            if (!response.ok) {
                throw new Error('Some thing Went Wrong');
            }
            const resData = await response.json();
            // console.log(resData)

            const LoadedLeave = []
            for (key in resData) {
                LoadedLeave.push(new Leave(
                    key,
                    resData[key].onwerId,
                    resData[key].Name,
                    resData[key].FromDate,
                    resData[key].ToDate,
                    new Date(resData[key].date),
                ))
            }
            dispatch({
                type: SET_LEAVE,
                Leave: LoadedLeave.filter(prof => prof.onwerId === userId),
                AllLeave: LoadedLeave
            })
        } catch (err) {
            throw err
        }
    };
};

export const TotalLeave = (Name,FromDate,ToDate) => {
    const date = new Date();
    return async (dispatch,getState) => {
        const userId = getState().StudentAuth.userId;
        token = getState().StudentAuth.token;
        try {
            const response = await fetch(`https://attendence-system-4484f-default-rtdb.firebaseio.com//Leave.json?auth=${token}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Name,
                        FromDate,
                        ToDate,
                        date: date,
                        onwerId:userId,
                       
                    })
                }
            );
            const resData = await response.json();
            dispatch({
                type:LEAVE,
                id:resData.name,
                Name,
                FromDate,
                ToDate,
                date: date,
                onwerId:userId,
             
            });

        } catch (err) {
            console.log(err)
        }
    };
};

export const deleteLeave = Id => {
    return async (dispatch, getState) => {  
        const response = await fetch(`https://attendence-system-4484f-default-rtdb.firebaseio.com//Leave/${Id}.json`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('something went wrong')
        }
        dispatch({
            type: DELETE_LEAVE, Leaveid: Id
        })
    };
};