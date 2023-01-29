import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import type { User } from '../../../../../shared/types';
import { axiosInstance, getJWTHeader } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import {
  clearStoredUser,
  getStoredUser,
  setStoredUser,
} from '../../../user-storage';

async function getUser(user: User | null): Promise<User | null> {
  if (!user) return null;
  const { data }: AxiosResponse<{ user: User }> = await axiosInstance.get(
    `/user/${user.id}`,
    {
      headers: getJWTHeader(user),
    },
  );
  return data.user;
}

interface UseUser {
  user: User | null;
  updateUser: (user: User) => void;
  clearUser: () => void;
}

export function useUser(): UseUser {
  const queryClient = useQueryClient();

  // TODO: call useQuery to update user data from server
  const [user, setUser] = useState<User | null>(getStoredUser());

  useQuery(queryKeys.user, () => getUser(user), {
    enabled: !!user,
    onSuccess: (data) => setUser(data),
  });

  function updateUser(newUser: User): void {
    // update the user
    queryClient.setQueryData(queryKeys.user, newUser);
    setStoredUser(newUser);
  }

  // meant to be called from useAuth
  function clearUser() {
    // reset user to null
    setUser(null);
    // remove user appointments query
    clearStoredUser();
    queryClient.setQueryData(queryKeys.user, null);
    queryClient.removeQueries([queryKeys.appointments, queryKeys.user]);
  }

  return { user, updateUser, clearUser };
}
