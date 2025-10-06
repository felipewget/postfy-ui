import { headers } from 'next/headers';

export const getSubdomain = async (): Promise<string|null> => {
  const host = (await headers()).get('host') || '';
  const subdomain = host.split('.')[0];

  if(subdomain === 'localhost:3000') return null; // @TODO update it to env

  const envDomain = ('localhost:3000' as string).split('.')[0];

  if(subdomain === envDomain){
    return null;
  }

  return subdomain;
}

export const getSubdomainOrFail = async (): Promise<string> => {
    const subdomain = await getSubdomain();
  
    if(!subdomain){
        throw new Error('Sudomain not found');
    }

    return subdomain;
}
