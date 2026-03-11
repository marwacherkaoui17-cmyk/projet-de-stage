import React from 'react';
import { usePage } from '@inertiajs/react';

export default function Create() {
    // Get regions from props sent by Controller
    const { regions } = usePage().props;

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Nouvelle Mission</h1>
            
            <div className="mb-4">
                <label className="block mb-2">Sélectionner une Région :</label>
                <select className="border p-2 rounded w-full">
                    <option value="">-- Choisir une région --</option>
                    {regions.map((region) => (
                        <option key={region.id_region} value={region.id_region}>
                            {region.nom_region}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}