'use client';

import React, { createContext, useContext } from 'react';
import { Locale } from './config';
import { Dictionary } from './dictionaries';

interface DictionaryContextValue {
  locale: Locale;
  dict: Dictionary;
}

const DictionaryContext = createContext<DictionaryContextValue | null>(null);

export function DictionaryProvider({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  children: React.ReactNode;
}) {
  return (
    <DictionaryContext.Provider value={{ locale, dict }}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDictionary(): Dictionary {
  const context = useContext(DictionaryContext);
  if (!context) {
    throw new Error('useDictionary must be used within a DictionaryProvider');
  }
  return context.dict;
}

export function useCurrentLocale(): Locale {
  const context = useContext(DictionaryContext);
  if (!context) {
    throw new Error('useCurrentLocale must be used within a DictionaryProvider');
  }
  return context.locale;
}
