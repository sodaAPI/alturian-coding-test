<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    // Define the fillable fields to allow mass assignment
    protected $fillable = [
        'title',
        'body',
        'image_url',
        'author_id',
    ];

    // Define the relationship with the User model
    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}
