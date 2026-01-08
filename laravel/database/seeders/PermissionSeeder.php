<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define all permissions
        $permissions = [
            'users.manage',
            'products.create',
            'products.update',
            'products.delete',
            'category.create',
            'category.update',
            'category.delete',
        ];

        // Create permissions
        foreach ($permissions as $permissionName) {
            Permission::firstOrCreate(['name' => $permissionName]);
        }

        // Assign permissions to roles
        $admin = Role::where('name', 'admin')->first();
        $manager = Role::where('name', 'manager')->first();
        $staff = Role::where('name', 'staff')->first();

        // Admin gets all permissions
        $admin->permissions()->sync(Permission::all());

        // Manager gets product and category management
        $manager->permissions()->sync(
            Permission::whereIn('name', [
                'products.create',
                'products.update',
                'products.delete',
                'category.create',
                'category.update',
                'category.delete',
            ])->get()
        );

        // Staff gets create permissions only
        $staff->permissions()->sync(
            Permission::whereIn('name', [
                'products.create',
                'category.create',
            ])->get()
        );
    }
}
