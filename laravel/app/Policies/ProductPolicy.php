<?php

namespace App\Policies;

use App\Models\Product;
use App\Models\User;

class ProductPolicy
{
    /**
     * Determine whether the user can view any products.
     */
    public function viewAny(User $user): bool
    {
        return true; // All authenticated users can view products list
    }

    /**
     * Determine whether the user can view the product.
     */
    public function view(User $user, Product $product): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }
        if ($user->hasRole('manager')) {
            return $product->category->created_by === $user->id;
        }
        if ($user->hasRole('staff')) {
            return $product->created_by === $user->id;
        }
        return false;
    }

    /**
     * Determine whether the user can create products.
     */
    public function create(User $user): bool
    {
        return $user->can('products.create');
    }

    /**
     * Determine whether the user can update the product.
     */
    public function update(User $user, Product $product): bool
    {
        return $user->can('products.update') && $this->view($user, $product);
    }

    /**
     * Determine whether the user can delete the product.
     */
    public function delete(User $user, Product $product): bool
    {
        return $user->can('products.delete') && $this->view($user, $product);
    }
}
