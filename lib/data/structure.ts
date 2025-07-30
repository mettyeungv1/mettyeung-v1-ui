import { Crown, Shield, BookOpen, Palette } from "lucide-react";
import { Department, Person } from "../types/structure";

const generateMembers = (deptId: string, deptName: string, startId: number) =>
	Array.from({ length: 5 }, (_, i) => {
		const id = (startId + i).toString();
		const isMale = i % 2 === 0;
		return {
			id,
			name: isMale ? `លោក សេង វិសាល ${id}` : `អ្នកស្រី ឌួង សុភក្រ្ខ ${id}`,
			name_en: isMale ? `Mr. Seng Visal ${id}` : `Ms. Duong Sophak ${id}`,
			position: i === 0 ? "ប្រធានផ្នែក" : i === 1 ? "អនុប្រធាន" : "សមាជិក",
			position_en:
				i === 0 ? "Department Head" : i === 1 ? "Deputy Head" : "Member",
			department: deptId,
			department_name: deptName,
			bio: "ជាសមាជិកជួយអភិវឌ្ឍន៍ផ្នែកនេះតាមរយៈសកម្មភាពនានា។",
			email: `member${id}@mettyerng.org`,
			phone: `+855 12 000 00${id}`,
			location: ["ភ្នំពេញ", "បាត់ដំបង", "សៀមរាប", "កំពង់ឆ្នាំង"][i % 4],
			joinDate: (2016 + i).toString(),
			image: isMale
				? `https://randomuser.me/api/portraits/men/${startId + i}.jpg`
				: `https://randomuser.me/api/portraits/women/${startId + i}.jpg`,
			skills: ["Leadership", "Teamwork", "Strategic Planning"].slice(
				0,
				(i % 3) + 1
			),
			experience: [
				{
					title:
						i === 0 ? "Department Head" : i === 1 ? "Deputy Head" : "Member",
					company: "Mettyerng Organization",
					period: `${2016 + i} - Present`,
					description: "រួមចំណែកក្នុងការអភិវឌ្ឍន៍ផ្នែកនេះជាមួយក្រុម។",
				},
			],
			education: [
				{
					degree:
						i % 2 === 0 ? "BA in Social Work" : "MA in Community Development",
					institution: [
						"Royal University of Phnom Penh",
						"University of Battambang",
						"Cambodia University of Specialties",
					][i % 3],
					year: `${2011 + i}`,
				},
			],
			socialLinks: [
				{
					platform: "LinkedIn",
					url: `https://linkedin.com/in/member${id}`,
					icon: "linkedin",
				},
			],
			achievements: [`Contributed to ${2 + i}+ department initiatives`],
			languages: [
				{ language: "Khmer", level: "Native" },
				{ language: "English", level: i % 2 === 0 ? "Fluent" : "Intermediate" },
			],
			projects: [
				"Youth Engagement Program",
				"Leadership Training",
				"Cultural Exchange",
			].slice(0, (i % 3) + 1),
			testimonials: [
				{
					text: `${
						isMale ? "He" : "She"
					} is a dedicated member making a meaningful impact.`,
					author: "Team Coordinator",
					role: "Project Leader",
				},
			],
		};
	});

export const organizationData: Department[] = [
	{
		id: "executive",
		title: "គណៈកម្មការប្រតិបត្តិ",
		title_en: "Executive Committee",
		icon: Crown,
		color: "from-amber-500 to-orange-500",
		bgColor: "bg-amber-50",
		description:
			"ក្រុមមេដឹកនាំដែលមានសមាជិកមានបទពិសោធន៍ខ្ពស់ ក្នុងការគ្រប់គ្រងគម្រោងសង្គម និងអភិវឌ្ឍន៍សហគមន៍។",
		members: generateMembers("executive", "Executive Committee", 1),
	},
	{
		id: "advisory",
		title: "គណៈកម្មការប្រឹក្សា",
		title_en: "Advisory Committee",
		icon: Shield,
		color: "from-red-500 to-pink-500",
		bgColor: "bg-red-50",
		description:
			"ផ្តល់ការណែនាំ និងការគាំទ្រយុទ្ធសាស្ត្រ ដើម្បីអភិវឌ្ឍន៍អង្គការ",
		members: generateMembers("advisory", "Advisory Committee", 101),
	},
	{
		id: "education",
		title: "ផ្នែកការអប់រំ",
		title_en: "Education Department",
		icon: BookOpen,
		color: "from-blue-500 to-indigo-500",
		bgColor: "bg-blue-50",
		description:
			"ទទួលបន្ទុកគម្រោងអប់រំ និងការបណ្តុះបណ្តាល សម្រាប់កុមារ និងយុវជន",
		members: generateMembers("education", "Education Department", 201),
	},
	{
		id: "culture",
		title: "ផ្នែកវប្បធម៌",
		title_en: "Culture Department",
		icon: Palette,
		color: "from-green-500 to-emerald-500",
		bgColor: "bg-green-50",
		description: "ទទួលបន្ទុកការអភិរក្ស និងលើកកម្ពស់វប្បធម៌ប្រពៃណីខ្មែរ",
		members: generateMembers("culture", "Culture Department", 301),
	},
];

export const getPersonById = (id: string): Person | undefined => {
	return organizationData
		.flatMap((dept) => dept.members)
		.find((p) => p.id === id);
};
