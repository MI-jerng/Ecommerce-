<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthorController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'user_name' => 'required|string|unique:users,name',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'bio' => 'nullable|string',
        ]);

        // Create user
        $user = User::create([
            'name' => $request->user_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Create author
        $author = Author::create([
            'user_id' => $user->id,
            'name' => $request->name,
            'bio' => $request->bio,
        ]);

        return response()->json([
            'message' => 'Author created successfully',
            'author' => $author->load('user'),
        ], 201);
    }

    public function getArticles($authorId)
    {
        $author = Author::with('articles')->findOrFail($authorId);
        return response()->json($author->articles);
    }

    public function getAudiences($authorId)
    {
        $author = Author::with('audiences')->findOrFail($authorId);
        return response()->json($author->audiences);
    }
}