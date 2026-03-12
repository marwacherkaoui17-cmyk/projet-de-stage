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
            ['id' => 1, 'libelle' => 'Tanger-Tétouan-Al Hoceïma'],
            ['id' => 2, 'libelle' => 'Oriental'],
            ['id' => 3, 'libelle' => 'Fès-Meknès'],
            ['id' => 4, 'libelle' => 'Rabat-Salé-Kénitra'],
            ['id' => 5, 'libelle' => 'Béni Mellal-Khénifra'],
            ['id' => 6, 'libelle' => 'Casablanca-Settat'],
            ['id' => 7, 'libelle' => 'Marrakech-Safi'],
            ['id' => 8, 'libelle' => 'Drâa-Tafilalet'],
            ['id' => 9, 'libelle' => 'Souss-Massa'],
            ['id' => 10, 'libelle' => 'Guelmim-Oued Noun'],
            ['id' => 11, 'libelle' => 'Laâyoune-Sakia El Hamra'],
            ['id' => 12, 'libelle' => 'Dakhla-Oued Ed-Dahab'],
        ]);

        // 2. SERVICES
        DB::table('services')->insert([
            ['id' => 1, 'libelle' => 'S.A.G.A.F.S', 'description' => 'Service de l\'Amélioration Génétique des Arbres Forestiers'],
            ['id' => 2, 'libelle' => 'S.T.B.P.F', 'description' => 'Service de Technologie du Bois'],
            ['id' => 3, 'libelle' => 'S.E.B.E.S', 'description' => 'Service d\'Écologie'],
            ['id' => 4, 'libelle' => 'S.I.C.G.F', 'description' => 'Service de l\'Ingénierie'],
        ]);

        // 3. ESSENCES
        DB::table('essences')->insert([
            ['id' => 1, 'nom_essence' => 'Arganier', 'description' => 'Arbre emblématique du sud-ouest marocain.'], 
            ['id' => 2, 'nom_essence' => 'Cèdre', 'description' => 'Essence noble des montagnes de l\'Atlas.'], 
            ['id' => 3, 'nom_essence' => 'Thuya', 'description' => 'Utilisé pour l\'artisanat traditionnel.'], 
            ['id' => 4, 'nom_essence' => 'Pins', 'description' => 'Diverses espèces de pins méditerranéens.'],
        ]);

        // 4. DOMAINES & PROGRAMMES
        DB::table('domaines')->insert([
            ['id' => 1, 'libelle' => 'Recherche Forestière'],
            ['id' => 2, 'libelle' => 'Protection de la Nature'],
        ]);

        DB::table('programmes')->insert([
            ['id' => 1, 'nom_programme' => 'Amélioration Génétique', 'domaine_id' => 1],
            ['id' => 2, 'nom_programme' => 'Lutte contre l\'Erosion', 'domaine_id' => 2],
        ]);

        // 5. PERSONNEL
        DB::table('personnels')->insert([
            ['id' => 1, 'nom' => 'Alami Ahmed', 'email' => 'ahmed.alami@example.com', 'telephone' => '0661223344', 'service_id' => 1],
            ['id' => 2, 'nom' => 'Berrada Fatima', 'email' => 'fatima.berrada@example.com', 'telephone' => '0661556677', 'service_id' => 1],
            ['id' => 3, 'nom' => 'Idrissi Khalid', 'email' => 'khalid.idrissi@example.com', 'telephone' => '0661889900', 'service_id' => 2],
        ]);

        // 6. MISSIONS
        DB::table('missions')->insert([
            [
                'id' => 1,
                'description' => 'Inventaire forestier Azrou',
                'date_debut' => '2026-03-01',
                'date_fin' => '2026-03-10',
                'statut' => 'Validee',
                'service_id' => 1,
                'programme_id' => 1,
            ],
            [
                'id' => 2,
                'description' => 'Collecte de semences Arganier',
                'date_debut' => '2026-03-15',
                'date_fin' => '2026-03-25',
                'statut' => 'En_cours',
                'service_id' => 3,
                'programme_id' => 2,
            ],
        ]);

        // 7. USERS
        DB::table('users')->insert([
            [
                'id_user' => 1,
                'nom' => 'Admin',
                'prenom' => 'ANEF',
                'email' => 'admin@anef.ma',
                'password' => Hash::make('admin1234'),
                'role' => 'admin',
            ],
            [
                'id_user' => 2,
                'nom' => 'Cherkaoui',
                'prenom' => 'Marwa',
                'email' => 'chef@anef.ma',
                'password' => Hash::make('chef1234'),
                'role' => 'chef_service',
            ],
            [
                'id_user' => 3,
                'nom' => 'Agent',
                'prenom' => 'S.A',
                'email' => 'sa@anef.ma',
                'password' => Hash::make('sa1234'),
                'role' => 'section_administratif',
            ],
            [
                'id_user' => 4,
                'nom' => 'Directeur',
                'prenom' => 'ANEF',
                'email' => 'directeur@anef.ma',
                'password' => Hash::make('directeur1234'),
                'role' => 'directeur',
            ]
        ]);
    }
}