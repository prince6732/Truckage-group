import { TemplateData } from '@/common/interface';
import api from '@/lib/api';

export interface TemplatesResponse {
    data: TemplateData[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export const templatesService = {
    getAllTemplates: async (params?: {
        page?: number;
        limit?: number;
        search?: string;
    }): Promise<TemplatesResponse> => {
        const response = await api.get('/templates', { params });
        return response.data;
    },

    getTemplateById: async (id: number): Promise<{ data: TemplateData }> => {
        const response = await api.get(`/templates/${id}`);
        return response.data;
    },
};
