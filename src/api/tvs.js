import { tvapi } from './api';

import {
  TV_API_CATEGORIES,
  TV_API_CATEGORY,
  TV_API_CATEGORY_PROGRAM,
  TV_API_CATEGORY_PROGRAM_CHAPTERS,
  TV_API_CATEGORY_PROGRAM_PLAYLIST,
} from '../config';

export const getTVs = () => {
  return tvapi.get(TV_API_CATEGORIES);
};

export const getTVCategory = (category_id) => {
  return tvapi.get(`${TV_API_CATEGORY}/${category_id}/`);
};

export const getTVCategoryProgram = (category_id, program_id) => {
  return tvapi.get(`${TV_API_CATEGORY_PROGRAM}/${program_id}/`);
};

export const getTVCategoryProgramPlaylist = (
  category_id,
  program_id,
  playlist_id,
) => {
  return tvapi.get(`${TV_API_CATEGORY_PROGRAM_PLAYLIST}/${playlist_id}/`);
};

export const getTVCategoryProgramPlaylistChapters = (
  category_id,
  program_id,
  playlist_id,
) => {
  return tvapi.get(`${TV_API_CATEGORY_PROGRAM_PLAYLIST}/${playlist_id}/`);
};
