<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Comment;
use App\Models\User;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all users and articles
        $users = User::all();
        $articles = Article::all();

        // Create comments for each article
        foreach ($articles as $article) {
            foreach ($users as $user) {
                Comment::factory()->create([
                    'post_id' => $article->id,
                    'user_id' => $user->id,
                ]);
            }
        }
    }
}
