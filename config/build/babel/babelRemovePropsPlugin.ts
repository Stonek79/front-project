import { PluginItem } from '@babel/core';

export default function (): PluginItem {
    return {
        visitor: {
            Program(path, state) {
                const props = state.opts.props || []

                path.traverse({
                    JSXIdentifier(current) {
                        const { name } = current.node

                        if (props.includes(name)) {
                            current.parentPath.remove()
                        }
                    },
                })
            },
        },
    };
}
