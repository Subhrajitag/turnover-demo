import React from 'react'
import { api } from '~/utils/api'

const products = () => {
    const product = api.category.create.useMutation();
    const addProducts = async() => {        
        for (let i = 0; i < 100; i++) {
           await product.mutateAsync();
        }
    }
    return (
        <div className='w-full flex justify-center'>
            <button className='bg-black text-white px-4 py-2 rounded-lg ' onClick={addProducts}>Add 100 products</button>
        </div>
    )
}

export default products