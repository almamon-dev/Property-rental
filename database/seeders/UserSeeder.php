<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Add Admin User
        $admin = \App\Models\User::firstOrCreate(
            ['email' => 'admin@gmail.com'],
            [
                'name' => 'Admin User',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
            ]
        );
        $admin->assignRole('Admin');

        // Add 5 Specific Test Users (user1@gmail.com to user5@gmail.com)
        foreach (range(1, 5) as $i) {
            $user = \App\Models\User::firstOrCreate(
                ['email' => "user{$i}@gmail.com"],
                [
                    'name' => "User {$i}",
                    'password' => \Illuminate\Support\Facades\Hash::make('password'),
                ]
            );
            $user->assignRole('User');
        }
    }
}
