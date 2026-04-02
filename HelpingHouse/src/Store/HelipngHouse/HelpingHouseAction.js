import axios from "axios";
import {
  GET_ALL_HELPING_HOUSES,
  GET_HELPING_HOUSE_BY_ID,
  GET_HELPING_HOUSE_DASHBOARD,
  CREATE_PERSON,
  DELETE_PERSON,
  EDIT_HELPING_HOUSE,
} from "./HelpingHouseType";
import {
  CreatePersonUrl,
  DeletePersonUrl,
  GetAllHelpingHouseUrl,
  GetHelpingHouseDashboardUrl,
  GetHelpingHouseUrlById,
  EditHelpingHouseUrl,
} from "../../utils/Api";

export const getAllHelpingHousesRequest = () => ({
  type: GET_ALL_HELPING_HOUSES.GET_ALL_HELPING_HOUSES_REQUEST,
});

export const getAllHelpingHousesSuccess = (data) => ({
  type: GET_ALL_HELPING_HOUSES.GET_ALL_HELPING_HOUSES_SUCCESS,
  payload: data,
});

export const getAllHelpingHousesFailure = (error) => ({
  type: GET_ALL_HELPING_HOUSES.GET_ALL_HELPING_HOUSES_FAILURE,
  payload: error,
});

export const GetAllHelpingHouses = (accessToken, queryparam) => {
  return async (dispatch) => {
    dispatch(getAllHelpingHousesRequest());
    try {
      const config = {};
      if (accessToken) {
        config.headers = {
          Authorization: `Bearer ${accessToken}`,
        };
      }

      const response = await axios.get(
        GetAllHelpingHouseUrl(queryparam),
        config,
      );
      dispatch(getAllHelpingHousesSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(getAllHelpingHousesFailure(error.message));
      return { error: error.message };
    }
  };
};

export const getHelpingHouseByIdRequest = () => ({
  type: GET_HELPING_HOUSE_BY_ID.GET_HELPING_HOUSE_BY_ID_REQUEST,
});

export const getHelpingHouseByIdSuccess = (data) => ({
  type: GET_HELPING_HOUSE_BY_ID.GET_HELPING_HOUSE_BY_ID_SUCCESS,
  payload: data,
});

export const getHelpingHouseByIdFailure = (error) => ({
  type: GET_HELPING_HOUSE_BY_ID.GET_HELPING_HOUSE_BY_ID_FAILURE,
  payload: error,
});

export const GetHelpingHouseById = (accessToken, id) => {
  console.log(
    "GetHelpingHouseById called with id:",
    id,
    "and accessToken:",
    accessToken,
  );
  return async (dispatch) => {
    dispatch(getHelpingHouseByIdRequest());
    try {
      const config = {};
      if (accessToken) {
        config.headers = {
          Authorization: `Bearer ${accessToken}`,
        };
      }
      const response = await axios.get(GetHelpingHouseUrlById(id), config);
      dispatch(getHelpingHouseByIdSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(getHelpingHouseByIdFailure(error.message));
      return { error: error.message };
    }
  };
};

export const getHelpingHouseDashboardRequest = () => ({
  type: GET_HELPING_HOUSE_DASHBOARD.GET_HELPING_HOUSE_DASHBOARD_REQUEST,
});

export const getHelpingHouseDashboardSuccess = (data) => ({
  type: GET_HELPING_HOUSE_DASHBOARD.GET_HELPING_HOUSE_DASHBOARD_SUCCESS,
  payload: data,
});

export const getHelpingHouseDashboardFailure = (error) => ({
  type: GET_HELPING_HOUSE_DASHBOARD.GET_HELPING_HOUSE_DASHBOARD_FAILURE,
  payload: error,
});

export const GetHelpingHouseDashboard = (accessToken, id) => {
  return async (dispatch) => {
    dispatch(getHelpingHouseDashboardRequest());
    try {
      const config = {};
      if (accessToken) {
        config.headers = {
          Authorization: `Bearer ${accessToken}`,
        };
      }
      const response = await axios.get(GetHelpingHouseDashboardUrl(id), config);
      dispatch(getHelpingHouseDashboardSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(getHelpingHouseDashboardFailure(error.message));
      return { error: error.message };
    }
  };
};

export const createPersonRequest = () => ({
  type: CREATE_PERSON.CREATE_PERSON_REQUEST,
});

export const createPersonSuccess = (data) => ({
  type: CREATE_PERSON.CREATE_PERSON_SUCCESS,
  payload: data,
});

export const createPersonFailure = (error) => ({
  type: CREATE_PERSON.CREATE_PERSON_FAILURE,
  payload: error,
});

export const CreatePerson = (accessToken, personData) => {
  return async (dispatch) => {
    dispatch(createPersonRequest());
    try {
      const config = {};
      if (accessToken) {
        config.headers = {
          Authorization: `Bearer ${accessToken}`,
        };
      }
      const response = await axios.post(CreatePersonUrl, personData, config);
      dispatch(createPersonSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(createPersonFailure(error.message));
      return { error: error.message };
    }
  };
};

export const deletePersonRequest = () => ({
  type: DELETE_PERSON.DELETE_PERSON_REQUEST,
});

export const deletePersonSuccess = (data) => ({
  type: DELETE_PERSON.DELETE_PERSON_SUCCESS,
  payload: data,
});

export const deletePersonFailure = (error) => ({
  type: DELETE_PERSON.DELETE_PERSON_FAILURE,
  payload: error,
});

export const DeletePerson = (accessToken, personId) => {
  return async (dispatch) => {
    dispatch(deletePersonRequest());

    try {
      const config = {};
      if (accessToken) {
        config.headers = {
          Authorization: `Bearer ${accessToken}`,
        };
      }
      const response = await axios.delete(DeletePersonUrl(personId), config);
      dispatch(deletePersonSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(deletePersonFailure(error.message));
      return { error: error.message };
    }
  };
};

export const editHelpingHouseRequest = () => ({
  type: EDIT_HELPING_HOUSE.EDIT_HELPING_HOUSE_REQUEST,
});

export const editHelpingHouseSuccess = (data) => ({
  type: EDIT_HELPING_HOUSE.EDIT_HELPING_HOUSE_SUCCESS,
  payload: data,
});

export const editHelpingHouseFailure = (error) => ({
  type: EDIT_HELPING_HOUSE.EDIT_HELPING_HOUSE_FAILURE,
  payload: error,
});

export const EditHelpingHouse = (accessToken, id, helpingHouseData) => {
  return async (dispatch) => {
    dispatch(editHelpingHouseRequest());
    try {
      const config = {};
      if (accessToken) {
        config.headers = {
          Authorization: `Bearer ${accessToken}`,
        };
      }

      const response = await axios.put(
        EditHelpingHouseUrl(id),
        helpingHouseData,
        config,
      );
      dispatch(editHelpingHouseSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(editHelpingHouseFailure(error.message));
      return { error: error.message };
    }
  };
};
