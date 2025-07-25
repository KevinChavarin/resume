import { useTranslation } from '../hooks/useTranslation';

interface TranslateProps {
  textKey: string;
  fallback?: string;
}

export default function Translate({ textKey, fallback = textKey }: TranslateProps) {
  const { t } = useTranslation();

  // Función para obtener valor anidado usando dot notation
  const getNestedValue = (obj: any, path: string): string => {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : null;
    }, obj) || fallback;
  };

  const translatedText = getNestedValue(t, textKey);

  return <>{translatedText}</>;
}