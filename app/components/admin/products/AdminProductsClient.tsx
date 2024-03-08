"use client"
import { Tabs } from 'flowbite-react';

import { IoMdAdd } from "react-icons/io";
import { FaList } from 'react-icons/fa';

import { Brand, Category, Prisma, Product } from '@prisma/client';

import AdminAddProduct from './AdminAddProduct';
import AdminProductCategories from './AdminProductCategories';
import AdminManageProducts from './AdminManageProducts';

import Heading from '../../general/Heading';
import { MdBrandingWatermark, MdCategory } from 'react-icons/md';
import React from 'react';
import AdminProductBrands from './AdminProductBrands';


type ProductWithBrandCategory = Prisma.ProductGetPayload<{
    include: { brand: true, category: true }
}>
type ProductWithPayload = Product & ProductWithBrandCategory;

interface AdminProductsClientProps {

    products: Array<ProductWithPayload>
    categories: Array<Category>
    brands: Array<Brand>
}

const AdminProductsClient: React.FC<AdminProductsClientProps> = ({ products, categories, brands }) => {
    return (
        <div className="w-full px-5">
            <Heading text="Manage Products" textSize="3xl" subText="Create & manage products" subTextSize="base" border />
            <div className="overflow-x-auto">
                <Tabs style="fullWidth">
                    <Tabs.Item active title="Add a Product" icon={IoMdAdd}>
                        <AdminAddProduct categories={categories} brands={brands} />
                    </Tabs.Item>
                    <Tabs.Item title="Product Brands" icon={MdBrandingWatermark}>
                        <AdminProductBrands brands={brands} />
                    </Tabs.Item>
                    <Tabs.Item title="Product Categories" icon={MdCategory}>
                        <AdminProductCategories categories={categories} />
                    </Tabs.Item>
                    <Tabs.Item title="All Products" icon={FaList}>
                        <AdminManageProducts products={products} />
                    </Tabs.Item>
                </Tabs>
            </div>
        </div>
    )
}

export default AdminProductsClient