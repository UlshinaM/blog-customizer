import { CSSProperties, useState } from 'react';
import { defaultArticleState } from 'src/constants/articleProps';
import {
	ArticleParamsForm,
	pageStateOptions,
	pageStyleOptions,
} from './article-params-form/ArticleParamsForm';
import { Article } from './article/Article';

import '../styles/index.scss';
import styles from '../styles/index.module.scss';

export const App = () => {
	const [style, setStyle] = useState({
		'--font-family': defaultArticleState.fontFamilyOption.value,
		'--font-size': defaultArticleState.fontSizeOption.value,
		'--font-color': defaultArticleState.fontColor.value,
		'--container-width': defaultArticleState.contentWidth.value,
		'--bg-color': defaultArticleState.backgroundColor.value,
	});

	const initialState: pageStateOptions = {
		fontFamily: defaultArticleState.fontFamilyOption,
		fontSize: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		contentWidth: defaultArticleState.contentWidth,
		bgColor: defaultArticleState.backgroundColor,
	};

	const handleStyleChange = (newStyle: pageStyleOptions) => {
		setStyle({ ...newStyle });
	};

	return (
		<main className={styles.main} style={style as CSSProperties}>
			<ArticleParamsForm
				initialState={initialState}
				onStyleChange={handleStyleChange}
			/>
			<Article />
		</main>
	);
};
