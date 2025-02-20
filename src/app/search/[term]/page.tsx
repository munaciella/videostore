import { notFound } from "next/navigation";

type Props = {
  params: { term: string };
};

const SearchPage = ({ params: {term} }: Props) => {
  if (!term) return notFound();

  return <div>Welcome to the search page: {term}</div>;
};

export default SearchPage;