<?php

namespace App\Http\Controllers;

use App\Models\Audience;
use Illuminate\Http\Request;

class SubscribeController extends Controller
{
    public function subscribe(Request $request)
    {
        $request->validate([
            'audience_id' => 'required|exists:audiences,id',
            'article_ids' => 'required|array',
            'article_ids.*' => 'exists:articles,id',
        ]);

        $audience = Audience::findOrFail($request->audience_id);
        
        // Attach articles to the audience (subscribe)
        $audience->subscribedArticles()->syncWithoutDetaching($request->article_ids);

        return response()->json([
            'message' => 'Successfully subscribed to articles',
            'audience' => $audience->load('subscribedArticles'),
        ], 200);
    }
}