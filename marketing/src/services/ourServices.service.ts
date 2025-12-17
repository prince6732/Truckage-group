import { OurServiceData } from '@/common/interface';
import api from '@/lib/api';

console.log('API Base URL:', api.defaults.baseURL);

export interface OurServiceResponse {
    data: OurServiceData[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export const ourServiceService = {
    getAllOurServices: async (params?: {
        page?: number;
        limit?: number;
        search?: string;
    }): Promise<OurServiceResponse> => {
        const response = await api.get('/our-services', { params });
        return response.data;
    },

    getOurServiceById: async (id: number): Promise<{ data: OurServiceData }> => {
        const response = await api.get(`/our-services/${id}`);
        return response.data;
    },
};
