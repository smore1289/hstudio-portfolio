import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure, SINGLETONS} from './structure'

export default defineConfig({
  name: 'default',
  title: 'H.Studio Portfolio',

  projectId: 'r5tpzjtn',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({schemaType}) => !SINGLETONS.includes(schemaType)),
  },

  document: {
    actions: (input, {schemaType}) =>
      SINGLETONS.includes(schemaType)
        ? input.filter(({action}) => action !== 'duplicate' && action !== 'delete' && action !== 'unpublish')
        : input,
    newDocumentOptions: (prev, {creationContext}) =>
      creationContext.type === 'global'
        ? prev.filter((t) => !SINGLETONS.includes(t.templateId))
        : prev,
  },
})
