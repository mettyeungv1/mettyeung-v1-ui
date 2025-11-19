import { Award, Briefcase, Heart, Star, Users } from "lucide-react";

export const associationData = {
	"Association Branch": "/Association Branch.png",
	"Honorary Member": "/Honorary Member.png",
	"Our Friends Association Board of Directors":
		"/Our Friends Association Board of Directors",
	"Our Friends Association Executive Committee":
		"/Our Friends Association Executive Committee.jpg",
	"Senior Advisor of Our Friends Association":
		"/Senior Advisor of Our Friends Association.jpg",
};

type DeptStyle = {
	icon: React.ElementType;
	color: string;
	bgColor: string;
	image?: string;
	title: string;
};

export const departmentStylingMap = (
	t: (key: string) => string
): Record<string, DeptStyle> => ({
	"Honorary Member": {
		icon: Award,
		color: "from-purple-500 to-purple-600",
		bgColor: "bg-purple-50",
		image: "/Honorary Member.png",
		title: t("structure.honorMember"),
	},
	"Our Friends Association Executive Committee": {
		icon: Briefcase,
		color: "from-green-500 to-green-600",
		bgColor: "bg-green-50",
		image: "/Our Friends Association Executive Committee.jpg",
		title: t("structure.executiveCommittee"),
	},
	"Our Friends Association Board of Directors": {
		icon: Users,
		color: "from-blue-500 to-blue-600",
		bgColor: "bg-blue-50",
		image: "/Our Friends Association Board of Directors.jpg",
		title: t("structure.boardOfDirectors"),
	},
	"Senior Advisor of Our Friends Association": {
		icon: Star,
		color: "from-amber-500 to-amber-600",
		bgColor: "bg-amber-50",
		image: "/Senior Advisor of Our Friends Association.jpg",
		title: t("structure.seniorAdvisors"),
	},
	"Association Branch": {
		icon: Heart,
		color: "from-red-500 to-red-600",
		bgColor: "bg-red-50",
		image: "/Association Branch.png",
		title: t("structure.associationBranches"),
	},
	"Board Director": {
		icon: Users,
		color: "from-sky-500 to-sky-600",
		bgColor: "bg-sky-50",
		image: "",
		title: "Board Director",
	},
});
