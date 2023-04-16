const interfaceConst = 'interface';

module.exports = (componentName) => `import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './${componentName}.module.scss';
import { memo } from 'react';

${interfaceConst} ${componentName}Props {
    className?: string;
}

export const ${componentName} = memo((props: ${componentName}Props) => {
    const { className } = props;
    const { t } = useTranslation();
    
    const cn = classNames(cls.ArticlesPage, {}, [className])
    
    return (
        <div className={cn}>
           {}
        </div>
    );
});`;
