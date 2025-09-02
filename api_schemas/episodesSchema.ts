import Joi from "joi";

// Define TypeScript interface for a Location
export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

// Joi schema for validation
export const episodesSchema = Joi.object<Episode>({
  id: Joi.number().integer().required(),
  name: Joi.string().required(),
  air_date: Joi.string().required(),
  episode: Joi.string().required(),
  characters: Joi.array().items(Joi.string().uri()).required(),
  url: Joi.string().uri().required(),
  created: Joi.string().isoDate().required(),
});
