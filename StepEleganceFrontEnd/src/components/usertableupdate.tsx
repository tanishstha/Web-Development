import React, { useState } from 'react';

interface TableRow {
    id: number;
    role: string;
    firstName: string;
    lastName: string;
    phone: number;
    email: string;
    password: string;
    gender: string;
    dateOfBirth: Date;
}

interface UserTableProps {
    data: TableRow[];
}

const calculateAge = (dateOfBirth: Date): number => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
};
const Usertableupdate: React.FC<UserTableProps> = ({ data }) => {
    const [editableUser, setEditableUser] = useState<TableRow | null>(null);
    const [tableData, setTableData] = useState(data);

    const handleEditUser = (user: TableRow) => {
        setEditableUser(user);
    };

    const handleDeleteUser = (userId: number) => {
        // Implement logic to delete the user
        const updatedData = tableData.filter(user => user.id !== userId);
        setTableData(updatedData);
    };

    const handleSaveEdit = () => {
        // Implement logic to save edited user details to backend or update state
        setEditableUser(null);
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Gender</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row) => (
                        <tr key={row.id}>
                            <td>{row.id}</td>
                            <td>{row.firstName}</td>
                            <td>{row.lastName}</td>
                            <td>{row.phone}</td>
                            <td>{row.gender}</td>
                            <td>{row.email}</td>
                            <td>{calculateAge(row.dateOfBirth)}</td>
                            <td>
                                <button onClick={() => handleEditUser(row)}>Edit</button>
                                <button onClick={() => handleDeleteUser(row.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editableUser && (
                <div>
                    <h2>Edit User</h2>
                    <label>First Name:</label>
                    <input
                        type="text"
                        value={editableUser.firstName}
                        onChange={(e) => setEditableUser({ ...editableUser, firstName: e.target.value })}
                    />
                    {/* Add other input fields as needed */}
                    <button onClick={handleSaveEdit}>Save</button>
                </div>
            )}
        </div>
    );
};

export default Usertableupdate;