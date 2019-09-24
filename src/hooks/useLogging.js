import { useEffect } from 'react';

export default function useLogging(data) {
  useEffect(() => {
    console.log(data);
  }, [data]);
}
