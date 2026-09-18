export const isDemoMode = (): boolean => {
  // If NEXT_PUBLIC_DEMO_MODE is explicitly set
  if (process.env.NEXT_PUBLIC_DEMO_MODE === 'true') {
    return true;
  }
  // If Supabase keys are missing
  const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
  const hasKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!hasUrl || !hasKey) {
    // If running in development, allow demo mode
    if (process.env.NODE_ENV !== 'production') {
      return true;
    }
  }
  
  return false;
};

export const isProductionMissingConfig = (): boolean => {
  const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
  const hasKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

  return process.env.NODE_ENV === 'production' && !demoMode && (!hasUrl || !hasKey);
};
