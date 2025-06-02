import React from 'react';
import { useLocation } from 'react-router-dom';

export default function EditUserPage() {
    const { state } = useLocation();
    const user = state?.user;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Edit User</h2>
            <input defaultValue={user?.name} className="block mb-2 p-2 border rounded" />
            <input defaultValue={user?.email} className="block mb-2 p-2 border rounded" />
            <input defaultValue={user?.phone} className="block mb-2 p-2 border rounded" />
            <input defaultValue={user?.dob} className="block mb-2 p-2 border rounded" />
            <input defaultValue={user?.gender} className="block mb-2 p-2 border rounded" />
            <input defaultValue={user?.year} className="block mb-2 p-2 border rounded" />
            <input defaultValue={user?.batch} className="block mb-2 p-2 border rounded" />
            <input defaultValue={user?.department} className="block mb-2 p-2 border rounded" />
            <input defaultValue={user?.address} className="block mb-2 p-2 border rounded" />
            <input defaultValue={user?.cgpa} className="block mb-2 p-2 border rounded" />
            <input defaultValue={user?.dues} className="block mb-2 p-2 border rounded" />
            <input defaultValue={user?.attendance} className="block mb-2 p-2 border rounded" />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
            
        </div>
    );
}
