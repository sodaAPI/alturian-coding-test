<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $user = User::create($request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'password' => 'required|min:8',
            'password_confirmation' => 'required|same:password',

        ]));
        return response()->json(['message' => 'User created successfully', 'user' => $user], 201);
    }

    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
            'remember' => 'boolean',
        ]);

        $credentials = [
            'email' => $fields['email'],
            'password' => $fields['password'],
        ];
        if (!Auth::attempt($credentials, $fields['remember'])) {
            throw ValidationException::withMessages([
                'email' => 'Invalid email or password',
            ]);
        }

        session()->regenerate();
        return response()->json([
            'message' => 'Successfuly Logged in',
            'user' => Auth::user()
        ]);
    }

    public function logout()
    {
        Auth::guard('web')->logout();
        return response()->json(['status' => '204', 'message' => 'Sucessfuly Logout']);
    }
}
