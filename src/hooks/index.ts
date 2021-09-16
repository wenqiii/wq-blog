import { useSelector } from 'umi';

export function useLoading(type: string) {
  const loadingEffects = useSelector((store) => store.loading.effects);
  return !!loadingEffects[type];
}
