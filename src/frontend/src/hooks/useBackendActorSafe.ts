import { useInternetIdentity } from './useInternetIdentity';
import { useQuery } from '@tanstack/react-query';
import { type backendInterface } from '../backend';
import { createActorWithConfig } from '../config';
import { getSecretParameter } from '../utils/urlParams';

const SAFE_ACTOR_QUERY_KEY = 'safe-actor';

export function useBackendActorSafe() {
  const { identity } = useInternetIdentity();

  const actorQuery = useQuery<backendInterface>({
    queryKey: [SAFE_ACTOR_QUERY_KEY, identity?.getPrincipal().toString()],
    queryFn: async () => {
      const isAuthenticated = !!identity;

      if (!isAuthenticated) {
        // Return anonymous actor if not authenticated
        console.log('[SafeActor] Creating anonymous actor');
        return await createActorWithConfig();
      }

      const actorOptions = {
        agentOptions: {
          identity
        }
      };

      const actor = await createActorWithConfig(actorOptions);
      
      // Only attempt initialization if caffeineAdminToken is present
      const adminToken = getSecretParameter('caffeineAdminToken') || '';
      
      if (adminToken && adminToken.trim() !== '') {
        try {
          console.log('[SafeActor] Attempting access control initialization');
          await actor._initializeAccessControlWithSecret(adminToken);
          console.log('[SafeActor] Access control initialized successfully');
        } catch (error) {
          // Non-fatal: log but don't throw
          console.warn('[SafeActor] Access control initialization failed (non-fatal):', error);
        }
      } else {
        console.log('[SafeActor] Skipping access control initialization (no token)');
      }

      return actor;
    },
    staleTime: Infinity,
    enabled: true,
    retry: 1
  });

  return {
    actor: actorQuery.data || null,
    isFetching: actorQuery.isFetching,
    isError: actorQuery.isError,
    error: actorQuery.error
  };
}
