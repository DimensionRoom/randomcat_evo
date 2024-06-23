import { useState, useEffect } from 'react';
import { sql } from "@vercel/postgres";

export interface User {
  id: number;
  ip: string;
}

export function useFetchUserData() {
  const [userData, setUserData] = useState<User[]>([]);
  const [loadingUserData, setLoadingUserData] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { rows } = await sql`SELECT * FROM visit_user`;
        setUserData(rows as User[]); // Type assertion here
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoadingUserData(false);
      }
    }
    fetchData();
  }, []);

  return { userData, loadingUserData };
}