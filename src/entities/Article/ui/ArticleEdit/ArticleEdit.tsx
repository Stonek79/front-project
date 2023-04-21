import { createReactEditorJS } from 'react-editor-js'

import { OutputBlockData } from '@editorjs/editorjs'
import { EDITOR_JS_TOOLS } from 'shared/const/editor'
import { useSelector } from 'react-redux'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { getArticleDetailsData } from '../../model/selectors/articleDetails'
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice'
import { ArticleBlockTypes } from '../../model/consts/consts';

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
            type: ArticleBlockTypes.IMAGE,
            data: { file: { url: articleData.img } },
        },
        {
            id: articleData.id + articleData.title.length,
            type: ArticleBlockTypes.TEXT,
            data: { text: articleData.title },
        },
        {
            id: articleData.id + articleData.type.toString(),
            type: ArticleBlockTypes.TEXT,
            data: { text: articleData.type },
        },
        {
            id: articleData.id + articleData.subtitle.length,
            type: ArticleBlockTypes.TEXT,
            data: { text: articleData.subtitle },
        }] as unknown as OutputBlockData[] : []

    const blocksData = articleData?.blocks.reduce((acc: any[], block) => {
        const { id, type } = block

        if (type === ArticleBlockTypes.TEXT) {
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
        if (type === ArticleBlockTypes.IMAGE) {
            const data = { file: { url: block.src }, caption: block.title }
            const img = { id, type, data }
            return [...acc, img]
        }
        if (type === ArticleBlockTypes.CODE) {
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
