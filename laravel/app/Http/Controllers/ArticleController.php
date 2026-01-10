<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Author;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'author_id' => 'required|exists:authors,id',
            'title' => 'required|string',
            'content' => 'nullable|string',
        ]);

        $article = Article::create([
            'author_id' => $request->author_id,
            'title' => $request->title,
            'content' => $request->content,
        ]);

        return response()->json([
            'message' => 'Article created successfully',
            'article' => $article->load('author'),
        ], 201);
    }

    public function getAudiences($articleId)
    {
        $article = Article::with('audiences')->findOrFail($articleId);
        return response()->json($article->audiences);
    }
}
