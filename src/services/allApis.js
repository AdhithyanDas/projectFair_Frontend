import base_Url from "./baseUrl";
import commonApi from "./commonApi";

export const registerApi = async (data) => {
    return await commonApi(`${base_Url}/reg`, 'POST', "", data)
}

export const loginApi = async (data) => {
    return await commonApi(`${base_Url}/log`, 'POST', "", data)
}

export const addProjectApi = async (data, header) => {
    return await commonApi(`${base_Url}/addproject`, 'POST', header, data)
}

export const getProjectListApi = async (header) => {
    return await commonApi(`${base_Url}/projectlist`, "GET", header, "")
}

export const deleteProjectApi = async (id, header) => {
    return await commonApi(`${base_Url}/delproject/${id}`, "DELETE", header, {})
}

export const editProjectApi = async (id, header, data) => {
    return await commonApi(`${base_Url}/updateproject/${id}`, "PUT", header, data)
}

export const profileUpdateApi = async (data, header) => {
    return await commonApi(`${base_Url}/updateprofile`, "PUT", header, data)
}

export const allProjectsApi = async () => {
    return await commonApi(`${base_Url}/allprojects`, "GET", "", "")
}