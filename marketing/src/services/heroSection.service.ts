import { HeroSectionData } from '@/common/interface';
import api from '@/lib/api';

export interface HeroSectionResponse {
    data: HeroSectionData[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export const heroSectionService = {
    getAllHeroSections: async (params?: {
        page?: number;
        limit?: number;
        search?: string;
    }): Promise<HeroSectionResponse> => {
        const response = await api.get('/hero-section', { params });
        return response.data;
    },

    getHeroSectionById: async (id: number): Promise<{ data: HeroSectionData }> => {
        const response = await api.get(`/hero-section/${id}`);
        return response.data;
    },
};
