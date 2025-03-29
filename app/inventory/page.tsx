"use client";
import { DataTable } from "@/components/data-table-inventory";
import { useState, useEffect } from "react";
import Cookies from "js-cookie"; // Recomiendo usar js-cookie para manejar cookies

export default function TeamPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Obtener el token de las cookies
        const token = Cookies.get('token');

        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch('http://192.168.18.180:8000/api/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Asegúrate de usar el formato correcto para Sanctum
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        
        // Transformar los datos si es necesario
        // Sanctum devuelve los usuarios en data.data
        setUsers(data.data);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Manejo de estados de carga y error
  if (isLoading) {
    return <div></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <DataTable data={users} />
        </div>
      </div>
    </div>
  );
}