import axios from 'axios';
const backendUrl = "https://app-tech-blogs-backend.herokuapp.com"
export const loginService = async (user) => {
    const response = await axios.post(backendUrl + '/service/users/login', user,{
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });

    return response;
}

export const registerUser = async (user) => {
    const response = await axios.post(backendUrl + '/service/users/register', user,{
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });

    return response;
}

export const uploadImage = async (formData) => {
    const response = await axios.post(backendUrl + '/file/image/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return response;
}

export const createBlog = async (blog) => {
    const response = await axios.post(backendUrl + "/service/blogs/insert", blog, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": localStorage.getItem('token')
        }
    });

    return response;
}

export const getPublishedBlogs = async () => {
    const response = await axios.get(backendUrl + "/service/blog/pulished/", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });

    return response;
}

export const getPublishedBlogsWithPage = async (page) => {
    const response = await axios.get(backendUrl + "/service/blog/published?page=" + page, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });

    return response;
}

export const getRecentBlogs = async () => {
    const response = await axios.get(backendUrl + "/service/blog/recent", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });

    return response;
}

export const getAllBlogs = async () => {
    const response = await axios.get(backendUrl + "/service/blogs/all", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    });

    return response;
}

export const getDetailBlog = async (id) => {
    const response = await axios.get(backendUrl + "/service/blogs/" + id, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    });

    return response;
}

export const getUserInfo = async (id) => {
    const response = await axios.get(backendUrl + "/service/users/" + id, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    });

    return response;
}

export const updateBlog = async (id, set) => {
    const response = await axios.post(backendUrl + "/service/blogs/update/" + id, set, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": localStorage.getItem('token')
        }
    });

    return response;
}

export const deleteBlog = async (id) => {
    const response = await axios.get(backendUrl + "/service/blogs/delete/" + id, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": localStorage.getItem('token')
        }
    });

    return response;
}

export const getBlogsByUserId = async (id) => {
    const response = await axios.get(backendUrl + "/service/blogs/user/" + id, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });

    return response;
}

export const getTags = async () => {
    const response = await axios.get(backendUrl + "/service/tags", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });

    return response;
}