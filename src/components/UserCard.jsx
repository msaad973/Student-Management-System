import React, { useState } from 'react';

export default function UserCard({ user, index }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="bg-white p-4 rounded-xl shadow-md w-full max-w-lg mb-4 relative hover:shadow-lg transition">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-semibold">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="text-sm text-gray-500">{user.phone}</p>
                    <p className="text-sm text-gray-500">{user.dob}</p>
                    <p className="text-sm text-gray-500">{user.gender}</p>
                    <p className="text-sm text-gray-500">{user.year}</p>
                    <p className="text-sm text-gray-500">{user.batch}</p>
                    <p className="text-sm text-gray-500">{user.department}</p>
                    <p className="text-sm text-gray-500">{user.address}</p>
                    <p className="text-sm text-gray-500">{user.cgpa}</p>
                    <p className="text-sm text-gray-500">{user.dues}</p>
                    <p className="text-sm text-gray-500">{user.attendance}</p>
                    
                </div>
                <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl text-gray-600 hover:text-gray-900">⋮</button>
            </div>
            {menuOpen && <UserOptionsMenu index={index} user={user} onClose={() => setMenuOpen(false)} />}
        </div>
    );
}
