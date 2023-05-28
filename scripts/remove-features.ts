import { JsxAttribute, Node, Project, SyntaxKind } from 'ts-morph'

const removedFeatureName = process.argv[2]
const featureState = process.argv[3]
const toggleFunctionName = 'toggleFeatures'
const toggleComponentName = 'ToggleComponentFeatures'

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
    return (
        node.getFirstDescendantByKind(SyntaxKind.Identifier)?.getText() ===
        toggleFunctionName
    )
}

function isToggleComponent(node: Node) {
    return (
        node.getFirstDescendantByKind(SyntaxKind.Identifier)?.getText() ===
        toggleComponentName
    )
}

const replaceToggleFunction = (node: Node) => {
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
        ?.getLiteralValue()

    if (featureName !== removedFeatureName) return

    if (featureState === 'on') {
        node.replaceWithText(onFunction?.getBody().getText() ?? '')
    }

    if (featureState === 'off') {
        node.replaceWithText(offFunction?.getBody().getText() ?? '')
    }
}

const getReplasedComponent = (attribute?: JsxAttribute) => {
    const value = attribute
        ?.getFirstDescendantByKind(SyntaxKind.JsxExpression)
        ?.getExpression()
        ?.getText()

    return value?.startsWith('(') ? value.slice(1, -1) : value
}
const getAttributesByName = (jsxAttributes: JsxAttribute[], name: string) =>
    jsxAttributes.find((node) => node.getName() === name)

const replaceToggleComponents = (node: Node) => {
    const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute)

    if (!attributes) return

    const onAttribute = getAttributesByName(attributes, 'on')
    const offAttribute = getAttributesByName(attributes, 'off')

    const featureNameAttribute = getAttributesByName(attributes, 'feature')

    const featureName = featureNameAttribute
        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
        ?.getLiteralValue()

    if (featureName !== removedFeatureName) return

    const onValue = getReplasedComponent(onAttribute)

    const offValue = getReplasedComponent(offAttribute)

    if (featureState === 'on' && onValue) {
        node.replaceWithText(onValue)
    }

    if (featureState === 'off' && offValue) {
        node.replaceWithText(offValue)
    }
}

files.forEach((sourceFile) => {
    sourceFile.forEachDescendant((node) => {
        if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
            return replaceToggleFunction(node)
        }

        if (
            node.isKind(SyntaxKind.JsxSelfClosingElement) &&
            isToggleComponent(node)
        ) {
            return replaceToggleComponents(node)
        }
        return null
    })
})

project.save()
