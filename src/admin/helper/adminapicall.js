import { API } from "../../backend";


//Create Category calls
export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(category)
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
};

//Get a single category
export const getCategory = (categoryId) => {
    return (
        fetch(`${API}/category/${categoryId}`,{
        method: "GET"
    })
    ).then(res => res.json())
};

//Get all categories
export const getAllCategories = () => {
    return fetch(`${API}/categories`,{
        method: "GET"
    })
    .then(res => res.json())
};

//update category
export const updateCategory = (categoryId, userId, token, category) => {
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method: "PUT",
        headers: { 
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(category)
    })
    .then(response => {return response.json()})
    .catch(err => console.log(err));
}


//delete category
export const deleteCategory = (categoryId, userId, token) => {
    return (
        fetch(`${API}/category/${categoryId}/${userId}`,{
            method: "DELETE",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then( response => response.json())
        .catch( err => console.log(err))
    )

}

//Create Product
export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
};

//Get all products
export const getAllProducts = () => {
    return fetch(`${API}/products`,{
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

//Get a product
export const getProduct = (productId) => {
    return fetch(`${API}/product/${productId}`,{
        method: "GET"
    })
    .then(response => response.json())
};

//Update a product
export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`,{
        method: "PUT",
        headers: { 
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body:product
    })
    .then(response => {return response.json()})
    .catch(err => console.log(err));
}

//Delete a product
export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`,{
        method: "DELETE",
        headers: { 
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
    .then(response => {return response.json()})
    .catch(err => console.log(err));
}

//Get All Orders
export const getAllOrders = (userId, token) => {
    return fetch(`${API}/orders/all/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .catch(err => console.log(err))
}

//Get a specific order
export const getAOrder = (userId, token, orderId) => {
    return fetch(`${API}/order/${orderId}/${userId}`,{
    method: "GET",
    headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
    }
    })
    .then(response => response.json())
    .catch(err => console.log(err))
}