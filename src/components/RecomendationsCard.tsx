import Link from "next/link";
import { RecommendationsCardProps } from "@/src/types";

const RecommendationsCard = ({
  title,
  subtitle,
  urlMap,
}: RecommendationsCardProps) => {
  const formattedDate = subtitle ? new Date(subtitle).toDateString() : '';
  
  return (
    <Link
      key={title}
      href={urlMap ?? '#'}
      className="text-sm text-gray-400 hover:text-white transition-colors flex flex-col gap-1 focus:outline-none focus:ring-2 focus:ring-slate-400 rounded p-1"
      aria-label={`${title}${formattedDate ? `, published ${formattedDate}` : ''}`}
    >
      <p>{title}</p>
      <sub className="text-slate-600" aria-label="Publication date">{formattedDate}</sub>
    </Link>
  );
};

export default RecommendationsCard;
