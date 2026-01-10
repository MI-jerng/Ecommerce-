<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'commentable_type' => 'required|string',
            'commentable_id' => 'required|integer',
            'content' => 'required|string',
        ]);

        $comment = Comment::create([
            'user_id' => $request->user_id,
            'commentable_type' => $request->commentable_type,
            'commentable_id' => $request->commentable_id,
            'content' => $request->content,
        ]);

        return response()->json([
            'message' => 'Comment created successfully',
            'comment' => $comment->load('user', 'commentable'),
        ], 201);
    }

    public function index()
    {
        $comments = Comment::with(['user', 'commentable'])->get();
        return response()->json($comments);
    }
}
