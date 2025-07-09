// @/services/POST.tsx

// Axios
import api from "@/lib/axios";

// Types
import {
  AddOrEditUserType,
  ChangePasswordType,
  LoginUserType,
} from "@/lib/types";

// Login User
export async function loginUser(data: LoginUserType) {
  return await api.post("/auth/login", data);
}

// Verify User
export async function verifyUser() {
  return await api.post("/auth/verify");
}

// Logout User
export async function logoutUser() {
  return await api.post("/auth/log-out");
}

// Add User
export async function addUser(data: AddOrEditUserType) {
  return await api.post("/user/register-user", data);
}

// Get Users
export async function getUsers() {
  return await api.post("/user/get-users");
}

// Get Searched User
export async function getSearchedUsers(userName: string) {
  return await api.post(`/user/get-users/${userName}`);
}

// Change User Name
export async function changeUserName(data: LoginUserType) {
  return await api.post("/settings/change-userName", data);
}

// Change Password
export async function changePassword(data: ChangePasswordType) {
  return await api.post("/settings/change-password", data);
}

// Fetch User
export async function fetchUserByID(userID: string) {
  return await api.post(`/user/get-user-by-id/${userID}`);
}

// Edit User
export async function editUserByID(userID: string, data: AddOrEditUserType) {
  return await api.post(`/user/edit/${userID}`, data);
}
