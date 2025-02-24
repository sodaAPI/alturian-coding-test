<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [AuthController::class, 'login'])->middleware('web');
Route::post('/register', [AuthController::class, 'register'])->middleware('web');
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Public Routes (No Authentication Required)
Route::get('/articles', [ArticleController::class, 'index']); // List all articles
Route::get('/articles/{article}', [ArticleController::class, 'show']); // View a single article
Route::get('/comments', [CommentController::class, 'index']); // List all comments
Route::get('/comments/{comment}', [CommentController::class, 'show']); // View a single comment
Route::get('/articles/{article}/comments', [CommentController::class, 'showByArticle']); // Fetch comments for a specific article
Route::get('/articles/{article}/comments/stream', [CommentController::class, 'streamComments']);

// Protected Routes (Authentication Required)
Route::middleware('auth:sanctum')->group(function () {
    // Article Routes
    Route::get('/my-articles', [ArticleController::class, 'myArticles']); // Fetch articles created by the logged-in user
    Route::post('/articles', [ArticleController::class, 'store']); // Create an article
    Route::put('/articles/{article}', [ArticleController::class, 'update']); // Update an article
    Route::delete('/articles/{article}', [ArticleController::class, 'destroy']); // Delete an article

    // Comment Routes
    Route::post('/comments/{article_id}', [CommentController::class, 'store']); // Create a comment for a specific article
    Route::put('/comments/{comment}', [CommentController::class, 'update']); // Update a comment
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy']); // Delete a comment
});
