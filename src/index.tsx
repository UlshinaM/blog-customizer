import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import {
	ArticleParamsForm,
	pageStateOptions,
} from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [style, setStyle] = useState({
		'--font-family': defaultArticleState.fontFamilyOption.value,
		'--font-size': defaultArticleState.fontSizeOption.value,
		'--font-color': defaultArticleState.fontColor.value,
		'--container-width': defaultArticleState.contentWidth.value,
		'--bg-color': defaultArticleState.backgroundColor.value,
	});

	const initialState = {
		fontFamily: defaultArticleState.fontFamilyOption,
		fontSize: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		contentWidth: defaultArticleState.contentWidth,
		bgColor: defaultArticleState.backgroundColor,
	};

	const [newState, setNewState] = useState({ ...initialState });

	const handleSubmitButton = (newState: pageStateOptions) => {
		setStyle({
			'--font-family': newState.fontFamily.value,
			'--font-size': newState.fontSize.value,
			'--font-color': newState.fontColor.value,
			'--container-width': newState.contentWidth.value,
			'--bg-color': newState.bgColor.value,
		});
		setNewState({ ...newState });
	};

	return (
		<main className={clsx(styles.main)} style={style as CSSProperties}>
			<ArticleParamsForm
				propsState={newState}
				initialState={initialState}
				onSubmitHandler={handleSubmitButton}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
