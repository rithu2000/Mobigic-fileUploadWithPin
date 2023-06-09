import axios from 'axios'

const Api = axios.create({
  baseURL: 'http://localhost:8000/api'
})

Api.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = "Bearer " + localStorage.getItem("token");
  }
  return req;
});

export async function registerUser(credentials) {
  try {

    const { data } = await Api.post(`/register`, credentials, { withCredentials: true })

    return data
  } catch (error) {
    return { error: 'Cannot find the User' }
  }
};

export async function userLogin(credentials) {
  try {
    const { data } = await Api.post(`/login`, credentials, { withCredentials: true })

    return data
  } catch (error) {
    return { error: 'login failed' }
  }
};

export async function uploadFile(credentials) {
  try {
    const { data } = await Api.post(`/upload`, credentials, { withCredentials: true })

    return data
  } catch (error) {
    return { error: 'file upload error' }
  }
};

export async function getUploadedFiles(credentials) {
  try {
    const { data } = await Api.get(`/files`, credentials, { withCredentials: true })

    return data
  } catch (error) {
    return { error: 'file retrieval error' }
  }
};

export async function removeFile(credentials) {
  try {
    const { data } = await Api.delete(`/files/${credentials}`, { withCredentials: true })

    return data
  } catch (error) {
    return { error: 'file delete error' }
  }
};

export async function downloadFile(credentials) {
  try {
    const { data } = await Api.get(`/download/${credentials}`, { withCredentials: true })

    return data
  } catch (error) {
    return { error: 'file download error' }
  }
};