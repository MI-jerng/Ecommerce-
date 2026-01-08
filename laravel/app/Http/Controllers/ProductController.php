<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    // --- Get /api/products
    public function getProducts() {
        $products = Product::all();
        return response()->json($products);
    }

    // --- Post /api/products
    public function createProduct(Request $request) {
        abort_unless(auth()->user()->can('products.create'), 403);
        $this->authorize('create', Product::class);

        $product = Product::create([
            'name' => $request->name,
            'category_id' => $request->category_id,
            'pricing' => $request->pricing,
            'description' => $request->description,
            'images' => $request->images,
            'created_by' => auth()->id(),
        ]);
        return response()->json($product, 201);
    }

    // --- Get /api/products/{productId}
    public function getProductId($productId) {
        $product = Product::find($productId);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        $this->authorize('view', $product);
        return response()->json($product);
    }

    // --- Patch /api/products/{productId}
    public function updateProduct(Request $request, $productId) {
        abort_unless(auth()->user()->can('products.update'), 403);

        $product = Product::find($productId);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        $this->authorize('update', $product);
        $product->name = $request->name ?? $product->name;
        $product->category_id = $request->category_id ?? $product->category_id;
        $product->pricing = $request->pricing ?? $product->pricing;
        $product->description = $request->description ?? $product->description;
        $product->images = $request->images ?? $product->images;
        $product->save();
        return response()->json($product);
    }

    // --- Delete /api/products/{productId}
    public function deleteProduct($productId) {
        abort_unless(auth()->user()->can('products.delete'), 403);

        $product = Product::find($productId);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        $this->authorize('delete', $product);
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }

    // --- Get /api/categories/{categoryId}/products
    public function getProductsByCategoryId($categoryId) {
        $products = Product::where('category_id', $categoryId)->get();
        return response()->json($products);
    }
}
