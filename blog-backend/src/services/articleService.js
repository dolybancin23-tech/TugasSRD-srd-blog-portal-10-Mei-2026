// src/services/articleService.js
import * as articleRepository from '../repositories/articleRepository.js';

export const fetchAllArticles = async () => {
  return await articleRepository.getAllArticles();
};

export const fetchArticleById = async (id) => {
  return await articleRepository.getArticleById(id);
};

export const addArticle = async (articleData, penulisId) => {
  return await articleRepository.createArticle(articleData, penulisId);
};