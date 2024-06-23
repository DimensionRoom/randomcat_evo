import { useEffect, useState } from 'react';
import axios from 'axios';

interface MetricValue {
  value: string;
}

interface Row {
  metricValues: MetricValue[];
}

interface Data {
  rows?: Row[];
  error?: string;
}

const TotalUsers = () => {
  const [totalUsers, setTotalUsers] = useState<number>(0);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await axios.get<Data>('https://www.googleapis.com/auth/analytics.readonly');
        const data = response.data;
        if (data.rows && data.rows.length > 0) {
          setTotalUsers(parseInt(data.rows[0].metricValues[0].value, 10));
        }
      } catch (error) {
        console.error('Failed to fetch total users', error);
      }
    };

    fetchTotalUsers();
  }, []);

  return (
    <div>
      <h1>Total Users</h1>
      <p>{totalUsers}</p>
    </div>
  );
};

export default TotalUsers;