import Joi from "joi";

// Define TypeScript interface for a Location
export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

// Joi schema for validation
export const locationSchema = Joi.object<Location>({
  id: Joi.number().integer().required(),
  name: Joi.string().required(),
  type: Joi.string().required(),
  dimension: Joi.string().required(),
  residents: Joi.array().items(Joi.string().uri()).required(),
  url: Joi.string().uri().required(),
  created: Joi.string().isoDate().required(),
});
