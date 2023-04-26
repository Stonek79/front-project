import { Project } from 'ts-morph'

const project = new Project({})

project.addSourceFilesAtPaths('src/**/*.ts')
project.addSourceFilesAtPaths('src/**/*.tsx')

const files = project.getSourceFiles()
const layers = ['app', 'pages', 'widgets', 'features', 'entities', 'shared']

const isAbsolute = (path: string) => layers.some((layer) => path.startsWith(layer))

files.forEach((sourceFile) => {
    const importDeclarations = sourceFile.getImportDeclarations();
    importDeclarations.forEach((importDeclaration) => {
        const value = importDeclaration.getModuleSpecifierValue()

        if (isAbsolute(value)) {
            importDeclaration.setModuleSpecifier(`@/${value}`)
        }
    })
})

project.save()
