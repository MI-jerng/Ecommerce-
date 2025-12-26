<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function getProducts()
    {
        // Get all products
    }

    public function createProduct(Request $request)
    {
        // Create 1 product
    }

    public function getProductId($productId)
    {
        // Get 1 product
    }

    public function updateProduct(Request $request, $productId)
    {
        // Update 1 product
    }

    public function deleteProduct($productId)
    {
        // Delete 1 product
    }

    public function getProductsByCategoryId($categoryId)
    {
        // Get all products belong to categoryId
    }
}
