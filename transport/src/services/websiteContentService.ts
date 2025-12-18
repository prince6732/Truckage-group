import axios from "@/utils/axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3080/api';


export const websiteContentService = {
  async getContentBySection(section: string) {
    return await axios.get(`/website-content/${section}`);
  },

  async update(data: any) {
    return await axios.post(`/website-content/update`, data);
  },

  async bulkUpdate(section: string, data: any) {
    return await axios.post(`/website-content/bulk-update`, { section, data });
  },
  getEditMode: async () => {
    return axios.get("/settings/edit-mode");
  }
};



