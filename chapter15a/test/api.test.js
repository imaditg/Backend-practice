const fetch = require('node-fetch')

describe('API TEST', () => {

    test('GET /api/views', async () => {
        const product = await fetch('http://localhost:3000/api/views')
        const data = await product.json()

        expect(product.status).toBe(200)
        // console.log(data)
        // console.log(data.product[0].name)
        expect(typeof (data.product[0].name)).toBe('string')
        expect(typeof (data.product[0].category)).toBe('string')
        expect(typeof (data.product[0].price)).toBe('number')
        expect(typeof (data.product[0].available)).toBe('boolean')
        // expect(data).toBeDefined()
    })
    test('GET /api/api-edit', async() =>{
        const product = await fetch('http://localhost:3000/api/api-edit')
        const data = await product.json()
        // console.log(data)
        expect(product.status).toBe(200)
        expect(typeof(data.newProduct.name)).toBe('string')
        expect(typeof(data.newProduct.price)).toBe('number')
        expect(typeof(data.newProduct.category)).toBe('string')
        expect(typeof(data.newProduct.available)).toBe('boolean')
    })
})