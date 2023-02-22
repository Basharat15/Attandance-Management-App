export const ACCEPTED_LEAVE = 'ACCEPTED_LEAVE'
export const SET_ACCEPTED_LEAVE= 'SET_ACCEPTED_LEAVE'
import AcceptedLeave from '../../Models/AcceptedLeaveClass'


export const fetchAcceptedLeave = () => {
    return async (dispatch,getState) => {
        userId = getState().StudentAuth.userId;
        try {
            const response = await fetch('https://attendence-system-4484f-default-rtdb.firebaseio.com/AcceptedLeave.json');
            if (!response.ok) {
                throw new Error('Some thing Went Wrong');
            }
            const resData = await response.json();
            // console.log(resData)

            const LoadedAcceptedLeave = []
            for (key in resData) {
                LoadedAcceptedLeave.push(new AcceptedLeave(
                    key,
                    resData[key].onwerId,
                    resData[key].Name,
                    resData[key].FromDate,
                    resData[key].ToDate,
                    resData[key].Remarks,
                    new Date(resData[key].date),
                ))
            }
            dispatch({
                type: SET_ACCEPTED_LEAVE,
                AcceptedLeave: LoadedAcceptedLeave.filter(prof => prof.onwerId === userId),
                // AllLeave: LoadedAcceptedLeave
            })
            console.log(LoadedAcceptedLeave)
        } catch (err) {
            throw err
        }
    };
};

export const AcceptedAllLeave = (onwerId,Name,FromDate,ToDate,Remarks) => {
    const date = new Date();
    return async (dispatch,getState) => {
        // const userId = getState().StudentAuth.userId;
        // token = getState().AdminAuth.token;
        try {
            const response = await fetch('https://attendence-system-4484f-default-rtdb.firebaseio.com/AcceptedLeave.json',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        onwerId,
                        Name,
                        FromDate,
                        ToDate,
                        Remarks,
                        date: date,
                    })
                }
            );
            const resData = await response.json();
            dispatch({
                type:ACCEPTED_LEAVE,
                id:resData.name,
                onwerId,
                Name,
                FromDate,
                ToDate,
                Remarks,
                date: date,
             
            });

        } catch (err) {
            console.log(err)
        }
    };
};