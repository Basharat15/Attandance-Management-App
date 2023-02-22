import { EDIT_PROFILE, CREATE_PROFILE, SET_PROFILE, } from '../Actions/UserProfile';
import User from '../../Models/UserProfile'

const initialState = {
    userProfile: [],
    AllProfile:[]
};
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE:
            return {
                ...state,
                userProfile:action.profile,
                AllProfile:action.AllProfile
            }

        case CREATE_PROFILE:
            const NewProfile = new User(
                action.ProductData.id,
                action.ProductData.ownerId,
                action.ProductData.Name,
                action.ProductData.Email,
                action.ProductData.image,
               
            )
            return {
                ...state,
                userProfile: state.userProfile.concat(NewProfile),
                AllProfile: state.AllProfile.concat(NewProfile),
            };

        case EDIT_PROFILE:
            const profileIndex = state.userProfile.findIndex(prod => prod.id === action.pid)
            const Editedpofile = new User(
                action.pid,
                 action.ownerId,
                action.ProductData.Name,
                action.ProductData.Email,
                action.ProductData.image,
            )
            const newUserProfile = [...state.userProfile]
            newUserProfile[profileIndex] = Editedpofile

            const Allprofileindex = state.AllProfile.findIndex(prof => prof.id === action.pid)
            const NewAllProfile = [...state.AllProfile]
            NewAllProfile[Allprofileindex] = Editedpofile
            
            return {
                ...state,
                userProfile: newUserProfile,
                AllProfile: NewAllProfile,
            }

    }
    return state
}