<?php

namespace Database\Factories;

use App\Models\Article;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'body' => $this->faker->sentence(10), // Random comment with 10 words
            'post_id' => Article::inRandomOrder()->first()->id, // Random article
            'user_id' => User::inRandomOrder()->first()->id, // Random user
        ];
    }
}
