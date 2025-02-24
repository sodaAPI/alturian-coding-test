<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\User;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all users
        $users = User::all();

        // Create articles for each user
        foreach ($users as $user) {
            Article::factory(3)->create([ // Each user gets 3 articles
                'author_id' => $user->id,
            ]);
        }
    }
}
