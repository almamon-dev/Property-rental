<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Permissions
        $permissions = [
            'users.view',
            'users.create',
            'users.edit',
            'users.delete',
            'categories.view',
            'categories.create',
            'categories.edit',
            'categories.delete',
            'blogs.view',
            'blogs.create',
            'blogs.edit',
            'blogs.delete',
            'roles.view',
            'roles.create',
            'roles.edit',
            'roles.delete',
            'permissions.view',
            'permissions.create',
            'permissions.edit',
            'permissions.delete',
        ];

        foreach ($permissions as $permission) {
            Permission::findOrCreate($permission);
        }

        // Create Roles and Assign Permissions
        $superAdmin = Role::findOrCreate('Super Admin');
        $superAdmin->givePermissionTo(Permission::all());

        $admin = Role::findOrCreate('Admin');
        $admin->givePermissionTo(Permission::all());

        $editor = Role::findOrCreate('Editor');
        $editor->givePermissionTo([
            'blogs.view',
            'blogs.create',
            'blogs.edit',
        ]);

        $user = Role::findOrCreate('User');
    }
}
