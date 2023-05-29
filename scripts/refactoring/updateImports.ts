import { Project } from 'ts-morph'

const project = new Project({})

project.addSourceFilesAtPaths('src/**/*.ts')
project.addSourceFilesAtPaths('src/**/*.tsx')

const files = project.getSourceFiles()
const layers = ['app', 'pages', 'widgets', 'features', 'entities', 'shared']
const layerSrc = ['src/shared'];

const isAbsoluteSrc = (value: string) => layerSrc.some((layer) => value.startsWith(layer))

const isAbsolute = (path: string) => layers.some((layer) => path.startsWith(layer))

files.forEach((sourceFile) => {
    const importDeclarations = sourceFile.getImportDeclarations();
    importDeclarations.forEach((importDeclaration) => {
        const value = importDeclaration.getModuleSpecifierValue()

        if (isAbsoluteSrc(value)) {
            const segments = value.split('/');
            const newSegments = ['@', ...segments.slice(1)];
            const newValue = newSegments.join('/');
            importDeclaration.setModuleSpecifier(newValue);
        }

        if (isAbsolute(value)) {
            importDeclaration.setModuleSpecifier(`@/${value}`)
        }
    })
})

project.save()
