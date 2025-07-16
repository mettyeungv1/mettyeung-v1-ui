import { Post, Video, Project, GalleryItem } from "@/lib/types";

export const newsData: Post[] = [
	{
		id: 1,
		title: "ការកាត់សក់ដោយឥតគិតថ្លៃ ចំនួន 200 នាក់",
		title_en: "Free Haircuts for 200 People",
		excerpt:
			"ក្រុម Mettyerng បានរៀបចំកម្មវិធីកាត់សក់ដោយឥតគិតថ្លៃ ដល់ប្រជាជនដែលមានស្ថានភាពពិបាក",
		content: "ក្នុងកម្មវិធីបេរ័ត្នសង្គមនេះ យើងបានអាចជួយដល់ប្រជាជន 200 នាក់...",
		category: "community",
		author: "ក្រុមការងារ Mettyerng",
		date: "2024-01-15",
		image: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg",
		featured: true,
		views: 1250,
	},
	// Additional news items would be added here
];

export const videosData: Video[] = [
	{
		id: 1,
		title: "ការកាត់សក់ដោយឥតគិតថ្លៃ - ការបេរ័ត្នសង្គម",
		title_en: "Free Haircut Project - Community Service",
		description: "ការផ្តល់សេវាកាត់សក់ដោយឥតគិតថ្លៃដល់ប្រជាជនដែលមានស្ថានភាពពិបាក",
		category: "community",
		duration: "8:45",
		views: 12500,
		date: "2024-01-15",
		thumbnail:
			"https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg",
		videoId: "dQw4w9WgXcQ",
		featured: true,
	},
	// Additional videos would be added here
];

export const projectsData: Project[] = [
	{
		id: "1",
		slug: "free-haircut-project",
		title: "គម្រោងកាត់សក់ដោយឥតគិតថ្លៃ",
		title_en: "Free Haircut Project",
		description: "ការផ្តល់សេវាកាត់សក់ដោយឥតគិតថ្លៃដល់ប្រជាជនដែលមានស្ថានភាពពិបាក",
		longDescription:
			"គម្រោងនេះបានចាប់ផ្តើមឡើងក្នុងឆ្នាំ 2021 ដោយគោលបំណងផ្តល់សេវាកាត់សក់ដោយឥតគិតថ្លៃដល់ប្រជាជនដែលមានស្ថានភាពសេដ្ឋកិច្ចមិនល្អ។ រហូតមកដល់បច្ចុប្បន្ន យើងបានជួយប្រជាជនចំនួន 500 នាក់ហើយ។",
		category: "community",
		status: "ongoing",
		startDate: "2021-01-15",
		endDate: "2024-12-31",
		location: "ភ្នំពេញ",
		beneficiaries: 500,
		volunteers: 15,
		images: [
			"https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg",
			"https://images.pexels.com/photos/3993327/pexels-photo-3993327.jpeg",
			"https://images.pexels.com/photos/3993328/pexels-photo-3993328.jpeg",
		],
		featured: true,
		tags: ["community", "health", "social-service"],
		budget: 50000,
		budgetUsed: 35000,
		duration: "3 years",
		objectives: [
			"ផ្តល់សេវាកាត់សក់ដោយឥតគិតថ្លៃ",
			"បង្កើនទំនុកចិត្តរបស់ប្រជាជន",
			"ជួយដល់ប្រជាជនក្រីក្រ",
		],
		achievements: [
			"បានជួយប្រជាជន 500 នាក់",
			"បានបង្កើតការងារ 15 កន្លែង",
			"បានទទួលការគាំទ្រពីសហគមន៍",
		],
		team: [
			{
				name: "សុខ វិចិត្រ",
				image:
					"https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
				role: "Project Manager",
			},
			{
				name: "ចន្ទ្រា ពេជ្រ",
				image:
					"https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
				role: "Lead Stylist",
			},
		],
		testimonials: [
			{
				text: "គម្រោងនេះបានជួយខ្ញុំយ៉ាងច្រើន។ ខ្ញុំមានទំនុកចិត្តក្នុងការស្វែងរកការងារ។",
				author: "លោក ពេជ្រ",
				role: "អ្នកទទួលអត្ថប្រយោជន៍",
				image:
					"https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
			},
		],
		impact: {
			ប្រជាជនបានជួយ: 500,
			ការងារបានបង្កើត: 15,
			ថ្ងៃបានធ្វើការ: 365,
		},
		milestones: [
			{
				title: "ចាប់ផ្តើមគម្រោង",
				description: "បានចាប់ផ្តើមគម្រោងជាផ្លូវការ",
				date: "2021-01-15",
				completed: true,
			},
			{
				title: "ជួយប្រជាជន 100 នាក់ដំបូង",
				description: "បានជួយប្រជាជន 100 នាក់ដំបូង",
				date: "2021-06-15",
				completed: true,
			},
			{
				title: "ពង្រីកសេវាកម្ម",
				description: "ពង្រីកសេវាកម្មទៅកាន់តំបន់ថ្មី",
				date: "2024-06-15",
				completed: false,
			},
		],
	},
	{
		id: "2",
		slug: "khmer-language-education",
		title: "កម្មវិធីជំនួយការអប់រំ",
		title_en: "Education Support Program",
		description: "ការផ្តល់ជំនួយសម្ភារៈសិក្សា និងអាហារូបករណ៍ដល់កុមារក្រីក្រ",
		longDescription:
			"កម្មវិធីនេះមានគោលបំណងជួយដល់កុមារក្រីក្រឱ្យបានទទួលការអប់រំដ៏ល្អ។ យើងផ្តល់សម្ភារៈសិក្សា អាហារូបករណ៍ និងការបណ្តុះបណ្តាលបន្ថែម។",
		category: "education",
		status: "ongoing",
		startDate: "2022-03-01",
		endDate: "2025-02-28",
		location: "ខេត្តកំពង់ចាម",
		beneficiaries: 300,
		volunteers: 25,
		images: [
			"https://images.pexels.com/photos/1720186/pexels-photo-1720186.jpeg",
			"https://images.pexels.com/photos/1720187/pexels-photo-1720187.jpeg",
			"https://images.pexels.com/photos/1720188/pexels-photo-1720188.jpeg",
		],
		featured: true,
		tags: ["education", "children", "scholarship"],
		budget: 100000,
		budgetUsed: 60000,
		duration: "3 years",
		objectives: [
			"ផ្តល់អាហារូបករណ៍ដល់កុមារក្រីក្រ",
			"ផ្តល់សម្ភារៈសិក្សា",
			"បង្កើនអត្រាចូលរៀន",
		],
		achievements: [
			"បានជួយកុមារ 300 នាក់",
			"អត្រាចូលរៀនកើនឡើង 85%",
			"បានផ្តល់អាហារូបករណ៍ 200 ករណី",
		],
		team: [
			{
				name: "ស្រី មករា",
				image:
					"https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg",
				role: "Education Coordinator",
			},
			{
				name: "លោក រតនា",
				image:
					"https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg",
				role: "Field Officer",
			},
		],
		testimonials: [
			{
				text: "កម្មវិធីនេះបានជួយកូនខ្ញុំឱ្យបានបន្តការសិក្សា។ ខ្ញុំពិតជាអរគុណណាស់។",
				author: "យាយ ចន្ទ្រា",
				role: "ម្តាយកុមារ",
				image:
					"https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
			},
		],
		impact: {
			កុមារបានជួយ: 300,
			អាហារូបករណ៍: 200,
			សាលារៀនចូលរួម: 15,
		},
		milestones: [
			{
				title: "ចាប់ផ្តើមកម្មវិធី",
				description: "បានចាប់ផ្តើមកម្មវិធីជាផ្លូវការ",
				date: "2022-03-01",
				completed: true,
			},
			{
				title: "ផ្តល់អាហារូបករណ៍ដំបូង",
				description: "បានផ្តល់អាហារូបករណ៍ដល់កុមារ 50 នាក់",
				date: "2022-09-01",
				completed: true,
			},
			{
				title: "ពង្រីកកម្មវិធី",
				description: "ពង្រីកកម្មវិធីទៅកាន់សាលារៀនថ្មី",
				date: "2024-09-01",
				completed: false,
			},
		],
	},
	{
		id: "3",
		slug: "culture-preservation",
		title: "កម្មវិធីសុខភាពសហគមន៍",
		title_en: "Community Healthcare Outreach",
		description:
			"ការផ្តល់សេវាពិនិត្យសុខភាពដោយឥតគិតថ្លៃដល់ប្រជាជនក្នុងតំបន់ដាច់ស្រយាល",
		longDescription:
			"កម្មវិធីនេះផ្តល់សេវាពិនិត្យសុខភាពដោយឥតគិតថ្លៃ ការផ្តល់ថ្នាំ និងការអប់រំអំពីសុខភាពដល់ប្រជាជនក្នុងតំបន់ដាច់ស្រយាល។",
		category: "health",
		status: "completed",
		startDate: "2023-01-15",
		endDate: "2023-12-31",
		location: "ខេត្តរតនគិរី",
		beneficiaries: 800,
		volunteers: 30,
		images: [
			"https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg",
			"https://images.pexels.com/photos/4173252/pexels-photo-4173252.jpeg",
			"https://images.pexels.com/photos/4173253/pexels-photo-4173253.jpeg",
		],
		featured: false,
		tags: ["health", "medical", "rural"],
		budget: 75000,
		budgetUsed: 72000,
		duration: "1 year",
		objectives: [
			"ផ្តល់សេវាពិនិត្យសុខភាពដោយឥតគិតថ្លៃ",
			"អប់រំអំពីការថែរក្សាសុខភាព",
			"ផ្តល់ថ្នាំចាំបាច់",
		],
		achievements: [
			"បានពិនិត្យសុខភាពប្រជាជន 800 នាក់",
			"បានផ្តល់ថ្នាំដល់ 600 នាក់",
			"បានធ្វើការអប់រំ 50 វគ្គ",
		],
		team: [
			{
				name: "វេជ្ជបណ្ឌិត សុភា",
				image:
					"https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg",
				role: "Lead Doctor",
			},
			{
				name: "គិលានុបដ្ឋាយិកា ពេជ្រ",
				image:
					"https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg",
				role: "Head Nurse",
			},
		],
		testimonials: [
			{
				text: "ការពិនិត្យសុខភាពនេះបានជួយរកឃើញជំងឺរបស់ខ្ញុំទាន់ពេលវេលា។ អរគុណណាស់។",
				author: "លោកតា ប៊ុន",
				role: "អ្នកទទួលសេវា",
				image:
					"https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg",
			},
		],
		impact: {
			ប្រជាជនបានពិនិត្យ: 800,
			ថ្នាំបានផ្តល់: 600,
			វគ្គអប់រំ: 50,
		},
		milestones: [
			{
				title: "ចាប់ផ្តើមកម្មវិធី",
				description: "បានចាប់ផ្តើមកម្មវិធីជាផ្លូវការ",
				date: "2023-01-15",
				completed: true,
			},
			{
				title: "ដំណើរទី 1",
				description: "បានធ្វើដំណើរពិនិត្យសុខភាពលើកដំបូង",
				date: "2023-03-01",
				completed: true,
			},
			{
				title: "បញ្ចប់កម្មវិធី",
				description: "បានបញ្ចប់កម្មវិធីដោយជោគជ័យ",
				date: "2023-12-31",
				completed: true,
			},
		],
	},
];

export const galleryData: GalleryItem[] = [
	{
		id: 1,
		title: "ការកាត់សក់ដោយឥតគិតថ្លៃ",
		title_en: "Free Haircut Service",
		category: "community",
		date: "2024-01-15",
		image: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg",
		thumbnail:
			"https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg",
		description: "សកម្មភាពកាត់សក់ដោយឥតគិតថ្លៃដល់ប្រជាជនក្នុងសហគមន៍",
		views: 1250,
	},
	// Additional gallery items would be added here
];

// Helper functions for data manipulation
export const getPostsByCategory = (category: string) => {
	return category === "all"
		? newsData
		: newsData.filter((post) => post.category === category);
};

export const getFeaturedPosts = () => {
	return newsData.filter((post) => post.featured);
};

export const getVideosByCategory = (category: string) => {
	return category === "all"
		? videosData
		: videosData.filter((video) => video.category === category);
};

export const getFeaturedVideos = () => {
	return videosData.filter((video) => video.featured);
};

export const getProjectsByCategory = (category: string) => {
	return category === "all"
		? projectsData
		: projectsData.filter((project) => project.category === category);
};

export const getFeaturedProjects = () => {
	return projectsData.filter((project) => project.featured);
};

export const getGalleryItemsByCategory = (category: string) => {
	return category === "all"
		? galleryData
		: galleryData.filter((item) => item.category === category);
};

export const getProjectBySlug = (slug: string) => {
	return projectsData.find((project) => project.slug === slug);
};
