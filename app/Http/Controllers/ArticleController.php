<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * Display a listing of all articles.
     */
    public function index()
    {
        // Fetch all articles with pagination (e.g., 9 articles per page)
        $articles = Article::with('author')->paginate(9);

        // Return JSON response
        return response()->json($articles);
    }

    /**
     * Display a listing of articles created by the authenticated user.
     */
    public function myArticles(Request $request)
    {
        // Get the authenticated user's ID
        $userId = $request->user()->id;

        // Fetch articles created by the authenticated user
        $articles = Article::where('author_id', $userId)->with('author')->paginate(10);

        // Return JSON response
        return response()->json($articles);
    }

    /**
     * Store a newly created article in storage.
     */
    public function store(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'image_url' => 'nullable|string|max:1024', // Adjust max length as needed
        ]);

        // Automatically set the author_id to the authenticated user's ID
        $validatedData['author_id'] = $request->user()->id;

        // Create the article
        $article = Article::create($validatedData);

        // Return JSON response with the created article
        return response()->json($article, 201);
    }

    /**
     * Display the specified article.
     */
    public function show(Article $article)
    {
        // Load the article with its author
        $article->load('author');

        // Return JSON response
        return response()->json($article);
    }

    /**
     * Update the specified article in storage.
     */
    public function update(Request $request, Article $article)
    {
        // Ensure the authenticated user is the author of the article
        if ($article->author_id !== $request->user()->id) {
            return response()->json(['message' => 'You are not authorized to update this article'], 403);
        }

        // Validate the incoming request data
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'image_url' => 'nullable|url',
        ]);

        // Update the article
        $article->update($validatedData);

        // Return JSON response with the updated article
        return response()->json($article);
    }

    /**
     * Remove the specified article from storage.
     */
    public function destroy(Request $request, Article $article)
    {
        // Ensure the authenticated user is the author of the article
        if ($article->author_id !== $request->user()->id) {
            return response()->json(['message' => 'You are not authorized to delete this article'], 403);
        }

        // Delete the article
        $article->delete();

        // Return JSON response
        return response()->json(['message' => 'Article deleted successfully'], 200);
    }
}
