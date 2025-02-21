import { notFound } from "next/navigation";

type Props = {
  params: { term: string };
};

const SearchPage = ({ params: {term} }: Props) => {
  if (!term) return notFound();

  const decodedTerm = decodeURIComponent(term);

  return <div>Welcome to the search page: {decodedTerm}</div>;
};

export default SearchPage;