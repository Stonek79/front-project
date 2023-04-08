import { createReactEditorJS } from 'react-editor-js'

import { OutputBlockData } from '@editorjs/editorjs'
import { EDITOR_JS_TOOLS } from 'shared/const/editor'
import { useSelector } from 'react-redux'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { ArticleBlockType } from '../../model/types/article'
import { getArticleDetailsData } from '../../model/selectors/articleDetails'
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice'

interface ArticleEditProps {
    className?: string
}

const ReactEditorJS = createReactEditorJS();

const articleDetailsReducers: ReducersList = {
    article: articleDetailsReducer,
}
export function ArticleEdit(props: ArticleEditProps) {
    const { className } = props

    const articleData = useSelector(getArticleDetailsData)

    if (!articleData) {
        return null
    }

    const mainData = articleData ? [
        {
            id: articleData.id + articleData.img.length,
            type: ArticleBlockType.IMAGE,
            data: { file: { url: articleData.img } },
        },
        {
            id: articleData.id + articleData.title.length,
            type: ArticleBlockType.TEXT,
            data: { text: articleData.title },
        },
        {
            id: articleData.id + articleData.type.toString(),
            type: ArticleBlockType.TEXT,
            data: { text: articleData.type },
        },
        {
            id: articleData.id + articleData.subtitle.length,
            type: ArticleBlockType.TEXT,
            data: { text: articleData.subtitle },
        }] as unknown as OutputBlockData[] : []

    const blocksData = articleData?.blocks.reduce((acc: any[], block) => {
        const { id, type } = block

        if (type === ArticleBlockType.TEXT) {
            const title = {
                id: id + block.title,
                type,
                data: {
                    text: block.title,
                },
            }

            const text = block.paragraphs
                .map((item, ind) => ({ id: `${ind + item.length}`, type, data: { text: item } }))

            return [...acc, title, ...text]
        }
        if (type === ArticleBlockType.IMAGE) {
            const data = { file: { url: block.src }, caption: block.title }
            const img = { id, type, data }
            return [...acc, img]
        }
        if (type === ArticleBlockType.CODE) {
            const data = { code: block.code }
            return [...acc, { id, type, data }]
        }
        return []
    }, []) as unknown as OutputBlockData[]

    return (
        <DynamicModuleLoader reducers={articleDetailsReducers} removeAfterUnmount>
            <ReactEditorJS
                tools={EDITOR_JS_TOOLS}
                defaultValue={{
                    blocks: [...mainData, ...blocksData],
                }}
            />
        </DynamicModuleLoader>
    )
}
