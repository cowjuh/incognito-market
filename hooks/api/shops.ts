import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ShopWithRelations } from 'pages/api/shop';

export const useShop = (id: string) => {
  return useQuery({
    queryKey: ['shop', id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/shop?id=${id}`);
      return data;
    },
    enabled: !!id,
  });
};

export const useUpdateShop = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<ShopWithRelations> & { id: string }) => {
      const { data: responseData } = await axios.put('/api/shop', { id, ...data });
      return responseData;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['shop', data.id] });
    },
  });
};

export const useCreateShop = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: Partial<ShopWithRelations>) => {
      if (!data.ownerId) {
        throw new Error('Owner ID is required to create a shop');
      }
      const { data: responseData } = await axios.post('/api/shop', data);
      return responseData;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['shops'] });
      queryClient.setQueryData(['shop', data.id], data);
    },
  });
};