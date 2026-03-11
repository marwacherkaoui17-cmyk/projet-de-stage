<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('regions', function (Blueprint $table) {
            $table->id('id_region');
            $table->string('nom_region', 100);
        });

        Schema::create('provinces', function (Blueprint $table) {
            $table->id('id_province');
            $table->string('nom_province', 100);
            $table->foreignId('id_region')->constrained('regions', 'id_region')->onDelete('cascade');
        });

        Schema::create('services', function (Blueprint $table) {
            $table->id('id_service');
            $table->string('nom_service', 150);
            $table->text('description')->nullable();
        });

        Schema::create('essences', function (Blueprint $table) {
            $table->id('id_essence');
            $table->string('nom_essence', 150);
            $table->text('description')->nullable();
        });

        Schema::create('domaine_recherches', function (Blueprint $table) {
            $table->id('id_domaine');
            $table->string('nom_domaine', 150);
            $table->text('description')->nullable();
            $table->foreignId('id_service')->nullable()->constrained('services', 'id_service');
        });

        Schema::create('programme_recherches', function (Blueprint $table) {
            $table->id('id_programme');
            $table->string('nom_programme', 150);
            $table->text('description')->nullable();
            $table->foreignId('id_domaine')->nullable()->constrained('domaine_recherches', 'id_domaine');
            $table->foreignId('id_service')->nullable()->constrained('services', 'id_service');
        });

        Schema::create('personnels', function (Blueprint $table) {
            $table->id('id_personnel');
            $table->string('nom', 100);
            $table->string('prenom', 100);
            $table->string('email', 150)->unique()->nullable();
            $table->string('telephone', 20)->nullable();
            $table->foreignId('id_service')->constrained('services', 'id_service');
            $table->foreignId('id_province')->nullable()->constrained('provinces', 'id_province');
        });

        Schema::create('missions', function (Blueprint $table) {
            $table->id('id_mission');
            $table->string('titre', 200);
            $table->text('description')->nullable();
            $table->date('date_debut')->nullable();
            $table->date('date_fin')->nullable();
            $table->enum('statut', ['En_Cours', 'Validee', 'Annulee'])->default('En_Cours');
            $table->foreignId('id_service')->constrained('services', 'id_service');
            $table->foreignId('id_province')->nullable()->constrained('provinces', 'id_province');
            $table->foreignId('id_programme')->nullable()->constrained('programme_recherches', 'id_programme');
            $table->foreignId('id_domaine')->nullable()->constrained('domaine_recherches', 'id_domaine');
            // Tss7i7 hna: id_user machi id
            $table->foreignId('id_chef')->nullable()->constrained('users', 'id_user');
            $table->timestamps();
        });

        Schema::create('mission_personnel', function (Blueprint $table) {
            $table->foreignId('id_mission')->constrained('missions', 'id_mission')->onDelete('cascade');
            $table->foreignId('id_personnel')->constrained('personnels', 'id_personnel')->onDelete('cascade');
            $table->primary(['id_mission', 'id_personnel']);
        });

        Schema::create('mission_essence', function (Blueprint $table) {
            $table->foreignId('id_mission')->constrained('missions', 'id_mission')->onDelete('cascade');
            $table->foreignId('id_essence')->constrained('essences', 'id_essence')->onDelete('cascade');
            $table->primary(['id_mission', 'id_essence']);
        });

        Schema::create('historiques', function (Blueprint $table) {
            $table->id('id_historique');
            $table->string('table_concernee', 100);
            $table->integer('id_enregistrement');
            $table->enum('action', ['INSERT', 'UPDATE', 'DELETE']);
            $table->text('ancienne_valeur')->nullable();
            $table->text('nouvelle_valeur')->nullable();
            // Tss7i7 hna: id_user machi id
            $table->foreignId('id_user')->nullable()->constrained('users', 'id_user');
            $table->timestamp('date_action')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('historiques');
        Schema::dropIfExists('mission_essence');
        Schema::dropIfExists('mission_personnel');
        Schema::dropIfExists('missions');
        Schema::dropIfExists('personnels');
        Schema::dropIfExists('programme_recherches');
        Schema::dropIfExists('domaine_recherches');
        Schema::dropIfExists('essences');
        Schema::dropIfExists('services');
        Schema::dropIfExists('provinces');
        Schema::dropIfExists('regions');
    }
};