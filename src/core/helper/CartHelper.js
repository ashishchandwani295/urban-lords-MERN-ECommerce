export const addItemToCart = (item, next) => {

    let cart = [];

    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"));

            cart.map((product, index) => {
                if(product._id === item._id){
                    product.count += 1;
                    console.log(product.count)
                }
            })

        }
        cart.push({...item});
        localStorage.setItem("cart", JSON.stringify(cart));
        next();
    }
}

export const loadCart = () => {
    
    let cart = [];

    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"))
            return cart;
        }
    }
}

export const removeItemFromCart = (itemId) => {

    let cart = [];

    if(localStorage.getItem("cart")){
        cart = JSON.parse(localStorage.getItem("cart"));
        console.log(cart);

        cart.map((product, index) => {
            if(product._id === itemId){
                console.log(cart + " " + index)
                cart.splice(index,1);
             cart =  localStorage.setItem("cart", JSON.stringify(cart));
            }
        })


    }
        return cart;
}

export const emptyCart = () => {
    if(typeof window !== undefined){
        localStorage.removeItem("cart");
        let cart = [];
        cart =  localStorage.setItem("cart", JSON.stringify(cart));
    }
}