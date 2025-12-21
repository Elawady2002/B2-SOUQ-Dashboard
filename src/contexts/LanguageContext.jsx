import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import arTranslations from '../locales/ar.json';
import enTranslations from '../locales/en.json';

const LanguageContext = createContext();

const translations = {
    ar: arTranslations,
    en: enTranslations
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        // Get saved language from localStorage or default to Arabic
        return localStorage.getItem('language') || 'ar';
    });

    const isRTL = language === 'ar';

    // Translation function
    const t = useCallback((key) => {
        const keys = key.split('.');
        let value = translations[language];

        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                return key; // Return key if translation not found
            }
        }

        return value || key;
    }, [language]);

    useEffect(() => {
        // Save language to localStorage
        localStorage.setItem('language', language);

        // Update document direction
        document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
        document.documentElement.lang = language;

        // Update body class for any CSS that needs it
        document.body.classList.remove('rtl', 'ltr');
        document.body.classList.add(isRTL ? 'rtl' : 'ltr');
    }, [language, isRTL]);

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
    };

    const switchToArabic = () => setLanguage('ar');
    const switchToEnglish = () => setLanguage('en');

    return (
        <LanguageContext.Provider value={{
            language,
            isRTL,
            t,
            toggleLanguage,
            switchToArabic,
            switchToEnglish,
            setLanguage
        }}>
            {children}
        </LanguageContext.Provider>
    );
}

export default LanguageContext;
