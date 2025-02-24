<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of comments.
     */
    public function index()
    {
        // Fetch all comments with pagination (e.g., 10 comments per page)
        $comments = Comment::with(['article', 'user'])->paginate(10);
        // Return JSON response
        return response()->json($comments);
    }

    /**
     * Store a newly created comment in storage.
     */
    public function store(Request $request, $article_id)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'body' => 'required|string', // Ensure the comment body is provided
        ]);

        // Automatically set the user_id to the authenticated user's ID
        $validatedData['user_id'] = $request->user()->id;

        // Set the post_id (article_id) from the URL parameter
        $validatedData['post_id'] = $article_id;

        // Create the comment
        $comment = Comment::create($validatedData);

        // Return JSON response with the created comment
        return response()->json($comment, 201);
    }

    /**
     * Display the specified comment.
     */
    public function show(Comment $comment)
    {
        // Load the comment with its associated article and user
        $comment->load('article', 'user');

        // Return JSON response
        return response()->json($comment);
    }

    /**
     * Display comments for a specific article.
     */
    public function showByArticle($articleId)
    {
        // Fetch comments for the given article ID
        $comments = Comment::where('post_id', $articleId)
            ->with(['user']) // Eager load the associated user
            ->get();

        // Return JSON response
        return response()->json($comments);
    }

    /**
     * Update the specified comment in storage.
     */
    public function update(Request $request, Comment $comment)
    {
        // Ensure the authenticated user is the author of the comment
        if ($comment->user_id !== $request->user()->id) {
            return response()->json(['message' => 'You are not authorized to update this comment'], 403);
        }

        // Validate the incoming request data
        $validatedData = $request->validate([
            'body' => 'required|string',
            'post_id' => 'required|exists:articles,id',
        ]);

        // Update the comment
        $comment->update($validatedData);

        // Return JSON response with the updated comment
        return response()->json($comment);
    }

    /**
     * Remove the specified comment from storage.
     */
    public function destroy(Request $request, Comment $comment)
    {
        // Ensure the authenticated user is the author of the comment
        if ($comment->user_id !== $request->user()->id) {
            return response()->json(['message' => 'You are not authorized to delete this comment'], 403);
        }

        // Delete the comment
        $comment->delete();

        // Return JSON response
        return response()->json(['message' => 'Comment deleted successfully'], 200);
    }

    /**
     * Stream new comments for a specific article using Server-Sent Events (SSE).
     */
    public function streamComments($articleId)
    {
        $lastCommentId = request()->query('last_comment_id', 0);

        return response()->stream(function () use ($articleId, $lastCommentId) {
            while (true) {
                // Fetch new comments for the article
                $newComments = Comment::where('post_id', $articleId)
                    ->where('id', '>', $lastCommentId)
                    ->orderBy('id', 'desc')
                    ->get();

                if ($newComments->isNotEmpty()) {
                    echo "data: " . json_encode($newComments) . "\n\n";
                    ob_flush();
                    flush();
                }

                // Wait for 5 seconds before checking again
                sleep(5);
            }
        }, 200, [
            'Content-Type' => 'text/event-stream',
            'Cache-Control' => 'no-cache',
            'X-Accel-Buffering' => 'no', // Disable buffering for NGINX
        ]);
    }

}
