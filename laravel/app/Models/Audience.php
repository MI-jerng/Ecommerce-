<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Audience extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'article_id',
        'name',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function article(): BelongsTo
    {
        return $this->belongsTo(Article::class);
    }

    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }

    public function subscribedArticles(): BelongsToMany
    {
        return $this->belongsToMany(Article::class, 'article_audience');
    }
}
