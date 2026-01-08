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
        abort_unless(auth()->user()->can('categories.create'), 403);
        $this->authorize('create', Category::class);

        $category = Category::create([
            'name' => $request->name,
            'created_by' => auth()->id(),
        ]);
        return response()->json($category, 201);
    }

    // --- Get /api/categories/{categoryId}
    public function getCategoryId($categoryId) {
        $category = Category::find($categoryId);
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }
        $this->authorize('view', $category);
        return response()->json($category);
    }

    // --- Patch /api/categories/{categoryId}
    public function updateCategory(Request $request, $categoryId) {
        abort_unless(auth()->user()->can('categories.update'), 403);

        $category = Category::find($categoryId);
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }
        $this->authorize('update', $category);
        $category->name = $request->name;
        $category->save();
        return response()->json($category);
    }

    // --- Delete /api/categories/{categoryId}
    public function deleteCategory($categoryId) {
        abort_unless(auth()->user()->can('categories.delete'), 403);

        $category = Category::find($categoryId);
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }
        $this->authorize('delete', $category);
        $category->delete();
        return response()->json(['message' => 'Category deleted successfully']);
    }
}
