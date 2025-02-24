<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,   // Seed users first
            ArticleSeeder::class, // Then seed articles
            CommentSeeder::class, // Finally, seed comments
        ]);
    }
}
