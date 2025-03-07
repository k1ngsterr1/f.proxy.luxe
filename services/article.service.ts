import {BaseService} from "@/services/base.service";

export class ArticleService extends BaseService {
    async getCategories() {
        const response = await this.http.get('/v1/categories');
        return response.data;
    }

    async getArticles() {
        const response = await this.http.get('/v1/articles');
        return response.data;
    }

    async getArticleByCategory(categorySlug: string) {
        const response = await this.http.get(`/v1/articles?=categorySlug=${categorySlug}`);
        return response.data;
    }
}