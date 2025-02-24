<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArticlesTable extends Migration
{
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id(); // Primary key (unsignedBigInteger by default)
            $table->string('title');
            $table->text('body');
            $table->text('image_url')->nullable();
            $table->foreignId('author_id')->constrained('users')->onDelete('cascade'); // Ensure this matches the `id` column in `users`
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
}
