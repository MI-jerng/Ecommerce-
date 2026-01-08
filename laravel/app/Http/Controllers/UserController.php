<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Get all users (admin only).
     */
    public function index()
    {
        abort_unless(auth()->user()->can('users.manage'), 403);

        $users = User::with('roles')->get();
        return response()->json($users);
    }

    /**
     * Update user role (admin only).
     */
    public function updateRole(Request $request, User $user)
    {
        abort_unless(auth()->user()->can('users.manage'), 403);

        $request->validate([
            'role' => 'required|string|in:admin,manager,staff',
        ]);

        $role = \App\Models\Role::where('name', $request->role)->first();
        if (!$role) {
            return response()->json(['message' => 'Role not found'], 404);
        }

        $user->roles()->sync([$role->id]);
        return response()->json(['message' => 'User role updated']);
    }
}
