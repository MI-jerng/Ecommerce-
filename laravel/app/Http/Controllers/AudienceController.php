<?php

namespace App\Http\Controllers;

use App\Models\Audience;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AudienceController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'user_name' => 'required|string|unique:users,name',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'article_id' => 'required|exists:articles,id',
        ]);

        // Create user
        $user = User::create([
            'name' => $request->user_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Create audience
        $audience = Audience::create([
            'user_id' => $user->id,
            'article_id' => $request->article_id,
            'name' => $request->name,
        ]);

        return response()->json([
            'message' => 'Audience created successfully',
            'audience' => $audience->load('user', 'article'),
        ], 201);
    }

    public function getComments($audienceId)
    {
        $audience = Audience::with('comments.user')->findOrFail($audienceId);
        return response()->json($audience->comments);
    }
}
