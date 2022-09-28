import { faker } from '@faker-js/faker';


function getMockedProduct() {
    return {
        nombre: faker.commerce.product(),
        precio: faker.commerce.price(),
        foto: faker.image.imageUrl()
    }
}
function getMockedProducts(cant = 50) {
    const mockedProducts = []
    for (let i = 1; i <= cant; i++) {
        const mockedProduct = getMockedProduct()
        mockedProducts.push({id:i,...mockedProduct})
    }
    return mockedProducts
}

export default getMockedProducts