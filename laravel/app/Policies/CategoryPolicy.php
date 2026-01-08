<?php

namespace App\Policies;

use App\Models\Category;
use App\Models\User;

class CategoryPolicy
{
    /**
     * Determine whether the user can view any categories.
     */
    public function viewAny(User $user): bool
    {
        return true; // All authenticated users can view categories
    }

    /**
     * Determine whether the user can view the category.
     */
    public function view(User $user, Category $category): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }
        if ($user->hasRole('manager')) {
            return $category->created_by === $user->id;
        }
        if ($user->hasRole('staff')) {
            return false; // Staff cannot view categories individually
        }
        return false;
    }

    /**
     * Determine whether the user can create categories.
     */
    public function create(User $user): bool
    {
        return $user->can('categories.create');
    }

    /**
     * Determine whether the user can update the category.
     */
    public function update(User $user, Category $category): bool
    {
        return $user->can('categories.update');
    }

    /**
     * Determine whether the user can delete the category.
     */
    public function delete(User $user, Category $category): bool
    {
        return $user->can('categories.delete');
    }
}
