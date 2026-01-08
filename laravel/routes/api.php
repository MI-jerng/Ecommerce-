<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;

// Public routes
Route::post('/login', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    if (!Auth::attempt($request->only('email', 'password'))) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    $user = Auth::user();
    $token = $user->createToken('mobile')->accessToken;

    return response()->json([
        'token' => $token,
        'user' => $user->load('roles'),
    ]);
});

// Protected routes
Route::middleware('auth:api')->group(function () {
    Route::get('/me', function (Request $request) {
        return $request->user()->load('roles.permissions');
    });

    Route::controller(CategoryController::class)->prefix('categories')->group(function () {
        Route::get('/', 'getCategories');
        Route::post('/', 'createCategory');
        Route::get('/{categoryId}', 'getCategoryId');
        Route::patch('/{categoryId}', 'updateCategory');
        Route::delete('/{categoryId}', 'deleteCategory');
    });

    Route::controller(ProductController::class)->prefix('products')->group(function () {
        Route::get('/', 'getProducts');
        Route::post('/', 'createProduct');
        Route::get('/{productId}', 'getProductId');
        Route::patch('/{productId}', 'updateProduct');
        Route::delete('/{productId}', 'deleteProduct');
    });

    Route::get('/categories/{categoryId}/products', [ProductController::class, 'getProductsByCategoryId']);

    Route::controller(UserController::class)->prefix('users')->group(function () {
        Route::get('/', 'index');
        Route::patch('/{user}/role', 'updateRole');
    });
});