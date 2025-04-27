const BASE_URL = 'http://localhost:5000';

export const FOOD_URL = `${BASE_URL}/api/foods`; 
export const FOOD_BY_ID_URL = `${BASE_URL}/api/foods`;

export const USER_LOGIN_URL = `${BASE_URL}/api/users/login`; 
export const USER_REGISTER_URL = `${BASE_URL}/api/users/register`; 
export const USER_CHANGE_PASSWORD_URL = `${BASE_URL}/api/users/change-password`; 
// private changePasswordUrl = 'http://localhost:5000/api/users/change-password'; // Replace with your actual backend URL

export const ADMIN_LOGIN_URL = `${BASE_URL}/api/users/admin/login`; 

export const ORDER_URL = `${BASE_URL}/api/orders`; 
export const ORDER_CREATE_URL = `${ORDER_URL}/create`; 
export const ORDER_NEW_FOR_CURRENT_USER_URL = `${ORDER_URL}/newOrderForCurrentUser`;
export const ORDER_PAY_URL = `${ORDER_URL}/pay`; 
export const PAYMENT_URL = `${BASE_URL}/api/payments`; 

export const FEEDBACK_URL = `${BASE_URL}/api/feedback`; 

// ... other URLs
export const ORDER_USER_ORDERS_URL = `${BASE_URL}/api/orders/user/orders`; 
export const ORDER_ADMIN_ORDERS_URL = `${BASE_URL}/api/orders/admin/orders`; 

export const TABLE_BOOKING_URL = `${BASE_URL}/api/table-bookings`;
export const USER_BOOKING_HISTORY_URL = `${BASE_URL}/api/table-bookings/user/bookings`;
export const ADMIN_ALL_BOOKINGS_URL = `${BASE_URL}/api/table-bookings/admin/bookings`;

// export const ORDER_USER_ORDERS_URL = 'http://localhost:5000/api/orders/user/orders'; // Adjust the port and path if necessary
export const ORDER_TRACK_URL = `${ORDER_URL}/track/`; 

export const FOOD_ADD_URL = `${BASE_URL}/api/foods/add`;
export const FOOD_DELETE_URL = `${BASE_URL}/api/foods/delete`; // adjust this to match your backend

