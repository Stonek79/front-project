import path from 'path'
import { Project } from 'ts-morph'

const project = new Project({})

project.addSourceFilesAtPaths('src/**/*.ts')
project.addSourceFilesAtPaths('src/**/*.tsx')

const layers = ['app', 'pages', 'widgets', 'features', 'entities', 'shared']
const uiPath = path.resolve(__dirname, '../../src/shared/ui')

const isAbsolute = (path: string) =>
    layers.some((layer) => path.startsWith(layer))
const files = project.getSourceFiles()
const getUiDir = project.getDirectory(uiPath)
const componentsDirs = getUiDir?.getDirectories()

componentsDirs?.forEach((directory) => {
    const indexFilePath = `${directory.getPath()}/index.ts`
    const hasIndexFile = directory.getSourceFile(indexFilePath)

    if (!hasIndexFile) {
        const sourceCode = `export * from './${directory.getBaseName()}'\n`
        const file = directory.createSourceFile(indexFilePath, sourceCode, {
            overwrite: true,
        })

        file.save()
    }
})

files.forEach((sourceFile) => {
    const importDeclarations = sourceFile.getImportDeclarations()
    importDeclarations.forEach((importDeclaration) => {
        const value = importDeclaration.getModuleSpecifierValue()
        const valueWithoutAlias = value.replace('@/', '')
        const segments = valueWithoutAlias.split('/')

        const hasSharedLayer = segments?.[0] === 'shared'
        const hasUiDir = segments?.[1] === 'ui'

        if (isAbsolute(valueWithoutAlias) && hasSharedLayer && hasUiDir) {
            const resultPath = valueWithoutAlias
                .split('/')
                .slice(0, 3)
                .join('/')
            importDeclaration.setModuleSpecifier(`@/${resultPath}`)
        }
    })
})

project.save()
