<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. REGIONS
        DB::table('regions')->insert([
            ['id_region' => 1, 'nom_region' => 'Tanger-Tétouan-Al Hoceïma'],
            ['id_region' => 2, 'nom_region' => 'Oriental'],
            ['id_region' => 3, 'nom_region' => 'Fès-Meknès'],
            ['id_region' => 4, 'nom_region' => 'Rabat-Salé-Kénitra'],
            ['id_region' => 5, 'nom_region' => 'Béni Mellal-Khénifra'],
            ['id_region' => 6, 'nom_region' => 'Casablanca-Settat'],
            ['id_region' => 7, 'nom_region' => 'Marrakech-Safi'],
            ['id_region' => 8, 'nom_region' => 'Drâa-Tafilalet'],
            ['id_region' => 9, 'nom_region' => 'Souss-Massa'],
            ['id_region' => 10, 'nom_region' => 'Guelmim-Oued Noun'],
            ['id_region' => 11, 'nom_region' => 'Laâyoune-Sakia El Hamra'],
            ['id_region' => 12, 'nom_region' => 'Dakhla-Oued Ed-Dahab'],
        ]);

        // 2. SERVICES
        DB::table('services')->insert([
            ['id_service' => 1, 'nom_service' => 'S.A.G.A.F.S', 'description' => 'Service de l\'Amélioration Génétique des Arbres Forestiers'],
            ['id_service' => 2, 'nom_service' => 'S.T.B.P.F', 'description' => 'Service de Technologie du Bois'],
            ['id_service' => 3, 'nom_service' => 'S.E.B.E.S', 'description' => 'Service d\'Écologie'],
            ['id_service' => 4, 'nom_service' => 'S.I.C.G.F', 'description' => 'Service de l\'Ingénierie'],
        ]);

        // 3. ESSENCES
        DB::table('essences')->insert([
            ['nom_essence' => 'Arganier'], ['nom_essence' => 'Cèdre'], ['nom_essence' => 'Thuya'], ['nom_essence' => 'Pins'],
        ]);

        // 4. USERS (Tss7i7: nom, prenom, o role)
        DB::table('users')->insert([
            [
                'nom' => 'Admin',
                'prenom' => 'ANEF',
                'email' => 'admin@anef.ma',
                'password' => Hash::make('admin1234'),
                'role' => 'Admin',
            ],
            [
                'nom' => 'Cherkaoui',
                'prenom' => 'Marwa',
                'email' => 'marwa@anef.ma',
                'password' => Hash::make('chef1234'),
                'role' => 'Chef_Service',
            ]
        ]);
    }
}