const API_CONFIG = {
    baseURL: 'https://dummyjson.com',
    endpoints: {
        products: {
            all: '/products',
            byId: (id: number) => `/products/${id}`,
            create: '/products/add',
        }
    }
}

export default API_CONFIG;