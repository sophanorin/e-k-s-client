import {
  ALL_CATEGORY_FAIL,
  ALL_CATEGORY_REQUEST,
  ALL_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAIL,
  CREATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  DELETE_CATEGORY_SUCCESS,
  ONE_CATEGORY_FAIL,
  ONE_CATEGORY_REQUEST,
  ONE_CATEGORY_SUCCESS,
  RESET_CREATE_CATEGORY,
  RESET_DELETE_CATEGORY,
  RESET_UPDATE_CATEGORY,
  UPDATE_CATEGORY_FAIL,
  UPDATE_CATEGORY_SUCCESS,
} from "../constants/categoryConstants";

export const listCategoryReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case ALL_CATEGORY_REQUEST:
      return { loading: true };
    case ALL_CATEGORY_SUCCESS:
      return { loading: false, categories: action.payload };
    case ALL_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const categoryCreateReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CREATE_CATEGORY_SUCCESS:
      return {
        loading: false,
        success: true,
        category: action.payload.category,
      };
    case CREATE_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    case RESET_CREATE_CATEGORY:
      return {};
    default:
      return state;
  }
};

export const categoryUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_CATEGORY_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    case RESET_UPDATE_CATEGORY:
      return {};
    default:
      return state;
  }
};

export const categoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CATEGORY_SUCCESS:
      return { loading: false, success: true };
    case DELETE_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    case RESET_DELETE_CATEGORY:
      return {};
    default:
      return state;
  }
};

export const getSpecificCategoryReducer = (
  state = { category: {} },
  action
) => {
  switch (action.type) {
    case ONE_CATEGORY_REQUEST:
      return { loading: true, category: {} };
    case ONE_CATEGORY_SUCCESS:
      return { loading: false, category: action.payload };
    case ONE_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
