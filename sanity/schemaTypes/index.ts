import { type SchemaTypeDefinition } from 'sanity'
import { Category } from './category'
import { SpecialMenu } from './specialmenu'
import orders from './order'
import food from './food'
import recipe from './recipe'
import { Chef } from './chef'
import feedback from './feedback'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [SpecialMenu, Chef, food, Category, recipe, orders, feedback],
}
