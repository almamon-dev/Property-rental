# Role and Permission Implementation Documentation

## 1. Overview
The project uses the **Spatie Laravel Permission** package to manage user roles and permissions.

- **Package Name:** `spatie/laravel-permission`
- **Version:** `^6.24`
- **Documentation:** [Spatie Documentation](https://spatie.be/docs/laravel-permission/v6/introduction)

## 2. Configuration

### User Model Integration
The `User` model (`app/Models/User.php`) uses the `HasRoles` trait:

```php
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory, HasRoles, Notifiable;
}
```

## 3. Roles and Permissions Structure

The system is seeded with the following Roles and Permissions (found in `database/seeders/RolePermissionSeeder.php`).

### Defined Roles
1.  **Super Admin**: Has all permissions.
2.  **Admin**: Has all permissions.
3.  **Editor**: Has restricted permissions (mostly Blog related).
4.  **User**: Standard user with no specific administration permissions by default.

### Defined Permissions
The system uses a `resource.action` naming convention.

- **Users Management**: `users.view`, `users.create`, `users.edit`, `users.delete`
- **Category Management**: `categories.view`, `categories.create`, `categories.edit`, `categories.delete`
- **Blog Management**: `blogs.view`, `blogs.create`, `blogs.edit`, `blogs.delete`
- **Role Management**: `roles.view`, `roles.create`, `roles.edit`, `roles.delete`
- **Permission Management**: `permissions.view`, `permissions.create`, `permissions.edit`, `permissions.delete`

## 4. Usage Examples

### Seeding Logic
The `RolePermissionSeeder` creates these roles and permissions first. Then, `UserSeeder` assigns them to users.

```php
// Creating Roles & Permissions (RolePermissionSeeder.php)
Permission::findOrCreate('blogs.create');
$editor = Role::findOrCreate('Editor');
$editor->givePermissionTo(['blogs.view', 'blogs.create', 'blogs.edit']);

// Assigning to Users (UserSeeder.php)
$user->assignRole('Admin');
```

### Checking Permissions in Code
You can check for permissions in your Controllers or Blade/Inertia views.

```php
// Check if user can edit blogs
if ($user->can('blogs.edit')) {
    // Show edit button
}

// Check role directly
if ($user->hasRole('Super Admin')) {
    // Grant full access
}
```

### Blade Directive Example
```blade
@can('blogs.create')
  <button>Create Blog</button>
@endcan
```

## 5. Metadata
- **Date Created:** 2025-02-01
- **File Location:** `ROLE_PERMISSION_IMPLEMENTATION.md`
- **Source Files:**
    - `app/Models/User.php`
    - `database/seeders/RolePermissionSeeder.php`
    - `database/seeders/UserSeeder.php`
