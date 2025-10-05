import { NewsArticle, NewsCategory, SubCategory } from "@/lib/types/news";

// A map of all available subcategories for easy lookup and consistency.
const subCategoryMap: Record<string, SubCategory> = {
	volunteer: { id: "volunteer", name: "ស្ម័គ្រចិត្ត", name_en: "Volunteer" },
	youth: { id: "youth", name: "យុវជន", name_en: "Youth" },
	local_dev: {
		id: "local_dev",
		name: "អភិវឌ្ឍន៍សហគមន៍",
		name_en: "Community Development",
	},
	school: { id: "school", name: "សាលារៀន", name_en: "School" },
	university: {
		id: "university",
		name: "សាកលវិទ្យាល័យ",
		name_en: "University",
	},
	training: { id: "training", name: "បណ្តុះបណ្តាល", name_en: "Training" },
	tradition: { id: "tradition", name: "ប្រពៃណី", name_en: "Tradition" },
	festival: { id: "festival", name: "ពិធីបុណ្យ", name_en: "Festival" },
	art: { id: "art", name: "សិល្បៈ", name_en: "Art" },
	football: { id: "football", name: "បាល់ទាត់", name_en: "Football" },
	volleyball: { id: "volleyball", name: "បាល់ទះ", name_en: "Volleyball" },
	athletics: { id: "athletics", name: "កីឡាវាស់ល្បឿន", name_en: "Athletics" },
};

// This is the main data array for your news articles.
// Each article's 'category' property now contains a nested 'subCategory' object.
export const newsData: NewsArticle[] = [];
// export const newsData: NewsArticle[] = [
// 	{
// 		id: 1,
// 		title: "ការកាត់សក់ដោយឥតគិតថ្លៃ ចំនួន 200 នាក់",
// 		title_en: "Free Haircuts for 200 People",
// 		excerpt:
// 			"ក្រុម Mettyerng បានរៀបចំកម្មវិធីកាត់សក់ដោយឥតគិតថ្លៃ ដល់ប្រជាជនដែលមានស្ថានភាពពិបាក",
// 		content: `<h2>ផ្តើមសកម្មភាពសេវាសាធារណៈ</h2><p>ក្នុងកម្មវិធីបេរ័ត្នសង្គមនេះ យើងបានអាចជួយដល់ប្រជាជន 200 នាក់ ដោយផ្តល់សេវាកម្មកាត់សក់ដោយឥតគិតថ្លៃ។ សកម្មភាពនេះបានធ្វើឡើងនៅទីលាន Mettyerng ក្នុងរយៈពេល 3 ថ្ងៃ។</p><blockquote>"ការជួយគ្នាទៅវិញទៅមកគឺជាវប្បធម៌ដ៏ល្អរបស់ខ្មែរ ដែលយើងត្រូវរក្សាបន្ត" - ប្រធានក្រុម Mettyerng</blockquote>`,
// 		category: {
// 			id: "community",
// 			name: "សហគមន៍",
// 			name_en: "Community",
// 			count: 2, // Note: Best practice is to calculate this dynamically.
// 			subCategory: subCategoryMap["volunteer"],
// 		},
// 		author: {
// 			name: "ក្រុមការងារ Mettyerng",
// 			name_en: "Mettyerng Team",
// 			avatar:
// 				"https://images.pexels.com/photos/4491461/pexels-photo-4491461.jpeg?auto=compress&cs=tinysrgb&w=150",
// 			bio_en:
// 				"Mettyerng Team is a non-profit organization focused on community support and social services.",
// 			email: "info@mettyerng.org",
// 			phone: "+855 12 345 678",
// 			location: "Phnom Penh, Cambodia",
// 		},
// 		date: "2024-01-15",
// 		readTime: "4 នាទី",
// 		image:
// 			"https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1200",
// 		gallery: [
// 			{
// 				url: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg",
// 				caption: "ការកាត់សក់ដោយអ្នកជំនាញ",
// 			},
// 			{
// 				url: "https://images.pexels.com/photos/3738673/pexels-photo-3738673.jpeg",
// 				caption: "ប្រជាជនកំពុងរង់ចាំ",
// 			},
// 			{
// 				url: "https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg",
// 				caption: "ការកាត់សក់សម្រាប់កុមារ",
// 			},
// 		],
// 		featured: true,
// 		views: 1250,
// 		comments: 18,
// 		tags: ["community", "charity", "free-haircuts", "mettyerng"],
// 		publishedAt: "2024-01-15T09:00:00Z",
// 		updatedAt: "2024-01-15T11:30:00Z",
// 	},
// 	{
// 		id: 2,
// 		title: "ការបង្រៀនភាសាខ្មែរដល់កុមារ 50 នាក់",
// 		title_en: "Khmer Language Classes for 50 Children",
// 		excerpt: "កម្មវិធីបង្រៀនភាសាខ្មែរ និងសំណេរដល់កុមារក្នុងតំបន់ជនបទ",
// 		content: `<h2>សិក្សាភាសាខ្មែរឱ្យកុមារ</h2><p>ការអប់រំគឺជាមូលដ្ឋានសំខាន់បំផុតនៃការអភិវឌ្ឍន៍។ ក្នុងកម្មវិធីនេះ កុមារ <strong>ចំនួន 50 នាក់</strong> បានចូលរួមសិក្សាភាសាខ្មែរនៅតំបន់ជនបទ។</p><blockquote>“ភាសាមាតុភូមិជាជាងស្នាដៃនៃអត្តសញ្ញាណ”</blockquote>`,
// 		category: {
// 			id: "education",
// 			name: "ការអប់រំ",
// 			name_en: "Education",
// 			count: 2,
// 			subCategory: subCategoryMap["school"],
// 		},
// 		author: {
// 			name: "អ្នកស្រី គិម សុផល",
// 			name_en: "Mrs. Kim Sophal",
// 			avatar:
// 				"https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=150",
// 			bio_en:
// 				"An experienced educator dedicated to preserving the Khmer language for the next generation.",
// 		},
// 		date: "2024-01-10",
// 		readTime: "3 នាទី",
// 		image:
// 			"https://images.pexels.com/photos/5427652/pexels-photo-5427652.jpeg?auto=compress&cs=tinysrgb&w=1200",
// 		gallery: [
// 			{
// 				url: "https://images.pexels.com/photos/5427652/pexels-photo-5427652.jpeg",
// 				caption: "កុមារកំពុងសិក្សា",
// 			},
// 			{
// 				url: "https://images.pexels.com/photos/8617830/pexels-photo-8617830.jpeg",
// 				caption: "សៀវភៅភាសាខ្មែរ",
// 			},
// 		],
// 		featured: false,
// 		views: 890,
// 		comments: 12,
// 		tags: ["education", "language", "children", "khmer-class"],
// 		publishedAt: "2024-01-10T14:00:00Z",
// 		updatedAt: "2024-01-10T14:00:00Z",
// 	},
// 	{
// 		id: 3,
// 		title: "ការប្រកួតរបាំប្រពៃណីខ្មែរ",
// 		title_en: "Traditional Khmer Dance Competition",
// 		excerpt: "ការរៀបចំការប្រកួតរបាំប្រពៃណីខ្មែរ ដើម្បីលើកកម្ពស់វប្បធម៌ជាតិ",
// 		content: `<h2>ការប្រកួតរបាំប្រពៃណីខ្មែរ</h2><p>វប្បធម៌ខ្មែរគឺជាទ្រព្យសម្បត្តិដ៏មានតម្លៃ។ កម្មវិធីនេះចង់បង្ហាញនូវសិល្បៈរបាំបុរាណរបស់ខ្មែរដើម្បីអោយជំនាន់ក្រោមទទួលស្គាល់និងថែរក្សា។</p>`,
// 		category: {
// 			id: "culture",
// 			name: "វប្បធម៌",
// 			name_en: "Culture",
// 			count: 1,
// 			subCategory: subCategoryMap["art"],
// 		},
// 		author: {
// 			name: "លោក ខៀវ ផាណា",
// 			name_en: "Mr. Khev Phana",
// 			avatar:
// 				"https://images.pexels.com/photos/1918159/pexels-photo-1918159.jpeg?auto=compress&cs=tinysrgb&w=150",
// 			bio_en:
// 				"A cultural advocate and organizer of traditional arts events in Phnom Penh.",
// 		},
// 		date: "2024-01-05",
// 		readTime: "4 នាទី",
// 		image:
// 			"https://images.pexels.com/photos/8369686/pexels-photo-8369686.jpeg?auto=compress&cs=tinysrgb&w=1200",
// 		gallery: [
// 			{
// 				url: "https://images.pexels.com/photos/8369686/pexels-photo-8369686.jpeg",
// 				caption: "ការសម្តែងរបាំអប្សរា",
// 			},
// 			{
// 				url: "https://images.pexels.com/photos/10777651/pexels-photo-10777651.jpeg",
// 				caption: "គ្រឿងតុបតែងកាយ",
// 			},
// 		],
// 		featured: false,
// 		views: 650,
// 		comments: 9,
// 		tags: ["culture", "dance", "competition", "traditional-arts"],
// 		publishedAt: "2024-01-05T11:00:00Z",
// 		updatedAt: "2024-01-05T11:00:00Z",
// 	},
// 	{
// 		id: 4,
// 		title: "ការបរិច្ចាគអាហារដល់គ្រួសារក្រីក្រ",
// 		title_en: "Food Donation to Underprivileged Families",
// 		excerpt:
// 			"ក្រុម Mettyerng បានបរិច្ចាគអាហារ និងសម្ភារៈចាំបាច់ដល់គ្រួសារក្រីក្រ",
// 		content: `<h2>ការជួយដល់គ្រួសារក្រីក្រ</h2><p>ក្នុងកំឡុងពេលដ៏លំបាកនេះ ការជួយគ្នាទៅវិញទៅមកគឺជាការចាំបាច់។ ក្រុម Mettyerng បានចែកអាហារ និងសម្ភារៈចាំបាច់ដល់គ្រួសារដែលខ្វះខាត។</p><blockquote>“ការផ្តល់ជំនួយតូចៗអាចផ្លាស់ប្តូរជីវិតមនុស្សមួយបាន”</blockquote>`,
// 		category: {
// 			id: "community",
// 			name: "សហគមន៍",
// 			name_en: "Community",
// 			count: 2,
// 			subCategory: subCategoryMap["local_dev"],
// 		},
// 		author: {
// 			name: "ក្រុមការងារ Mettyerng",
// 			name_en: "Mettyerng Team",
// 			avatar:
// 				"https://images.pexels.com/photos/4491461/pexels-photo-4491461.jpeg?auto=compress&cs=tinysrgb&w=150",
// 			bio_en:
// 				"Mettyerng Team is a non-profit organization focused on community support and social services.",
// 			email: "info@mettyerng.org",
// 			phone: "+855 12 345 678",
// 			location: "Phnom Penh, Cambodia",
// 		},
// 		date: "2023-12-20",
// 		readTime: "3 នាទី",
// 		image:
// 			"https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1200",
// 		gallery: [
// 			{
// 				url: "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg",
// 				caption: "ការចែកអំណោយ",
// 			},
// 			{
// 				url: "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg",
// 				caption: "ការរៀបចំគ្រឿងឧបភោគបរិភោគ",
// 			},
// 		],
// 		featured: false,
// 		views: 920,
// 		comments: 25,
// 		tags: ["community", "donation", "poverty-alleviation", "mettyerng"],
// 		publishedAt: "2023-12-20T10:00:00Z",
// 		updatedAt: "2023-12-20T10:00:00Z",
// 	},
// 	{
// 		id: 5,
// 		title: "ការបណ្តុះបណ្តាលជំនាញកុមារ",
// 		title_en: "Children Skills Development Workshop",
// 		excerpt: "កម្មវិធីបណ្តុះបណ្តាលជំនាញដល់កុមារ ដើម្បីរៀបចំខ្លួនសម្រាប់អនាគត",
// 		content: `<h2>សិក្ខាសាលាជំនាញសម្រាប់កុមារ</h2><p>ការបណ្តុះបណ្តាលជំនាញគឺជាការវិនិយោគសម្រាប់អនាគត។ កុមារចូលរួមក្នុងសិក្ខាសាលានេះបានស្វែងយល់ពីជំនាញនានាដូចជា: ជំនាញសហការជាក្រុម, ការបង្កើតគំនិតច្នៃប្រឌិត, និងការនិយាយជាសាធារណៈ។</p>`,
// 		category: {
// 			id: "education",
// 			name: "ការអប់រំ",
// 			name_en: "Education",
// 			count: 2,
// 			subCategory: subCategoryMap["training"],
// 		},
// 		author: {
// 			name: "អ្នកស្រី ពេជ្រ មាលា",
// 			name_en: "Mrs. Pich Maly",
// 			avatar:
// 				"https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=150",
// 			bio_en: "A specialist in child development and skill-based learning.",
// 		},
// 		date: "2023-12-15",
// 		readTime: "5 នាទី",
// 		image:
// 			"https://images.pexels.com/photos/8197543/pexels-photo-8197543.jpeg?auto=compress&cs=tinysrgb&w=1200",
// 		gallery: [
// 			{
// 				url: "https://images.pexels.com/photos/8197543/pexels-photo-8197543.jpeg",
// 				caption: "សកម្មភាពក្នុងថ្នាក់",
// 			},
// 		],
// 		featured: false,
// 		views: 750,
// 		comments: 15,
// 		tags: ["education", "workshop", "skills-development", "children"],
// 		publishedAt: "2023-12-15T16:00:00Z",
// 		updatedAt: "2023-12-15T16:00:00Z",
// 	},
// 	{
// 		id: 6,
// 		title: "ការប្រកួតកីឡាក្នុងសហគមន៍",
// 		title_en: "Community Sports Competition",
// 		excerpt: "ការរៀបចំការប្រកួតកីឡាតុក្កតា និងបាល់បោះ ដើម្បីកសាងសាមគ្គីភាព",
// 		content: `<h2>ការប្រកួតកីឡាសហគមន៍</h2><p>កីឡាគឺជាមធ្យោបាយដ៏ល្អមួយក្នុងការកសាងសាមគ្គីភាព។ ការប្រកួតនេះមានប្រភេទកីឡាចម្បងដូចជា បាល់បោះ និងការប្រណាំងរត់។</p>`,
// 		category: {
// 			id: "sports",
// 			name: "កីឡា",
// 			name_en: "Sports",
// 			count: 1,
// 			subCategory: subCategoryMap["football"],
// 		},
// 		author: {
// 			name: "ក្រុមកីឡា",
// 			name_en: "Community Sports Team",
// 			avatar:
// 				"https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg?auto=compress&cs=tinysrgb&w=150",
// 			bio_en:
// 				"Organizers of local sporting events to promote health and unity.",
// 		},
// 		date: "2023-12-10",
// 		readTime: "4 នាទី",
// 		image:
// 			"https://images.pexels.com/photos/3076509/pexels-photo-3076509.jpeg?auto=compress&cs=tinysrgb&w=1200",
// 		gallery: [
// 			{
// 				url: "https://images.pexels.com/photos/3076509/pexels-photo-3076509.jpeg",
// 				caption: "ការប្រកួតបាល់បោះ",
// 			},
// 			{
// 				url: "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg",
// 				caption: "អ្នកចូលរួម",
// 			},
// 		],
// 		featured: false,
// 		views: 680,
// 		comments: 7,
// 		tags: ["sports", "community", "competition", "health"],
// 		publishedAt: "2023-12-10T18:00:00Z",
// 		updatedAt: "2023-12-10T18:00:00Z",
// 	},
// ];

// This helper array is used to build the filter UI.
// The counts are calculated dynamically here, which is the best practice.
export const categories: NewsCategory[] = [
	{ id: "all", name: "ទាំងអស់", name_en: "All", count: newsData.length },
	{
		id: "education",
		name: "ការអប់រំ",
		name_en: "Education",
		count: newsData.filter((n) => n.category.id === "education").length,
		subcategories: [
			subCategoryMap["school"],
			subCategoryMap["university"],
			subCategoryMap["training"],
		],
	},
	{
		id: "culture",
		name: "វប្បធម៌",
		name_en: "Culture",
		count: newsData.filter((n) => n.category.id === "culture").length,
		subcategories: [
			subCategoryMap["tradition"],
			subCategoryMap["festival"],
			subCategoryMap["art"],
		],
	},
	{
		id: "community",
		name: "សហគមន៍",
		name_en: "Community",
		count: newsData.filter((n) => n.category.id === "community").length,
		subcategories: [
			subCategoryMap["volunteer"],
			subCategoryMap["youth"],
			subCategoryMap["local_dev"],
		],
	},
	{
		id: "sports",
		name: "កីឡា",
		name_en: "Sports",
		count: newsData.filter((n) => n.category.id === "sports").length,
		subcategories: [
			subCategoryMap["football"],
			subCategoryMap["volleyball"],
			subCategoryMap["athletics"],
		],
	},
];

// This helper function finds a single article by its ID.
export const getArticleById = (id: number): NewsArticle | undefined => {
	return undefined;
	// return newsData.find((article) => article.id === id);
};
