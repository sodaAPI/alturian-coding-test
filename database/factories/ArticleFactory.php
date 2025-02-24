<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(6), // Random title with 6 words
            'body' => $this->faker->paragraphs(3, true), // Random body with 3 paragraphs
            'image_url' => $this->faker->imageUrl(), // Random image URL
            'author_id' => User::inRandomOrder()->first()->id, // Random user as author
        ];
    }
}
