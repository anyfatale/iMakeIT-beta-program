import React, { createContext, useContext, useState, useEffect } from 'react';

interface DataContextType {
  saveData: (key: string, data: any) => void;
  loadData: (key: string) => any;
  clearData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const saveData = (key: string, data: any) => {
    try {
      localStorage.setItem(`iMakeIt_${key}`, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  };

  const loadData = (key: string) => {
    try {
      const data = localStorage.getItem(`iMakeIt_${key}`);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load data:', error);
      return null;
    }
  };

  const clearData = () => {
    try {
      const keys = Object.keys(localStorage).filter(key => key.startsWith('iMakeIt_'));
      keys.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error('Failed to clear data:', error);
    }
  };

  return (
    <DataContext.Provider value={{ saveData, loadData, clearData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};