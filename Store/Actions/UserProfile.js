export const EDIT_PROFILE = 'EDIT_PROFILE';
export const  CREATE_PROFILE = 'CREATE_PROFILE '
export const SET_PROFILE = 'SET_PROFILE';
import User from '../../Models/UserProfile'

export const fetchData = () => {
    return async (dispatch,getState) => {
       const userId = getState().StudentAuth.userId;
        // const userId= getState().Auth.userId;
        try {
            const response = await fetch('https://attendence-system-4484f-default-rtdb.firebaseio.com//UserProfile.json');
            if(!response.ok){
                throw new Error ('Some thing Went Wrong');
            }
            const resData = await response.json();

            const LoadedaProfile = []
            for (key in resData) {
                LoadedaProfile.push(new User(
                    key,
                    resData[key].ownerId,
                    resData[key].Name,
                    resData[key].Email,
                    resData[key].image,
                ))
            }
            dispatch({
                type: SET_PROFILE,
                profile: LoadedaProfile.filter(prof => prof.ownerId === userId),
                AllProfile:LoadedaProfile
                // userProduct:LoadedData.filter(prod=>prod.onwerId===userId)
            })
        } catch (err) {
           throw err 
        }
    };
};


export const CreateProfile = (Name, Email, image) => {
        return async (dispatch,getState) => {  
        // const token = getState().Auth.token;
        const userId = getState().StudentAuth.userId;
        token = getState().StudentAuth.token;
        const response = await fetch(`https://attendence-system-4484f-default-rtdb.firebaseio.com//UserProfile.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name,
                Email,
                image,
                ownerId:userId
            })
        });
       
        const resData = await response.json();

        dispatch({
            type: CREATE_PROFILE,
            ProductData: {
                id: resData.name,
                Name,
                Email,
                image,
                ownerId:userId
            }
        });
    };
};
export const Editprofile = (id,Name, Email, image) => {
    return async (dispatch,getState)  => {
        token = getState().StudentAuth.token;
        const userId = getState().StudentAuth.userId;
     const response=  await fetch(`https://attendence-system-4484f-default-rtdb.firebaseio.com//UserProfile/${id}.json?auth=${token}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name,
                Email,
                image,
            })
        });
        if(!response.ok){
            throw new Error ('something went wrong')
        }
    dispatch({
        type: EDIT_PROFILE,
        pid: id,
        ProductData: {
            Name,
            Email,
            image,
            ownerId:userId
        }
    });
}
}