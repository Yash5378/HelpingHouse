import {
  GET_ALL_HELPING_HOUSES,
  GET_HELPING_HOUSE_BY_ID,
  GET_HELPING_HOUSE_DASHBOARD,
  CREATE_PERSON,
  DELETE_PERSON,
  EDIT_HELPING_HOUSE,
} from "./HelpingHouseType";
const initialState = {
  getAllHelpingHousesLoading: false,
  getAllHelpingHousesError: null,
  getAllHelpingHousesData: [],
  getHelpingHouseByIdLoading: false,
  getHelpingHouseByIdError: null,
  getHelpingHouseByIdData: null,

  getHelpingHouseDashboardLoading: false,
  getHelpingHouseDashboardError: null,
  getHelpingHouseDashboardData: null,

  createPersonLoading: false,
  createPersonError: null,
  createPersonData: null,

  deletePersonLoading: false,
  deletePersonError: null,
  deletePersonData: null,

  editHelpingHouseLoading: false,
  editHelpingHouseError: null,
  editHelpingHouseData: null,
};

export const helpingHouseReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_HELPING_HOUSES.GET_ALL_HELPING_HOUSES_REQUEST:
      return {
        ...state,
        getAllHelpingHousesLoading: true,
        getAllHelpingHousesError: null,
      };
    case GET_ALL_HELPING_HOUSES.GET_ALL_HELPING_HOUSES_SUCCESS:
      return {
        ...state,
        getAllHelpingHousesLoading: false,
        getAllHelpingHousesData: action.payload,
      };
    case GET_ALL_HELPING_HOUSES.GET_ALL_HELPING_HOUSES_FAILURE:
      return {
        ...state,
        getAllHelpingHousesLoading: false,
        getAllHelpingHousesError: action.payload,
      };

    case GET_HELPING_HOUSE_BY_ID.GET_HELPING_HOUSE_BY_ID_REQUEST:
      return {
        ...state,
        getHelpingHouseByIdLoading: true,
        getHelpingHouseByIdError: null,
      };
    case GET_HELPING_HOUSE_BY_ID.GET_HELPING_HOUSE_BY_ID_SUCCESS:
      return {
        ...state,
        getHelpingHouseByIdLoading: false,
        getHelpingHouseByIdData: action.payload,
      };
    case GET_HELPING_HOUSE_BY_ID.GET_HELPING_HOUSE_BY_ID_FAILURE:
      return {
        ...state,
        getHelpingHouseByIdLoading: false,
        getHelpingHouseByIdError: action.payload,
      };

    case GET_HELPING_HOUSE_DASHBOARD.GET_HELPING_HOUSE_DASHBOARD_REQUEST:
      return {
        ...state,
        getHelpingHouseDashboardLoading: true,
        getHelpingHouseDashboardError: null,
      };
    case GET_HELPING_HOUSE_DASHBOARD.GET_HELPING_HOUSE_DASHBOARD_SUCCESS:
      return {
        ...state,
        getHelpingHouseDashboardLoading: false,
        getHelpingHouseDashboardData: action.payload,
      };
    case GET_HELPING_HOUSE_DASHBOARD.GET_HELPING_HOUSE_DASHBOARD_FAILURE:
      return {
        ...state,
        getHelpingHouseDashboardLoading: false,
        getHelpingHouseDashboardError: action.payload,
      };

    case CREATE_PERSON.CREATE_PERSON_REQUEST:
      return {
        ...state,
        createPersonLoading: true,
        createPersonError: null,
      };

    case CREATE_PERSON.CREATE_PERSON_SUCCESS:
      return {
        ...state,
        createPersonLoading: false,
        createPersonData: action.payload,
      };

    case CREATE_PERSON.CREATE_PERSON_FAILURE:
      return {
        ...state,
        createPersonLoading: false,
        createPersonError: action.payload,
      };

    case DELETE_PERSON.DELETE_PERSON_REQUEST:
      return {
        ...state,
        deletePersonLoading: true,
        deletePersonError: null,
      };

    case DELETE_PERSON.DELETE_PERSON_SUCCESS:
      return {
        ...state,
        deletePersonLoading: false,
        deletePersonData: action.payload,
      };

    case DELETE_PERSON.DELETE_PERSON_FAILURE:
      return {
        ...state,
        deletePersonLoading: false,
        deletePersonError: action.payload,
      };

    case EDIT_HELPING_HOUSE.EDIT_HELPING_HOUSE_REQUEST:
      return {
        ...state,
        editHelpingHouseLoading: true,
        editHelpingHouseError: null,
      };

    case EDIT_HELPING_HOUSE.EDIT_HELPING_HOUSE_SUCCESS:
      return {
        ...state,
        editHelpingHouseLoading: false,
        editHelpingHouseData: action.payload,
      };

    case EDIT_HELPING_HOUSE.EDIT_HELPING_HOUSE_FAILURE:
      return {
        ...state,
        editHelpingHouseLoading: false,
        editHelpingHouseError: action.payload,
      };
    default:
      return state;
  }
};

export default helpingHouseReducer;
