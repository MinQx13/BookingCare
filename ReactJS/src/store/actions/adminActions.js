import actionTypes from './actionTypes';
import { getAllCodeServiece, createNewUserService, getAllUsers } from "../../services/userService";

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState)  =>  {
    try{
        dispatch({ type: actionTypes.FETCH_GENDER_START })
        let res = await getAllCodeServiece("GENDER");
        if ( res && res.errCode === 0){
            dispatch(fetchGenderSuccess(res.data));
        }
        else{
            dispatch(fetchGenderfailed());
        }
    }catch(e){
        dispatch(fetchGenderfailed());
        console.log('fetchGenderfailed error', e)
        }
    }
}
    
export const fetchPositionStart = () => {
    return async (dispatch, getState)  =>  {
    try{
        let res = await getAllCodeServiece("POSITION");
        if ( res && res.errCode === 0){
            dispatch(fetchPositionSuccess(res.data));
        }
        else{
            dispatch(fetchPositionfailed());
        }
    }catch(e){
        dispatch(fetchPositionfailed());
        console.log('fetchPositionfailed error', e)
        }
    }
}

export const fetchRoleStart = () => {
    return async (dispatch, getState)  =>  {
    try{
        let res = await getAllCodeServiece("ROLE");
        if ( res && res.errCode === 0){
            dispatch(fetchRoleSuccess(res.data));
        } else{
            dispatch(fetchRolefailed());
        }
    }catch(e){
        dispatch(fetchRolefailed());
        console.log('fetchRolefailed error', e)
        }
    }
}

export const fetchAllUsersStart = () => {
    return async (dispatch, getState)  =>  {
    try{
        let res = await getAllUsers("ALL");
        if ( res && res.errCode === 0){
            dispatch(fetchAllUsersSuccess(res.users));
        } else{
            dispatch(fetchAllUsersfailed());
        }
    }catch(e){
        dispatch(fetchAllUsersfailed());
        console.log('fetchAllUsersfailed error', e)
        }
    }
}

export const fetchGenderSuccess = (GenderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: GenderData
})

export const fetchGenderfailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})


export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionfailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRolefailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})


export const createNewUser = (data) => {
    return async (dispatch, getState)  =>  {
        try{
            let res = await createNewUserService(data);
            console.log('check create user redux:', res)
            if ( res && res.errCode === 0){
                dispatch(saveUserSuccess());
            }
            else{
                dispatch(saveUserFailed());
            }
        }catch(e){
            dispatch(saveUserFailed());
            console.log('saveUserFailed error', e)
        }
    }
}

export const saveUserSuccess = () => ({
    type: 'CREATE_USER_SUCCESS'
})
export const saveUserFailed = () => ({
    type: 'CREATE_USER_SUCCESS'
})

export const fetchAllUsersSuccess = (data) =>({
    type: 'FETCH_ALL_USER_SUCCESS',
    users: data
})
export const fetchAllUsersfailed = () =>({
    type: 'FETCH_ALL_USER_FAILED',
})
