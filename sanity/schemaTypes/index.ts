import { type SchemaTypeDefinition } from 'sanity'
import { Chief } from './chief'
import { Category } from './category'
import { Recipe } from './recipe'
import { SpecialMenu } from './specialmenu'
import orders from './order'
import food from './food'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [SpecialMenu, Chief, food, Category, Recipe, orders],
}
