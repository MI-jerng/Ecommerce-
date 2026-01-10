<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AudienceController;
use App\Http\Controllers\SubscribeController;
use App\Http\Controllers\CommentController;

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

    Route::controller(AuthorController::class)->prefix('authors')->group(function () {
        Route::post('/', 'store');
        Route::get('/{author}/articles', 'getArticles');
        Route::get('/{author}/audiences', 'getAudiences');
    });

    Route::controller(ArticleController::class)->prefix('articles')->group(function () {
        Route::post('/', 'store');
        Route::get('/{article}/audiences', 'getAudiences');
    });

    Route::controller(AudienceController::class)->prefix('audiences')->group(function () {
        Route::post('/', 'store');
        Route::get('/{audience}/comments', 'getComments');
    });

    Route::post('/subscribe', [SubscribeController::class, 'subscribe']);

    Route::controller(CommentController::class)->prefix('comments')->group(function () {
        Route::post('/', 'store');
        Route::get('/', 'index');
    });
});