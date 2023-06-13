export const HOST = process.env.SERVER_URL;
export const API_URL = `${HOST}/api`;

export const AUTH_ROUTES = `${API_URL}/auth`;
export const LISTING_ROUTES = `${API_URL}/listing`
export const ORDERS_ROUTES = `${API_URL}/orders`;
export const MESSAGES_ROUTES = `${API_URL}/messages`;
export const DASHBOARD_DATA_ROUTES = `${API_URL}/dashboard`;

export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const GET_USER_INFO = `${AUTH_ROUTES}/get-user-info`;
export const SET_USER_INFO = `${AUTH_ROUTES}/set-user-info`;
export const SET_USER_IMAGE = `${AUTH_ROUTES}/set-user-image`;

export const ADD_LISTING_ROUTE = `${LISTING_ROUTES}/add`;
export const GET_USER_LISTING_ROUTE = `${LISTING_ROUTES}/get-user-listing`;
export const GET_LISTING_DATA = `${LISTING_ROUTES}/get-listing-data`;
export const EDIT_LISTING_ROUTE = `${LISTING_ROUTES}/edit-listing`;
export const DELETE_LISTING_ROUTE = `${LISTING_ROUTES}/delete-listing`;
export const SEARCH_LISTING_ROUTE = `${LISTING_ROUTES}/search-listing`;
export const CHECK_USER_ORDERED_LISTING_ROUTE = `${LISTING_ROUTES}/check-listing-order`;
export const ADD_REVIEW = `${LISTING_ROUTES}/add-review`;

export const CREATE_ORDER = `${ORDERS_ROUTES}/create`;
export const ORDER_SUCCESS_ROUTE = `${ORDERS_ROUTES}/success`;
export const GET_BUYER_ORDERS_ROUTE = `${ORDERS_ROUTES}/get-buyer-orders`;
export const GET_SELLER_ORDERS_ROUTE = `${ORDERS_ROUTES}/get-seller-orders`;

export const GET_MESSAGES = `${MESSAGES_ROUTES}/get-messages`;
export const ADD_MESSAGE = `${MESSAGES_ROUTES}/add-message`;
export const GET_UNREAD_MESSAGES = `${MESSAGES_ROUTES}/unread-messages`;
export const MARK_AS_READ_ROUTE = `${MESSAGES_ROUTES}/mark-as-read`;

export const GET_SELLER_DASHBOARD_DATA = `${DASHBOARD_DATA_ROUTES}/seller`;