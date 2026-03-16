import { HELPING_HOUSE_LOGIN, DONER_LOGIN,SIGNUP_DONER } from "./loginType";

const initialState ={
    helpingHouseData :[],
    helpingHouseLoading :false,
    helpingHouseError :null,

    donerData :[],
    donerLoading :false,
    donerError :null,

    signupDonerData: [],
    signupDonerLoading:false,
    signupDonerError: null,
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case HELPING_HOUSE_LOGIN.HELPING_HOUSE_LOGIN_REQUEST:
            return {
                ...state,
                helpingHouseLoading: true,
                helpingHouseError: null,
            };
        case HELPING_HOUSE_LOGIN.HELPING_HOUSE_LOGIN_SUCCESS:
            return {
                ...state,
                helpingHouseLoading: false,
                helpingHouseData: action.payload,
            };
        case HELPING_HOUSE_LOGIN.HELPING_HOUSE_LOGIN_FAILURE:
            return {
                ...state,
                helpingHouseLoading: false,
                helpingHouseError: action.payload,
            };
        case DONER_LOGIN.DONER_LOGIN_REQUEST:
            return {
                ...state,
                donerLoading: true,
                donerError: null,
            };
        case DONER_LOGIN.DONER_LOGIN_SUCCESS:
            return {
                ...state,
                donerLoading: false,
                donerData: action.payload,
            };
        case DONER_LOGIN.DONER_LOGIN_FAILURE:
            return {
                ...state,
                donerLoading: false,
                donerError: action.payload,
            };

            case SIGNUP_DONER.SIGNUP_DONER_REQUEST:
                return{
                    ...state,
                    signupDonerLoading: true,
                    signupDonerError:null
                }

                case SIGNUP_DONER.SIGNUP_DONER_SUCCESS:
                    return {
                        ... state,
                        signupDonerLoading:false,
                        signupDonerData : action.payload,
                        signupDonerError:null
                    }
                    
                case SIGNUP_DONER.SIGNUP_DONER_FAILURE:
                    return {
                        ... state,
                        signupDonerLoading:false,
                        signupDonerError:action.payload
                    }
        default:
            return state;
    }
}

export default loginReducer;