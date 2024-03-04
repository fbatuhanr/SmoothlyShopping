"use client"
import { Tabs } from 'flowbite-react';

import { IoMdAdd } from "react-icons/io";
import { FaList } from 'react-icons/fa';

import { Product } from '@prisma/client';
import ManageProducts from './ManageProducts';
import AddProduct from './AddProduct';
import Heading from '../../general/Heading';

const AdminProductsClient = ({products}:{products:Array<Product>}) => {
    return (
        <div className="w-full px-5">
            <Heading text="Manage Products" textSize="3xl" subText="Create & manage products" subTextSize="base" border/>
            <div className="overflow-x-auto">
                <Tabs style="fullWidth">
                    <Tabs.Item active title="Add a Product" icon={IoMdAdd}>
                        <AddProduct />
                    </Tabs.Item>
                    <Tabs.Item title="All Products" icon={FaList}>
                        <ManageProducts products={products} />
                    </Tabs.Item>
                </Tabs>
            </div>
        </div>
    )
}

export default AdminProductsClient