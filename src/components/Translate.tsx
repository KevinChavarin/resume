import { useTranslation } from '../hooks/useTranslation';

interface Props {
  textKey: string;
  fallback?: string;
}

export default function TranslatableText({ textKey, fallback }: Props) {
  const { t } = useTranslation();
  
  return <span>{t[textKey as keyof typeof t] || fallback || textKey}</span>;
}