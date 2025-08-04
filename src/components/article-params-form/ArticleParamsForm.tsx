import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select/Select';
import { Text } from 'src/ui/text';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { isFontFamilyClass } from 'src/ui/select/helpers/isFontFamilyClass';

export type pageStateOptions = {
	fontFamily: OptionType;
	fontSize: OptionType;
	fontColor: OptionType;
	bgColor: OptionType;
	contentWidth: OptionType;
};

export const ArticleParamsForm = ({
	propsState,
	initialState,
	onSubmitHandler,
}: {
	propsState: pageStateOptions;
	initialState: pageStateOptions;
	onSubmitHandler: (newState: pageStateOptions) => void;
}) => {
	//const initialPageState = { ...propsState };
	const [newPageState, setNewPageState] = useState({ ...propsState });
	const [formState, setFormState] = useState({ ...propsState });
	const [isOpen, setIsOpen] = useState(false);

	const asideRef = useRef<HTMLElement | null>(null);
	//const arrowButtonRef = useRef<HTMLButtonElement>(null);
	const arrowButtonRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (newPageState !== formState) {
			setNewPageState({ ...formState });
		}
	}, [formState]);

	useEffect(() => {
		const asideCloseFunction = (evt: MouseEvent) => {
			const eventElement = evt.target as Node;
			const arrowButton = arrowButtonRef.current;

			/* Проверяем, что пойманный клик был не по:
			открытому элементу формы,
			кнопки открытия / закрытия формы
			элементу выпадающего списка в полях формы, которые формируются только в момент открытия списка и в исходном asideRef отсутствуют
			*/
			if (
				asideRef &&
				!asideRef.current?.contains(eventElement) &&
				!(
					arrowButton === eventElement ||
					(arrowButton && arrowButton.contains(eventElement))
				) &&
				!eventElement.parentElement?.className.includes('Select-module')
			) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('click', asideCloseFunction);
		} else {
			document.removeEventListener('click', asideCloseFunction);
		}

		return () => {
			document.removeEventListener('click', asideCloseFunction);
		};
	}, [isOpen]);

	const handleChangeInput = (option: OptionType) => {
		if (option.className.includes('font-size')) {
			setFormState({ ...formState, fontSize: option });
		} else if (option.className.includes('font')) {
			setFormState({ ...formState, fontColor: option });
		} else if (option.className.includes('bg')) {
			setFormState({ ...formState, bgColor: option });
		} else if (option.className.includes('width')) {
			setFormState({ ...formState, contentWidth: option });
		} else if (isFontFamilyClass(option.className)) {
			setFormState({ ...formState, fontFamily: option });
		}
	};

	const handleOpenButton = () => {
		setIsOpen(!isOpen);
	};

	const handleResetButton = () => {
		setFormState({ ...initialState });
		onSubmitHandler(initialState);
	};

	const handleFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setIsOpen(false);
		onSubmitHandler(newPageState);
	};

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={handleOpenButton}
				ref={arrowButtonRef}
			/>
			<aside
				ref={asideRef}
				className={clsx(styles.container, isOpen ? styles.container_open : '')}>
				<form className={styles.form} onSubmit={handleFormSubmit}>
					<Text as='h2' size={31} weight={800} uppercase align='left'>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamily}
						options={fontFamilyOptions}
						placeholder={formState.fontFamily.title}
						onChange={handleChangeInput}
						title={'шрифт'}
					/>
					<RadioGroup
						name={'radio-buttons'}
						options={fontSizeOptions}
						selected={formState.fontSize}
						title={'рАЗМЕР шрифта'}
						onChange={handleChangeInput}
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						placeholder={formState.fontColor.title}
						title={'Цвет шрифта'}
						onChange={handleChangeInput}
					/>
					<Separator />
					<Select
						selected={formState.bgColor}
						options={backgroundColors}
						placeholder={formState.bgColor.title}
						onChange={handleChangeInput}
						title={'Цвет фона'}
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						placeholder={formState.contentWidth.title}
						title={'Ширина контента'}
						onChange={handleChangeInput}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleResetButton}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
