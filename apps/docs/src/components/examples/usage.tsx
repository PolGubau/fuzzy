"use client";
import type { Locale } from "@/types/base";
import { useFuzzy } from "@polgubau/fuzzy/react";
import { useParams } from "next/navigation";
import React from "react";

type Fruit = {
	color: string;
	emoji: string;
	labels: Record<Locale, string>;
};

const fruits: Fruit[] = [
	{
		color: "red",
		emoji: "🍎",
		labels: { en: "Apple", es: "Manzana", cn: "Poma", de: "Apfel" },
	},
	{
		color: "yellow",
		emoji: "🍌",
		labels: { en: "Banana", es: "Plátano", cn: "Plàtan", de: "Banane" },
	},
	{
		color: "orange",
		emoji: "🍊",
		labels: { en: "Orange", es: "Naranja", cn: "Taronja", de: "Orange" },
	},
	{
		color: "green",
		emoji: "🍐",
		labels: { en: "Pear", es: "Pera", cn: "Perera", de: "Birne" },
	},
	{
		color: "purple",
		emoji: "🍇",
		labels: { en: "Grapes", es: "Uvas", cn: "Raïm", de: "Trauben" },
	},
	{
		color: "brown",
		emoji: "🥥",
		labels: { en: "Coconut", es: "Coco", cn: "Coco", de: "Kokosnuss" },
	},
	{
		color: "red",
		emoji: "🍒",
		labels: { en: "Cherries", es: "Cerezas", cn: "Cireres", de: "Kirschen" },
	},
	{
		color: "red",
		emoji: "🍓",
		labels: { en: "Strawberry", es: "Fresa", cn: "Maduixa", de: "Erdbeere" },
	},
	{
		color: "yellow",
		emoji: "🍍",
		labels: { en: "Pineapple", es: "Piña", cn: "Pinya", de: "Ananas" },
	},
	{
		color: "green",
		emoji: "🥝",
		labels: { en: "Kiwi", es: "Kiwi", cn: "Kiwi", de: "Kiwi" },
	},
	{
		color: "blue",
		emoji: "🫐",
		labels: { en: "Blueberry", es: "Arándano", cn: "Nabiu", de: "Heidelbeere" },
	},
	{
		color: "orange",
		emoji: "🥭",
		labels: { en: "Mango", es: "Mango", cn: "Mango", de: "Mango" },
	},
	{
		color: "brown",
		emoji: "🌰",
		labels: { en: "Chestnut", es: "Castaña", cn: "Castanya", de: "Kastanie" },
	},
	{
		color: "yellow",
		emoji: "🍋",
		labels: { en: "Lemon", es: "Limón", cn: "Llimona", de: "Zitrone" },
	},
	{
		color: "green",
		emoji: "🍏",
		labels: {
			en: "Green Apple",
			es: "Manzana verde",
			cn: "Poma verda",
			de: "Grüner Apfel",
		},
	},
	{
		color: "red",
		emoji: "🍅",
		labels: { en: "Tomato", es: "Tomate", cn: "Tomàquet", de: "Tomate" },
	},
	{
		color: "brown",
		emoji: "🥑",
		labels: { en: "Avocado", es: "Aguacate", cn: "Alvocat", de: "Avocado" },
	},
	{
		color: "purple",
		emoji: "🍆",
		labels: {
			en: "Eggplant",
			es: "Berenjena",
			cn: "Albergínia",
			de: "Aubergine",
		},
	},
	{
		color: "green",
		emoji: "🥒",
		labels: { en: "Cucumber", es: "Pepino", cn: "Cogombre", de: "Gurke" },
	},
	{
		color: "orange",
		emoji: "🥕",
		labels: { en: "Carrot", es: "Zanahoria", cn: "Pastanaga", de: "Karotte" },
	},
	{
		color: "white",
		emoji: "🌽",
		labels: { en: "Corn", es: "Maíz", cn: "Blat de moro", de: "Mais" },
	},
	{
		color: "green",
		emoji: "🥬",
		labels: { en: "Lettuce", es: "Lechuga", cn: "Enciam", de: "Kopfsalat" },
	},
	{
		color: "white",
		emoji: "🥔",
		labels: { en: "Potato", es: "Patata", cn: "Patata", de: "Kartoffel" },
	},
	{
		color: "orange",
		emoji: "🍠",
		labels: {
			en: "Sweet Potato",
			es: "Boniato",
			cn: "Moniato",
			de: "Süßkartoffel",
		},
	},
	{
		color: "white",
		emoji: "🧄",
		labels: { en: "Garlic", es: "Ajo", cn: "All", de: "Knoblauch" },
	},
	{
		color: "white",
		emoji: "🧅",
		labels: { en: "Onion", es: "Cebolla", cn: "Ceba", de: "Zwiebel" },
	},
	{
		color: "red",
		emoji: "🍉",
		labels: {
			en: "Watermelon",
			es: "Sandía",
			cn: "Síndria",
			de: "Wassermelone",
		},
	},
	{
		color: "yellow",
		emoji: "🍈",
		labels: { en: "Melon", es: "Melón", cn: "Meló", de: "Melone" },
	},
	{
		color: "brown",
		emoji: "🥜",
		labels: { en: "Peanut", es: "Cacahuete", cn: "Cacauet", de: "Erdnuss" },
	},
	{
		color: "brown",
		emoji: "🌰",
		labels: { en: "Hazelnut", es: "Avellana", cn: "Avellana", de: "Haselnuss" },
	},
	{
		color: "green",
		emoji: "🫛",
		labels: { en: "Peas", es: "Guisantes", cn: "Pèsols", de: "Erbsen" },
	},
	{
		color: "yellow",
		emoji: "🍌",
		labels: {
			en: "Plantain",
			es: "Plátano macho",
			cn: "Plàtan mascle",
			de: "Kochbanane",
		},
	},
	{
		color: "green",
		emoji: "🫒",
		labels: { en: "Olive", es: "Aceituna", cn: "Oliva", de: "Olive" },
	},
	{
		color: "red",
		emoji: "🍓",
		labels: {
			en: "Wild Strawberry",
			es: "Fresa silvestre",
			cn: "Maduixeta",
			de: "Wald-Erdbeere",
		},
	},
	{
		color: "green",
		emoji: "🍃",
		labels: { en: "Herbs", es: "Hierbas", cn: "Herbes", de: "Kräuter" },
	},
	{
		color: "green",
		emoji: "🍀",
		labels: { en: "Clover", es: "Trébol", cn: "Trèvol", de: "Klee" },
	},
	{
		color: "purple",
		emoji: "🫐",
		labels: { en: "Blackberry", es: "Mora", cn: "Móra", de: "Brombeere" },
	},
	{
		color: "red",
		emoji: "🍅",
		labels: {
			en: "Cherry Tomato",
			es: "Tomatito",
			cn: "Tomàquet cherry",
			de: "Cherrytomate",
		},
	},
	{
		color: "orange",
		emoji: "🟠",
		labels: {
			en: "Tangerine",
			es: "Mandarina",
			cn: "Mandarina",
			de: "Mandarine",
		},
	},
	{
		color: "yellow",
		emoji: "🍋",
		labels: { en: "Citron", es: "Cidra", cn: "Cidra", de: "Zedrat-Zitrone" },
	},
	{
		color: "green",
		emoji: "🥒",
		labels: { en: "Zucchini", es: "Calabacín", cn: "Carbassó", de: "Zucchini" },
	},
	{
		color: "white",
		emoji: "🥥",
		labels: {
			en: "White Coconut",
			es: "Coco blanco",
			cn: "Coco blanc",
			de: "Weiße Kokosnuss",
		},
	},
	{
		color: "red",
		emoji: "🍓",
		labels: { en: "Raspberry", es: "Frambuesa", cn: "Gerd", de: "Himbeere" },
	},
	{
		color: "red",
		emoji: "🫒",
		labels: {
			en: "Red Olive",
			es: "Aceituna roja",
			cn: "Oliva roja",
			de: "Rote Olive",
		},
	},
	{
		color: "purple",
		emoji: "🍆",
		labels: {
			en: "Purple Yam",
			es: "Ñame morado",
			cn: "Nyam morat",
			de: "Lila Yamswurzel",
		},
	},
	{
		color: "brown",
		emoji: "🌰",
		labels: {
			en: "Brazil Nut",
			es: "Nuez de Brasil",
			cn: "Nou del Brasil",
			de: "Paranuss",
		},
	},
	{
		color: "brown",
		emoji: "🥜",
		labels: { en: "Almond", es: "Almendra", cn: "Ametlla", de: "Mandel" },
	},
	{
		color: "brown",
		emoji: "🥜",
		labels: { en: "Walnut", es: "Nuez", cn: "Nou", de: "Walnuss" },
	},
	{
		color: "green",
		emoji: "🍈",
		labels: {
			en: "Honeydew",
			es: "Melón verde",
			cn: "Meló verd",
			de: "Honigmelone",
		},
	},
	{
		color: "green",
		emoji: "🥬",
		labels: { en: "Spinach", es: "Espinaca", cn: "Espinac", de: "Spinat" },
	},
];
export const UsageExample = () => {
	const { lang } = useParams();
	const locale = lang as Locale;
	const [query, setQuery] = React.useState<string>("");

	const [vanillaFiltered, setVanillaFiltered] = React.useState<Fruit[]>([]);

	const response = useFuzzy<Fruit>({ list: fruits, query });

	React.useEffect(() => {
		const coreSearchFn = (query: string, items: Fruit[]): Fruit[] => {
			return items.filter((item) => {
				const labels = Object.values(item.labels);
				const searchString = labels.join(" ");
				const searchWords = query.split(" ");
				const searchRegex = new RegExp(searchWords.join("|"), "i");
				return searchRegex.test(searchString);
			});
		};
		setVanillaFiltered(coreSearchFn(query, fruits));
	}, [query]);

	const dictionary: Record<
		Locale,
		{
			heading: string;
			headingOptions: Array<{ name: string; value: string }>;
			placeholder: string;
			title: string;
			titles: {
				vanilla: string;
				fuzzy: string;
			};
		}
	> = {
		en: {
			heading: "Try searching: ",
			headingOptions: [
				{ name: "Apple", value: "apple" },
				{ name: "Banann", value: "bananan" },
				{ name: "Oraaange", value: "oraaange" },
				{ name: "Graps", value: "graps" },
			],
			placeholder: "Search for a fruit even with errors...",
			title: "Fruit Searcher",
			titles: {
				vanilla: "Vanilla Filter",
				fuzzy: "Fuzzy finder",
			},
		},
		es: {
			heading: "Prueba a buscar: ",
			headingOptions: [
				{ name: "Manzana", value: "manzana" },
				{ name: "Bananna", value: "bananna" },
				{ name: "Naraja", value: "naraja" },
				{ name: "Uvs", value: "uvs" },
			],
			placeholder: "Busca una fruta incluso con errores...",
			title: "Buscador de frutas",
			titles: {
				vanilla: "Filtro por defecto",
				fuzzy: "Buscador Fuzzy",
			},
		},
		cn: {
			heading: "Prova a buscar: ",
			headingOptions: [
				{ name: "Poma", value: "poma" },
				{ name: "Platan", value: "platan" },
				{ name: "Tarnja", value: "tarnja" },
				{ name: "Raïmm", value: "raïmm" },
			],
			placeholder: "Cerca una fruita fins i tot amb errors... ",
			title: "Cercador de fruites",
			titles: {
				vanilla: "Filtre per defecte",
				fuzzy: "Cercador Fuzzy",
			},
		},
		de: {
			heading: "Versuchen Sie zu suchen: ",
			headingOptions: [
				{ name: "Apfel", value: "apfel" },
				{ name: "Bbanane", value: "bbanane" },
				{ name: "Orage", value: "orage" },
				{ name: "Traen", value: "traen" },
			],
			placeholder: "Suchen Sie eine Frucht sogar mit Fehlern...",
			title: "Fuzzy-Sucher",
			titles: {
				vanilla: "Standardfilter",
				fuzzy: "Vager Finder",
			},
		},
	};

	const currentDictionary = dictionary[locale];

	return (
		<section>
			<header className="flex gap-2 items-center flex-wrap mb-4">
				<h2 className="text-lg mt-0">{currentDictionary.heading}</h2>
				<nav className="flex gap-2 flex-wrap mb-4">
					{currentDictionary.headingOptions.map((option) => (
						<button
							key={option.value}
							type="button"
							className="border border-primary/20 px-2 py-1 rounded-xl hover:bg-primary/10 transition-colors"
							onClick={() => setQuery(option.value)}
						>
							{option.name}
						</button>
					))}
				</nav>
			</header>
			<table>
				<thead>
					<tr>
						<th colSpan={2}>
							<h2 className="text-lg mt-0">{currentDictionary.title}</h2>
							<input
								type="text"
								value={query}
								className="border-b border-primary/20 p-2 w-full"
								onChange={(e) => setQuery(e.target.value)}
								placeholder={currentDictionary.placeholder}
								aria-label={currentDictionary.title}
							/>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<h3 className="mt-0">{currentDictionary.titles.vanilla}</h3>
							<FruitList list={vanillaFiltered} locale={locale} />
						</td>
						<td>
							<h3 className="mt-0">{currentDictionary.titles.fuzzy}</h3>
							<FruitList list={vanillaFiltered} locale={locale} />
						</td>
					</tr>
				</tbody>
			</table>
		</section>
	);
};

export const FruitUI = ({
	fruit,
	locale,
}: { fruit: Fruit; locale: Locale }) => {
	const label = fruit.labels[locale] || fruit.labels.en;
	return (
		<div className="flex gap-2 items-center p-0.5">
			<div
				className="w-2 h-2 rounded-full"
				style={{ backgroundColor: fruit.color }}
			/>
			<span>{label}</span>
			<span>{fruit.emoji}</span>
		</div>
	);
};

export const FruitList = ({
	list,
	locale,
}: { list: Fruit[]; locale: Locale }) => {
	return (
		<ul className="flex flex-col gap-2 h-[400px] overflow-y-auto">
			{list.map((fruit) => (
				<FruitUI fruit={fruit} locale={locale} key={fruit.labels.en} />
			))}
		</ul>
	);
};
