import { Node, Project, SyntaxKind } from 'ts-morph'

const removedFeatureName = process.argv[2]
const featureState = process.argv[3]

if (!removedFeatureName) {
    throw new Error('Specify feature-flag name')
}

if (!featureState) {
    throw new Error('Specify feature state (ON or OFF)')
}

if (featureState !== 'on' && featureState !== 'off') {
    throw new Error('Incorrect feature-flag value (ON or OFF)')
}

const project = new Project({})

project.addSourceFilesAtPaths('src/**/*.ts')
project.addSourceFilesAtPaths('src/**/*.tsx')

const files = project.getSourceFiles()

function isToggleFunction(node: Node) {
    let isToggleFeatures = false

    node.forEachChild((child) => {
        if (
            child.isKind(SyntaxKind.Identifier) &&
            child.getText() === 'toggleFeatures'
        ) {
            isToggleFeatures = true
        }
    })

    return isToggleFeatures
}

files.forEach((sourceFile) => {
    sourceFile.forEachDescendant((node) => {
        if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
            const objectOptions = node.getFirstDescendantByKind(
                SyntaxKind.ObjectLiteralExpression,
            )

            if (!objectOptions) return

            const offFunctionProperty = objectOptions.getProperty('off')
            const onFunctionProperty = objectOptions.getProperty('on')

            const featureNameProperty = objectOptions.getProperty('name')

            const onFunction = onFunctionProperty?.getFirstDescendantByKind(
                SyntaxKind.ArrowFunction,
            )
            const offFunction = offFunctionProperty?.getFirstDescendantByKind(
                SyntaxKind.ArrowFunction,
            )
            const featureName = featureNameProperty
                ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
                ?.getText()
                .slice(1, -1)

            if (featureName !== removedFeatureName) return

            if (featureState === 'on') {
                node.replaceWithText(onFunction?.getBody().getText() ?? '')
            }

            if (featureState === 'off') {
                node.replaceWithText(offFunction?.getBody().getText() ?? '')
            }
        }
    })
})

project.save()
