import { useState, useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';

export function useSecurePassword() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const savePassword = useCallback(async (key: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const safeKey = key.replace(/[^a-zA-Z0-9._-]/g, '_');
      await SecureStore.setItemAsync(safeKey, password);
      return true;
    } catch (err) {
      setError('Falha ao salvar a senha.');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const getPassword = useCallback(async (key: string): Promise<string | null> => {
    setLoading(true);
    setError(null);
    try {
      const safeKey = key.replace(/[^a-zA-Z0-9._-]/g, '_');
      return await SecureStore.getItemAsync(safeKey);
    } catch (err) {
      setError('Falha ao buscar a senha.');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deletePassword = useCallback(async (key: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const safeKey = key.replace(/[^a-zA-Z0-9._-]/g, '_');
      await SecureStore.deleteItemAsync(safeKey);
      return true;
    } catch (err) {
      setError('Falha ao remover a senha.');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    savePassword,
    getPassword,
    deletePassword,
    loading,
    error,
  };
}

