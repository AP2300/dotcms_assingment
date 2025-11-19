import Link from "next/link";
import { RecommendationsCardProps } from "@/src/types";

const RecommendationsCard = ({
  title,
  subtitle,
  urlMap,
}: RecommendationsCardProps) => {
  return (
    <Link
      key={title}
      href={urlMap ?? '#'}
      className="text-sm text-gray-400 hover:text-white transition-colors flex flex-col gap-1"
    >
      <p>{title}</p>
    <sub className="text-slate-600">{subtitle ? new Date(subtitle).toDateString() : ''}</sub>
    </Link>
  );
};

export default RecommendationsCard;
