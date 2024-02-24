"use client"

import { Product } from "@prisma/client"
import React, { useCallback } from "react"
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ManageProductsClientProps {
    products: Product[]
}

const ManageProductsClient: React.FC<ManageProductsClientProps> = ({ products }) => {

    const router = useRouter()

    let rows:any = []
    if(products){
        rows = products.map((product) => {
            return {
                id: product.id,
                title: product.title,
                price: product.price,
                category: product.category,
                brand: product.brand,
                inStock: product.inStock,
                image: product.image
            }
        })
    }

    const columns: GridColDef[] = [
        {field: "id", headerName: "ID", width: 150},
        {field: "title", headerName: "Title", width: 150},
        {field: "price", headerName: "Price", width: 100},
        {field: "category", headerName: "Category", width: 100},
        {field: "brand", headerName: "Brand", width: 100},
        {field: "inStock", 
           headerName: "Stock", 
           width: 100,
           renderCell: (params) => {
            return (
                <div>
                    {params.row.inStock == true 
                        ? <span className="text-green-700">In Stock</span> 
                        : <span className="text-red-700">Out of Stock</span>}
                </div>
            )
           }
        },
        {field: "actions", 
           headerName: "Action", 
           width: 100,
           renderCell: (params) => {
            return (
                <button onClick={() => handleDelete(params.row.id, params.row.image)} className="mx-4 text-red-500 cursor-pointer ">
                    Sil 
                </button>
            )
           }
        },
    ]

    const handleDelete = useCallback(async (id: string, image: any) => {
        
        toast.success('Deleting...')

        axios.delete(`/api/product/${id}`)
        .then(() => {
          toast.success('Successfully removed!')
          router.refresh();
        })
        .catch((error: any) => {
            console.log(error)
        })
    }, [])

    return (
        <div>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    )
}

export default ManageProductsClient