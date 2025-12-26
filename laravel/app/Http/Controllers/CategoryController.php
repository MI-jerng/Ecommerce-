<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    // --- Get /api/categories
    public function getCategories() {
        $categories = Category::all();
        return response()->json($categories);
    }

    // --- Post /api/categories
    public function createCategory(Request $request) {
        $category = Category::create([
            'name' => $request->name
        ]);
        return response()->json($category, 201);
    }

    // --- Get /api/categories/{categoryId}
    public function getCategoryId($categoryId) {
        $category = Category::find($categoryId);
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }
        return response()->json($category);
    }

    // --- Patch /api/categories/{categoryId}
    public function updateCategory(Request $request, $categoryId) {
        $category = Category::find($categoryId);
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }
        $category->name = $request->name;
        $category->save();
        return response()->json($category);
    }

    // --- Delete /api/categories/{categoryId}
    public function deleteCategory($categoryId) {
        $category = Category::find($categoryId);
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }
        $category->delete();
        return response()->json(['message' => 'Category deleted successfully']);
    }
}
